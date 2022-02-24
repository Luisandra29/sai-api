<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Category;
use App\Models\State;
use App\Models\Person;
use App\Models\Parish;
use App\Http\Requests\CreateApplicationRequest;
use Auth;
use PDF;
use Mail;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;
        $user = $request->user();

        $query = Application::withTrashed()
            ->latest()
            ->with('category');

        if ($request->has('filter')) {
            $filters = $request->filter;
            // Get fields
            if (array_key_exists('status', $filters)) {
                $query->whereHas('state', function ($query) use ($filters) {
                    return $query->whereListName($filters['status']);
                });
            }
            if (array_key_exists('title', $filters)) {
                $query->where(strtolower('title'), 'ilike', '%'.$filters['title'].'%');

            }
            if (array_key_exists('created_at', $filters)) {
                //$query->whereDate('created_at', $filters['created_at']);
                $query->where(strtolower('created_at'), 'ilike', '%'.$filters['created_at'].'%');
            }
            if (array_key_exists('num', $filters)) {
                $query->where(strtolower('num'), 'ilike', '%'.$filters['num'].'%');

            }
            if (array_key_exists('category', $filters)) {
                $query->whereHas('category', function ($query) use ($filters) {
                    $query->where(strtolower('name'), 'ilike', '%'.$filters['category'].'%');
                });
            }


        }

        if ($sort && $order) {
            $query->orderBy($sort, $order);
        }

        if ($request->get('type')) {
            return $this->report($query);
        }

        return $query->paginate($results);
    }

    public function report($query)
    {
        $applications = $query->get();
        $listName = strtoupper($applications->first()->state->list_name);
        $total = $query->count();
        $emissionDate = date('d-m-Y', strtotime(Carbon::now()));

        $data = compact(['applications', 'emissionDate', 'total', 'listName']);

        $pdf = PDF::loadView('pdf.report', $data);
        return $pdf->download('reporte-solicitudes.pdf');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return Category::get()->toArray();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $person = Person::create([
            'dni' => $request->dni,
            'name' => $request->full_name,
            'address' => $request->address,
            'phone' => $request->phone,
            'community_id' => $request->community_id,
            'parish_id' => $request->parish_id,
        ]);
        $category = $request->get('category_id');
        //$application = new Application($request->all());
        $num = Application::getNewNum();
        //$application->state_id = 1;
        $category_id = $category;
        $person_id= $person->id;

        $application = Application::create([
            'title' => $request->title,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'num' => $num,
            'category_id' => $category_id,
            'state_id' => '1',
            'person_id' => $person_id,
            'quantity' => '3'

        ]);

        $person->applications()->save($application);


        return response()->json([
            'success' => true,
            'message' => '¡Solicitud recibida!'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function show(Application $application)
    {
        return Response($application->load(['category', 'state', 'person']));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function edit(Application $application)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Application $application)
    {
        $application->approved_at = Carbon::now();
        $application->state_id = 2;
        $application->save();

        return Response([
            'success' => true,
            'message' => '¡La solicitud '.'#'.$application->num.' fue aprobada!'
        ]);
    }

    public function download(Application $application)
    {

        $person = Person::where('id' , $application->person_id)->first();
        //$users = DB::table('users')->where('votes', 100)->get();
        $pdf = PDF::loadView('pdf.certification', compact(['application', 'person']));

        return $pdf->download('certificado.pdf');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function destroy(Application $application)
    {
        if ($application->state_id == 2) {
            return Response([
                'success' => false,
                'message' => 'Las solicitudes aprobadas no pueden ser borradas'
            ]);
        }
        $application->update([ 'state_id' => 3 ]);

        return Response([
            'success' => true,
            'message' => '¡Ha rechazado la solicitud #'.$application->num.'!'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Category;
use App\Models\State;
use App\Models\Person;
use App\Models\Parish;
use Auth;
use PDF;
use Mail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\CreateApplicationRequest;

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
            ->orderBy('state_id', 'ASC')
            ->with('person', 'subcategory', 'user', 'state');

        if ($request->has('filter')) {
            $filters = $request->filter;
            // Get fields
            if (array_key_exists('status', $filters)) {
                $query->whereHas('state', function ($query) use ($filters) {
                    return $query->whereListName($filters['status']);
                });
            }
            if (array_key_exists('person_id', $filters)) {
                $query->whereHas('person', function ($query) use ($filters) {
                    $query->where('person_id', $filters['person_id']);
                });
            }
            // Ejemplo de búsqueda global
            if (array_key_exists('search', $filters)) {
                $query->whereLike('title', $filters['search'])
                    ->orWhere('num', 'like', '%'.$filters['search'].'%')
                    ->orWhereHas('person', function ($query) use ($filters) {
                        $query->where('name', 'like', '%'.$filters['search'].'%');
                    })
                    ->orWhereHas('subcategory', function($q) use ($filters) {
                        $q->where('name', 'like', '%'.$filters['search'].'%');
                    })
                    ->orWhereHas('subcategory.category', function($q) use ($filters) {
                        $q->where('name', 'like', '%'.$filters['search'].'%');
                    })
                    ->orWhereHas('person.parish', function ($q) use ($filters) {
                        $q->where('name', 'like', '%'.$filters['search'].'%');
                    })
                    ->orWhereHas('person.community', function ($q) use ($filters) {
                        $q->where('name', 'like', '%'.$filters['search'].'%');
                    })
                    ->orWhereHas('person.sector', function ($q) use ($filters) {
                        $q->where('name', 'like', '%'.$filters['search'].'%');
                    })
                    ->orWhereHas('person.street', function ($q) use ($filters) {
                        $q->where('name', 'like', '%'.$filters['search'].'%');
                    })

                    ->orWhere('state_id', $filters['search'])

                    ->orWhere('subcategory_id', $filters['search'])

                    ->orWhereHas('subcategory.category', function($q) use ($filters) {
                        $q->where('id', $filters['search']);
                    })
                    ->orWhereHas('person.parish', function ($q) use ($filters) {
                        $q->where('id', $filters['search']);
                    })
                    ->orWhereHas('person.community', function ($q) use ($filters) {
                        $q->where('id', $filters['search']);
                    })
                    ->orWhereHas('person.sector', function ($q) use ($filters) {
                        $q->where('id', $filters['search']);
                    })
                    ->orWhereHas('person.street', function ($q) use ($filters) {
                        $q->where('id', $filters['search']);
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


    public function store(CreateApplicationRequest $request)
    {
        $num = Application::getNewNum();

        $user_id = Auth::user()->id;

        $model = Application::create([
            'title' => $request->title,
            'description' => $request->description,
            'num' => $num,
            'quantity' => $request->quantity,
            'subcategory_id' => $request->subcategory_id,
            'state_id' => '1',
            'person_id' => $request->person_id,
            'user_id' => $user_id
        ]);

        return $model;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function show(Application $application)
    {
        return $application->load(['subcategory', 'state', 'person']);
    }


    public function update(Request $request, Application $application)
    {

        $state = $application->state_id;

        if($state == '1'){

            if ($request->status == 'APROBADO') {
                $application->update([
                    'state_id' => 2
                ]);
            } elseif ($request->status == 'RECHAZADO') {
                $application->update([
                    'state_id' => 3
                ]);
            }

            return $application->load(['subcategory', 'state', 'person']);
        }
        elseif($state == '2'){
            return Response([
                'success' => false,
                'message' => 'La solicitud ya ha sido aprobada'
            ]);

        }
        elseif($state == '3'){
            return Response([
                'success' => false,
                'message' => 'La solicitud ya ha sido rechazada'
            ]);
        }
    }


    public function download(Application $application)
    {

        $person = Person::where('id' , $application->person_id)->first();
        //$users = DB::table('users')->where('votes', 100)->get();
        $pdf = PDF::loadView('pdf.certification', compact(['application', 'person']));

        return $pdf->download('certificado.pdf');
    }


}

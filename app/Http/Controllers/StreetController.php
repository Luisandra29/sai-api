<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Street;
use App\Http\Requests\CreateStreetRequest;
use PDF;
use Carbon\Carbon;

class StreetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Street::query()->withCount('applications')->with('sectors');
        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;

        if ($request->has('filter')) {
            $filters = $request->filter;
            // Get fields
            if (array_key_exists('name', $filters)) {
                $query->where('name', 'like', '%'.$filters['name'].'%');
            }
            if (array_key_exists('sector_id', $filters)) {
                $query->whereHas('sectors', function ($query) use ($filters) {
                    $query->where('sector_id', $filters['sector_id']);
                });
            }
            if (array_key_exists('sector_name', $filters)) {
                $query->whereHas('sectors', function($q) use ($filters) {
                    $q->where('name', 'like', '%'.$filters['sector_name'].'%');
                });
            }
            if (array_key_exists('community_name', $filters)) {
                $query->whereHas('sectors.community', function($q) use ($filters) {
                    $q->where('name', 'like', '%'.$filters['community_name'].'%');
                });
            }
            if (array_key_exists('parish_name', $filters)) {
                $query->whereHas('sectors.community.parishes', function($q) use ($filters) {
                    $q->where('name', 'like', '%'.$filters['parish_name'].'%');
                });
            }
        }

        if ($sort && $order) {
            $query->orderBy($sort, $order);
        }

        return $query->paginate($results);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $query = Sector::query()->withCount('applications');
        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;

        return $query->paginate($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateStreetRequest $request)
    {
        $street = Street::create([
            'name' => $request->name
        ]);
        $street->sectors()->sync($request->sectors);

        return response()->json($street, 201);
    }

        /**
     * Display the specified resource.
     *
     * @param  \App\Street  $street
     * @return \Illuminate\Http\Response
     */
    public function show(Street $street)
    {
        return $street->load('sectors');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Street  $street
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Street $street)
    {
        $street->update($request->all());
        $street->sectors()->sync($request->sectors);

        return response()->json($street, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Street  $street
     * @return \Illuminate\Http\Response
     */
    public function destroy(Street $street)
    {
        $street->delete();

        return response()->json($street, 201);
    }

    public function report(Street $street)
    {
        $area = Street::query()->where('id', $street->id)->first();
        
        $name= $area->name;

        $title= 'CALLE';

        $subTitle= 'PERSONAS';

        $total = $area->people->count();

        $emissionDate = date('d-m-Y', strtotime(Carbon::now()));

        $pdf = PDF::loadView('pdf.report-street', compact(['area', 'emissionDate', 'total', 'name', 'title', 'subTitle']));
        return $pdf->download('reporte-calle.pdf');
    }
}

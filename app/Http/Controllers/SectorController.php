<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sector;


class SectorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Sector::query()->withCount('applications');
        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;


        if ($request->has('filter')) {
            $filters = $request->filter;
            // Get fields
            if (array_key_exists('name', $filters)) {
                $query->where('name', 'like', '%'.$filters['name'].'%');
            }
            if (array_key_exists('community_name', $filters)) {
                $query->whereHas('community', function($q) use ($filters) {
                    $q->where('name', 'like', '%'.$filters['community_name'].'%');
                });
            }
        }

        if ($sort && $order) {
            $query->orderBy($sort, $order);
        }

        return $query->paginate($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $sector = Sector::create($request->all());

        return response()->json($sector, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Sector  $sector
     * @return \Illuminate\Http\Response
     */
    public function show(Sector $sector)
    {
        return $sector->load(['applications', 'community'])
            ->loadCount('applications');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Sector  $sector
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sector $sector)
    {
        $sector->update($request->all());

        return response()->json($sector, 201);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Sector  $sector
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sector $sector)
    {
        $sector->delete();

        return response()->json([
            'message' => "¡Ha sido eliminada el sector {$sector->name}!"
        ]);

        //return response()->json($sector, 201);

    }

}

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
                $query->where(strtolower('name'), 'ilike', '%'.$filters['name'].'%');
            }
            if (array_key_exists('community_id', $filters)) {
                $query->whereHas('communities', function($q) use ($filters) {
                    $q->where('community_id', $filters['community_id']);
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
    public function store(Request $request)
    {
        $sector = Sector::create($request->all());

        //return $sector;
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
        return $sector->load(['applications'])
            ->loadCount('applications');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Sector  $sector
     * @return \Illuminate\Http\Response
     */
    public function edit(Sector $sector)
    {
        return $sector->load('communities');
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
        // $sector->name = $request->name;
        // $sector->communities()->sync($request->communities);

        // return response()->json([
        //     'id' => $user->id,
        //     'attributes' => $user
        // ]);

        $sector->update($request->all());

        //return $sector;

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

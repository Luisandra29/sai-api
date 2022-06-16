<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Street;
use App\Http\Requests\CreateStreetRequest;

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
                $query->where(strtolower('name'), 'ilike', '%'.$filters['name'].'%');
            }
            if (array_key_exists('sector_id', $filters)) {
                $query->whereHas('sectors', function($q) use ($filters) {
                    $q->where('sector_id', $filters['sector_id']);
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
}

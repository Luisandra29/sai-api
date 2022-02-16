<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Models\Parish;
use App\Http\Requests\CreateCommunityRequest;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
/**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Community::query()->withCount('applications');
        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;

        if ($request->has('filter')) {
            $filters = $request->filter;
            // Get fields
            $name = $filters['name'];
            $query->where(strtolower('name'), 'ilike', '%'.$name.'%');

            // if (array_key_exists('parish_names', $filters)) {
            //     $query->whereHas('category', function ($query) use ($filters) {
            //         $query->where(strtolower('name'), 'ilike', '%'.$filters['category'].'%');
            //     });
            // }

            // $parish_name = $filters['parish_names'];
            // $query->where(strtolower('parish_names'), 'ilike', '%'.$parish_name.'%');

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
    public function create()
    {
        return Parish::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCommunityRequest $request)
    {
        $community = Community::create([
            'name' => $request->name
        ]);
        $community->parishes()->sync($request->parishes);

        return Response([
            'success' => true,
            'id' => $community->id,
            'attributes' => $community
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Community  $community
     * @return \Illuminate\Http\Response
     */
    public function show(Community $community)
    {
        return $community->load(['applications'])
            ->loadCount('applications');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Community  $community
     * @return \Illuminate\Http\Response
     */
    public function edit(Community $community)
    {
        return $community->load('parishes');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Community  $community
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Community $community)
    {
        $community->name = $request->name;
        $community->parishes()->sync($request->parishes);

        return response()->json([
            'id' => $user->id,
            'attributes' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Community  $community
     * @return \Illuminate\Http\Response
     */
    public function destroy(Community $community)
    {
        $community->delete();

        return response()->json([
            'message' => "¡Ha sido eliminada la comunidad {$community->name}!"
        ]);
    }
}

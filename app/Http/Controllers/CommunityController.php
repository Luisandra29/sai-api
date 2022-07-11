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

            if (array_key_exists('name', $filters)) {
                $query->where('name', 'like', '%'.$filters['name'].'%');
            }
            if (array_key_exists('parish_id', $filters)) {
                $query->whereHas('parishes', function ($query) use ($filters) {
                    return $query->where('parish_id', $filters['parish_id']);
                });
            }
            if (array_key_exists('parish_names', $filters)) {
                $query->whereHas('parishes', function($q) use ($filters) {
                    $q->where('parishes.name', 'like', '%'.$filters['parish_names'].'%');
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
    public function store(CreateCommunityRequest $request)
    {
        $community = Community::create([
            'name' => $request->name
        ]);
        $community->parishes()->sync($request->parishes);

        return $community;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Community  $community
     * @return \Illuminate\Http\Response
     */
    public function show(Community $community)
    {
        return $community->load(['applications', 'parishes'])
            ->loadCount('applications');
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

        return $community;
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

        return $community;
    }
}

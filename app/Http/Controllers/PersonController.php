<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\Application;
use App\Models\Position;
use Illuminate\Http\Request;
use App\Http\Requests\CreatePersonRequest;


class PersonController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Person::query()
            ->withCount('applications')
            ->with('positions');

        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;

        if ($request->has('filter')) {
            $filters = $request->filter;

            if (array_key_exists('search', $filters)) {
                $query->whereLike('name', $filters['search'])
                    ->orWhere('dni', 'like', '%'.$filters['search'].'%');
            }

            if (array_key_exists('dni', $filters)) {
                $query->where('dni', 'like', '%'.$filters['dni'].'%');
            }

            if (array_key_exists('phone', $filters)) {
                $query->where('phone', 'like', '%'.$filters['phone'].'%');
            }

            if (array_key_exists('position_id', $filters)) {
                $query->where('position_id', '=', $filters['position_id']);
            }

            if (array_key_exists('parish_name', $filters)) {
                $query->whereHas('parish', function ($query) use ($filters) {
                    $query->where('name', 'like', '%'.$filters['parish_name'].'%');
                });
            }

            if (array_key_exists('community_name', $filters)) {
                $query->whereHas('community', function ($query) use ($filters) {
                    $query->where('name', 'like', '%'.$filters['community_name'].'%');
                });
            }

            if (array_key_exists('sector_name', $filters)) {
                $query->whereHas('sector', function ($query) use ($filters) {
                    $query->where('name', 'like', '%'.$filters['sector_name'].'%');
                });
            }

            if (array_key_exists('street_name', $filters)) {
                $query->whereHas('street', function ($query) use ($filters) {
                    $query->where('name', 'like', '%'.$filters['street_name'].'%');
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreatePersonRequest $request)
    {
        $person = Person::create($request->all());

        $person->positions()->sync($request->positions);

        return $person;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function show(Person $person)
    {
        return $person->load(['applications', 'positions'])
        ->loadCount('applications');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function edit(Person $person)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Person  $person
     * @return \Illuminate\Http\Response
     */

    public function update(CreatePersonRequest $request, Person $person)
    {
        $person->update($request->all());

        $person->positions()->sync($request->positions);

        return $person;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function destroy(Person $person)
    {
        $person->delete();

        return $person;
    }

}

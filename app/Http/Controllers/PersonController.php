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
        $query = Person::query()->withCount('applications')->with('positions');

        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;

        if ($request->has('filter')) {
            $filters = $request->filter;
            $name = $filters['name'];
            $query->where(strtolower('name'), 'ilike', '%'.$name.'%');
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

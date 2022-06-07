<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use App\Models\Application;
use Illuminate\Http\Request;
use App\Http\Requests\CreateSubcategoryRequest;
use App\Http\Requests\UpdateSubcategoryRequest;



class SubcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $query = Subcategory::query()->withCount('applications');

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateSubcategoryRequest $request)
    {
        $subcategory = Subcategory::create($request->all());

        return $subcategory;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Subcategory  $subcategory
     * @return \Illuminate\Http\Response
     */
    public function show(Subcategory $subcategory)
    {
        return $subcategory->load(['applications'])
        ->loadCount('applications');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Subcategory  $subcategory
     * @return \Illuminate\Http\Response
     */
    public function edit(Subcategory $subcategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Subcategory  $subcategory
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSubcategoryRequest $request, Subcategory $subcategory)
    {
        $subcategory->update($request->all());

        return $subcategory;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subcategory  $subcategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subcategory $subcategory)
    {
        $subcategory->delete();

        return $subcategory;
    }
}

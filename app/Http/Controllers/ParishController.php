<?php

namespace App\Http\Controllers;

use App\Models\Parish;
use Illuminate\Http\Request;
use App\Http\Requests\CreateParishRequest;

class ParishController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Parish::query();
        $results = $request->perPage;

        return $query->paginate($results);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function store(CreateParishRequest $request)
    {
        $parish = Parish::create($request->all());

        return $parish;
    }

    public function update(CreateParishRequest $request, Parish $parish)
    {
        $parish->update($request->all());

        return $parish;
    }

    public function show(Parish $parish)
    {
        return Response($parish->load('applications', 'people'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Parish $parish)
    {
        $parish->delete();

        return $parish;
    }
}

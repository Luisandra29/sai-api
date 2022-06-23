<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use App\Http\Requests\CreatePositionRequest;

class PositionController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Position::query()->with('people');
        $results = $request->perPage;

        return $query->paginate($results);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CreatePositionRequest $request)
    {
        $position = Position::create($request->all());

        return $position;
    }

    public function update(CreatePositionRequest $request, Position $position)
    {
        $position->update($request->all());

        return $position;
    }

    public function show(Position $position)
    {
        return Response($position->load('people'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Position $position)
    {
        $position->delete();

        return $position;
    }
}

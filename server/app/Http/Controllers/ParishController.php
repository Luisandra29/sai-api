<?php

namespace App\Http\Controllers;

use App\Models\Parish;
use Illuminate\Http\Request;

class ParishController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = Parish::query();
        $results = $request->perPage;

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

    public function show(Parish $parish)
    {
        return Response($parish->load('applications', 'users'));
    }

    public function getCommunities(Parish $parish)
    {
        return Response($parish->communities);
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\State;


use Illuminate\Http\Request;

class StateController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = State::query();

        if ($request->has('totalApplications'))
        {
            $query->withCount('applications');
        }

        return $query->get();
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Person;

class StatisticsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $applications = Application::count();
        $people = Person::count();

        return response()->json([
            'applications' => $applications,
            'people' => $people
        ]);
    }
}

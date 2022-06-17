<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Category;
use App\Models\Application;


class CategoriaController extends Controller
{
	public function index(Request $request) {
        $query = Category::query()->withCount('applications');
        $results = $request->perPage;

        return $query->paginate($results);
    }
}

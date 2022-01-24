<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;


class CategoryController extends Controller
{

	public function index(Request $request){
        $query = Category::query();
        $results = $request->perPage;

        if ($request->has('filter')) {
            $filters = $request->filter;
            $name = $filters['name'];
            $query->whereLike('name', $name);
        }

        return $query->paginate($results);
    }
}

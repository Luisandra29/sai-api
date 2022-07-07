<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Entity;
use App\Models\user;


class EntityController extends Controller
{
    public function index(Request $request){
        $query = Entity::query()->withCount('applications', 'users');

        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;

        if ($request->has('filter')) {
            $filters = $request->filter;

            if (array_key_exists('search', $filters)) {
                $query->whereLike('name', $filters['search']);
            }
        }



        if ($sort && $order) {
            $query->orderBy($sort, $order);
        }

        return $query->paginate($results);
    }

    public function store(Request $request)
    {
        $entity = Entity::create($request->all());

        return $entity;
    }

    public function show(Entity $entity)
    {
        return $entity->load(['users', 'applications'])->loadCount('users', 'applications');
    }


    public function update(Request $request, Entity $entity)
    {
        $entity->update($request->all());

        return $entity;
    }

    public function destroy(Entity $entity)
    {

        $user= User::whereEntityId($entity->id)->update([
            'entity_id' => null
        ]);

        $entity->delete();

        return $entity;
    }
}

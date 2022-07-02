<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = User::latest();
        $results = $request->perPage;
        $filters = $request->has('filter') ? $request->filter : [];
        $sort = $request->sort;
        $order = $request->order;

        // Get fields
        if (array_key_exists('full_name', $filters)) {
            $query->whereLike('full_name', $filters['full_name']);
        }
        if (array_key_exists('login', $filters)) {
            $query->whereLike('login', $filters['login']);
        }
        if (array_key_exists('roles', $filters)) {
            $query->whereHas('roles', function ($query) use ($filters) {
                return $query->whereLike('name', $filters['roles']);
            });
        }
        if (array_key_exists('status', $filters)) {
            $status = ($filters['status'] == 'Activos') ? 1 : 0;
            $query->whereActive($status);
        }
        if (array_key_exists('id', $filters)) {
            $query->find($filters['id']);
        }

        if ($sort && $order) {
            $query->orderBy($sort, $order);
        }

        if ($request->type == 'pdf') {
            return $this->report($query);
        }

        return $query->paginate($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'login' => ['required', 'unique:users'],
            'password' => 'required',
            'roles' => 'required'
        ], [
            'roles.required' => 'Seleccione uno o más roles',
            'password.required' => 'Ingrese una contraseña',
            'login.required' => 'Ingrese el nombre de usuario.',
            'login.unique' => 'El nombre de usuario se encuentra en uso',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $create = User::create([
            'login' => $request->input('login'),
            'password' => bcrypt($request->input('password'))
        ]);

        $create->roles()->sync($request->roles);

        return $create;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $user->load('roles');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'login' => [
                'required',
                Rule::unique('users')->ignore($user),
            ],
        ], [
            'login.required' => 'Ingrese el nombre de usuario.',
            'login.unique' => 'El nombre de usuario se encuentra en uso',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $data = [
            'login' => $request->login
        ];

        if ($request->password) {
            $data->password = bcrypt($request->password);
        }

        $user->update($data);

        $user->roles()->sync($request->roles);

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $destroy  = User::find($user->id);
        $destroy->active=0;

        $destroy->save();
    }
}

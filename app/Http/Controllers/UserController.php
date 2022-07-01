<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rol;
use App\Models\Parish;
use App\Models\Community;
use App\Models\Person;
use Illuminate\Support\Str;
use App\Notifications\SignupActivate;
use App\Http\Requests\CreateUserRequest;
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
        $query = User::with('roles')->latest();
        $results = $request->perPage;

        if ($request->has('filter')) {
            $filters = $request->filter;
            // Get fields

            if (array_key_exists('user_name', $filters)) {
                $query->where('login', 'like', '%'.$filters['user_name'].'%');
            }

            /*if (array_key_exists('rol', $filters)) {
                $query->whereHas('role', function ($query) use ($filters) {
                    return $query->whereLike('name', $filters['rol']);
                });
            }
            if (array_key_exists('status', $filters)) {
                $status = ($filters['status'] == 'Activos') ? 1 : 0;
                $query->whereActive($status);
            }*/
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
        $password = Hash::make($request->password);

        $user = User::create([
            'login' => $request->login,
            'password' => $password,
            'active' => true
        ]);

        return $user;
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

        // if ($request->password) {
        //     $data->password = bcrypt($request->password);
        // }

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

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

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = User::latest()->with(['role']);
        $results = $request->perPage;

        if ($request->has('filter')) {
            $filters = $request->filter;
            // Get fields
            if (array_key_exists('email', $filters)) {
                $query->whereLike('email', $filters['email']);
            }
            /*if (array_key_exists('name', $filters)) {
                $query->whereHas('person', function ($query) use ($filters) {
                    return $query->whereLike('name', $filters['name']);
                });
            }*/

            if (array_key_exists('rol', $filters)) {
                $query->whereHas('role', function ($query) use ($filters) {
                    return $query->whereLike('name', $filters['rol']);
                });
            }
            if (array_key_exists('status', $filters)) {
                $status = ($filters['status'] == 'Activos') ? 1 : 0;
                $query->whereActive($status);
            }
        }

        return $query->paginate($results);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = Rol::get();

        return response()->json([
            'roles' => $roles
        ]);
    }

        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(CreateUserRequest $request)
    {
        $password = Hash::make($request->password);

        // $person = Person::create([
        //     'dni' => $request->dni,
        //     'name' => $request->name,
        //     'address' => $request->address,
        //     'phone' => $request->phone,
        //     'community_id' => $request->community_id,
        //     'parish_id' => $request->parish_id,

        // ]);

        $user = User::create([
            'email' => $request->email,
            'password' => $password,
            'activation_token' => Str::random(60),
            'active' => true,
            'role_id' => $request->role,
        ]);


        $user->notify(new SignupActivate($user->activation_token));

        return response()->json([
            'success' => true,
            'message' => '¡Usuario creado!'
        ], 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $query = $user->load('role');

        return Response($query);
    }


    public function activate($token)
    {
        $user = User::where('activation_token', $token)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => '¡El usuario ya tiene una cuenta activa!'
            ], 404);
        }

        $user->active = true;
        $user->activation_token = '';
        $user->save();

        return response()->json([
            'success' => true,
            'message' => '¡Su cuenta ha sido activada!'
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
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
        $user->update(['role_id' => $request->get('role_id')]);;

        return response()->json([
            'id' => $user->id,
            'attributes' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }


    public function changeStatus(User $user)
    {
        $status = $user->active;
        $user->active = !$status;
        $user->save();
        $message = 'desactivado';

        if (!$status) {
            $message = 'activado';
        }

        return response()->json([
            'message' => 'El usuario '.$user->profile->fullName.' ha sido '.$message
        ]);
    }

}

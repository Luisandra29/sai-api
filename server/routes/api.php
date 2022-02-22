<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

/**
 * Users
 */
Route::post('login', 'AuthController@login');
Route::post('recover-account', 'PasswordResetController@recover');
Route::post('reset-password', 'PasswordResetController@resetPassword');
Route::get('activate-account/{token}', 'UserController@activate');

Route::get('parishes/{parish}/communities', 'ParishController@getCommunities')
    ->name('parish.communities');
Route::resource('users', 'UserController');



// Route::group(['middleware' => ['auth:sanctum']], function () {
    function(Request $request) {
        return auth()->user();
    };

    Route::get('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@getUser');
    Route::post('update-password', 'UpdatePasswordController');

    Route::resource('users', 'UserController')->only([
    //Route::resource('user', 'UserController')->only([

        'index', 'destroy', 'update', 'show'
    ]);

    Route::get('states', 'StateController');
    Route::resource('parishes', 'ParishController');
    Route::resource('communities', 'CommunityController');
    Route::post('categories/delete', 'CategoryController@deleteMany');
    //Route::post('categories/create', 'CategoryController@store');
   // Route::get('categories/list', 'CategoryController@list');

    Route::resource('categories', 'CategoryController');
    Route::get('categorias', 'CategoriaController@index');



    // Applications
    Route::resource('applications', 'ApplicationController');
    Route::get('applications/{application}/download', 'ApplicationController@download')
        ->name('applications.download-cert');
    // Analytics
    Route::get('home', 'AnalyticsController@home');

    // Roles
    Route::get('roles', 'RoleController@index');
    Route::post('users/{user}/update-status', 'UserController@changeStatus');




// });




// Authenticated only
/*Route::middleware('auth:api')->group(function () {

    Route::get('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@getUser');
    Route::post('update-password', 'UpdatePasswordController');

    Route::resource('users', 'UserController')->only([
        'index', 'destroy', 'update', 'show'
    ]);

    Route::get('states', 'StateController');
    Route::resource('parishes', 'ParishController');
    Route::resource('communities', 'CommunityController');
    Route::post('categories/delete', 'CategoryController@deleteMany');
    Route::resource('categories', 'CategoryController');


    // Applications
    Route::resource('applications', 'ApplicationController');
    Route::get('applications/{application}/download', 'ApplicationController@download')
        ->name('applications.download-cert');
    // Analytics
    Route::get('home', 'AnalyticsController@home');

    // Roles
    Route::get('roles', 'RoleController@index');
    Route::post('users/{user}/update-status', 'UserController@changeStatus');
});*/



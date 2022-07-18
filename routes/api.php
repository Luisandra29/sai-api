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

Route::post('login', 'AuthController@login');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::group(['middleware' => ['role:super-admin']], function () {
        Route::resource('users', 'UserController');
        Route::resource('roles', 'RoleController');
    });

    Route::get('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@getUser');
    Route::post('update-password', 'UpdatePasswordController');

    Route::get('states', 'StateController');
    Route::resource('parishes', 'ParishController');

    Route::resource('communities', 'CommunityController');
    Route::resource('sectors', 'SectorController');
    Route::resource('streets', 'StreetController');


    Route::get('parishes/{parish}/report', 'ParishController@report');
    Route::get('communities/{community}/report', 'CommunityController@report');
    Route::get('sectors/{sector}/report', 'SectorController@report');
    Route::get('streets/{street}/report', 'StreetController@report');

    Route::resource('categories', 'CategoryController');

    Route::resource('subcategories', 'SubcategoryController');

    //People
    Route::resource('people', 'PersonController');

    // Applications
    Route::resource('applications', 'ApplicationController');
    Route::get('applications/{application}/download', 'ApplicationController@download')
        ->name('applications.download-cert');
    // Analytics
    Route::get('/statistics', 'StatisticsController');

    // Roles
    Route::resource('roles', 'RoleController');
    Route::post('users/{user}/update-status', 'UserController@changeStatus');

    //Positions
    Route::resource('positions', 'PositionController');

    //Entities
    Route::resource('entities', 'EntityController');
});


<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('num', 8);
            $table->string('title', 100);
            $table->string('description', 500);
            $table->integer('quantity')->nullable();
            $table->unsignedBigInteger('subcategory_id');
            $table->unsignedBigInteger('state_id');
            $table->unsignedBigInteger('person_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('subcategory_id')->references('id')->on('subcategories')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('state_id')->references('id')->on('states')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('person_id')->references('id')->on('people')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->timestamp('approved_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applications');
    }
}

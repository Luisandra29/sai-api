<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('dni')->unique();
            $table->string('name');
            $table->string('address');
            $table->string('phone');
            $table->timestamps();
            $table->unsignedBigInteger('parish_id');
            $table->unsignedBigInteger('community_id');
            $table->unsignedBigInteger('sector_id');
            $table->unsignedBigInteger('street_id');
            $table->foreign('parish_id')->references('id')->on('parishes')
            ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('community_id')->references('id')->on('communities')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('sector_id')->references('id')->on('sectors')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('street_id')->references('id')->on('streets')
                ->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('people');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInstitutionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('institutions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
            });

            Schema::create('person_institution', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('person_id');
                $table->unsignedBigInteger('institution_id');
                $table->foreign('person_id')->references('id')->on('people')
                    ->onUpdate('cascade')->onDelete('cascade');
                $table->foreign('institution_id')->references('id')->on('institutions')
                    ->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('person_institution');
        Schema::dropIfExists('institutions');
    }
}

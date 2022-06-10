<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSectorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sectors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
            $table->unsignedBigInteger('community_id');
            $table->foreign('community_id')->references('id')->on('communities')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('streets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('street_sector', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sector_id');
            $table->unsignedBigInteger('street_id');
            $table->foreign('sector_id')->references('id')->on('sectors')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('street_id')->references('id')->on('streets')
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
        Schema::dropIfExists('street_sector');
        Schema::dropIfExists('streets');
        Schema::dropIfExists('sectors');
    }
}

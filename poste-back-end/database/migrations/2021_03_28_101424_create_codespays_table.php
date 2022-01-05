<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCodespaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('codespays', function (Blueprint $table) {
            $table->id();
            $table->string('code',50);
            $table->string('name',50);
            $table->string('groupe',50);
            $table->string('codecoursier',50);
            $table->string('codezone',10);
            $table->string('langue',10);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('codespays');
    }
}

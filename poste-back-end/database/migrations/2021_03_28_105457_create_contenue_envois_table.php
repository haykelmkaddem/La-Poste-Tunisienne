<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContenueEnvoisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contenue_envois', function (Blueprint $table) {
            $table->id('code_contenue');
            $table->string('code_envoi');
            $table->string('code_hs');
            $table->string('libelle_artique');
            $table->integer('quantite');
            $table->string('devise');
            $table->float('prix_total_ht');
            $table->string('pays_origine');
            $table->float('poids_net');
            $table->integer('index_cds');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contenue_envois');
    }
}

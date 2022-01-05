<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUtilisateurcommercialesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('utilisateurcommerciales', function (Blueprint $table) {
            $table->id();
            $table->string('code_client' ,100)->unique();
            $table->string('nom reson sociale' ,100);
            $table->string('mot_de_passe' ,50);
            $table->string('code_unite_com' ,50);
            $table->string('adresse' ,150);
            $table->string('cadresse' ,100);
            $table->string( 'localite' ,100);
            $table->string( 'code_postal' ,4);
            $table->string( 'telephone' ,10);
            $table->string('fax' ,10);
            $table->string('email' ,60)->unique();
            $table->string('REF_importateur' ,25);
            $table->string('ccp' ,20);
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
        Schema::dropIfExists('utilisateurcommerciales');
    }
}

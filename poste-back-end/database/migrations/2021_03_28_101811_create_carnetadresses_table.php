<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarnetadressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carnetadresses', function (Blueprint $table) {
            $table->id();
            $table->string('code_client',100);
            $table->string('nom_raison',100);
            $table->string('adresse',100);
            $table->string('c_adresse',100);
            $table->string('pays',100);
            $table->string('ville',100);
            $table->string('code_postal',100);
            $table->string('gsm',100);
            $table->string('telephone',100);
            $table->string('fax',100);
            $table->string('nom_aberge',100);
            $table->string('email',100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carnetadresses');
    }
}

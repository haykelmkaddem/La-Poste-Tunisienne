<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBordereaudepotdepotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bordereaudepotdepots', function (Blueprint $table) {
            $table->id();
            $table->string('code_bordereau', 50  );
            $table->dateTime('date_bordereau' );
            $table->string('etat_borderaux', 10  );
            $table->string('code_client_depot', 60  );
            $table->string('code_client', 20  );
            $table->string('code_service', 10  );
            $table->string('validation', 1  );
            $table->dateTime('date_validation' );
            $table->string('anne_depot', 4  );
            $table->integer('mois_depot'  );
            $table->integer('montant_depot_sr');
            $table->integer('montant_avec_remise');
            $table->integer('mnt_tax_vd');
            $table->string('registre_decommerce', 60  );
            $table->string('reception', 1  );
            $table->dateTime('date_reception' );
            $table->string('matricule_reception', 6  );
            $table->string('demande_collecte', 1  );
            $table->string('etat_collecte', 1  );
            $table->date('date_collecte' );
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
        Schema::dropIfExists('bordereaudepotdepots');
    }
}

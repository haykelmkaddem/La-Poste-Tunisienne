<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnvoisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('envois', function (Blueprint $table) {
            $table->id();
            $table->string('CODE_CLIENT',20)  ;
            $table->string('code_BORDREAU',50) ;
            $table->string('NUM_BORDREAU_CLIENT',5)  ;
            $table->string('MAILITM_FID',20)  ;
            $table->string('NATURE' ,1) ;
            $table->string('categorie' ,50) ;
            $table->string('description' ,150 );
            $table->string('service' ,20);
            $table->integer('MAILITM_WEIGHT_estime') ;
            $table->integer('TAXE_estime'  );
            $table->integer('taxe_avec_remise' ) ;
            $table->string('INFOS_COUNTRY_DEST' ,35) ;
            $table->string('DEST_COUNTRY_CD' ,2) ;
            $table->string('EVT_GMT_DT' ,20) ;
            $table->string('CUSTOMER_NAME' ,150);
            $table->string('CUSTOMER_ADDRESS' ,105) ;
            $table->string('CUSTOMER_CITY' ,32) ;
            $table->string('CUSTOMER_POST_CODE' ,8) ;
            $table->string('CUSTOMER_PHONE' ,64) ;
            $table->string('CUSTOMER_GSM' ,64 );
            $table->string('CUSTOMER_MAIL' ,64) ;
            $table->string('adressee_NAME' ,150);
            $table->string('adressee_ADDRESS' ,105) ;
            $table->string('adressee_CITY' ,32) ;
            $table->string('adressee_POST_CODE' ,8) ;
            $table->string('adressee_pHONE' ,64) ;
            $table->string('adressee_GSM' ,64) ;
            $table->string('adressee_MAIL' ,64) ;
            $table->string('ORIGINE_COUNTRY_CD' ,2) ;
            $table->string('INFOS_COUNTRY_CD' ,35) ;
            $table->dateTime('dateheuredepot' ) ;
            $table->integer('cloture');
            $table->string('crbt' ,1 );
            $table->integer('Mnt_crbt' ) ;
            $table->string('VD' ,1) ;
            $table->integer('val_dec');
            $table->integer('tax_vd');
            $table->string('depose' ,1) ;
            $table->date('date_depot_bureau') ;
            $table->integer('taxe_reel') ;
            $table->string('nature_envois' ,20);
            $table->string('REF_client' ,25);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('envois');
    }
}

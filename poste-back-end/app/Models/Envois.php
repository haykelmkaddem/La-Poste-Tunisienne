<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Envois extends Model
{
    use HasFactory;
    public $incrementing = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'CODE_CLIENT',
        'code_BORDREAU',
        'NUM_BORDREAU_CLIENT',
        'MAILITM_FID',
        'NATURE',
        'categorie',
        'description',
        'service',
        'MAILITM_WEIGHT_estime',
        'TAXE_estime',
        'taxe_avec_remise',
        'INFOS_COUNTRY_DEST',
        'DEST_COUNTRY_CD',
        'EVT_GMT_DT',
        'CUSTOMER_NAME',
        'CUSTOMER_ADDRESS',
        'CUSTOMER_CITY',
        'CUSTOMER_POST_CODE',
        'CUSTOMER_PHONE',
        'CUSTOMER_GSM',
        'CUSTOMER_MAIL',
        'adressee_NAME',
        'adressee_ADDRESS',
        'adressee_CITY',
        'adressee_POST_CODE',
        'adressee_pHONE',
        'adressee_GSM',
        'adressee_MAIL',
        'ORIGINE_COUNTRY_CD',
        'INFOS_COUNTRY_CD',
        'dateheuredepot',
        'cloture',
        'crbt',
        'Mnt_crbt',
        'VD',
        'val_dec',
        'tax_vd',
        'depose',
        'date_depot_bureau',
        'taxe_reel',
        'nature_envois',
        'REF_client',
    ];
}

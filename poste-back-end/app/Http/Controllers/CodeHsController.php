<?php

namespace App\Http\Controllers;

use App\Models\CodeHs;
use Illuminate\Http\Request;

class CodeHsController extends Controller
{
    public function find(Request $request){
        $search = $request->search;
        $result = CodeHs::where('nom','LIKE',$search.'%')->orWhere('key_word','LIKE',$search.'%')->get();
        return $result;
    }

    public function findAll(Request $request){

        $result = CodeHs::all();
        return $result;
    }
}

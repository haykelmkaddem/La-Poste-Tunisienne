<?php

namespace App\Http\Controllers;


use App\Models\Document;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade as PDF;

class PdfController extends Controller
{
    public function generatePdf(Request $request){
        $data =[
            'desc'=> $request->desc,
            'p1'=> $request->p1,
            'p2'=> $request->p2,
            'p3'=> $request->p3,
            'p4'=> $request->p4,
            'p5'=> $request->p5,
            'val1'=> $request->val1,
            'val2'=> $request->val2,
            'val3'=> $request->val3,
            'val4'=> $request->val4,
            'val5'=> $request->val5,
            'tsr'=> $request->tsr,
            'dom'=> $request->dom,
            'crbt'=> $request->crbt,
            'pays'=> $request->pays,
            'pnet'=> $request->pnet,
            'tot'=> $request->tot,
        ];
        Document::updateOrCreate(
            ['idenvoi' => $request->id],
            [
                'idenvoi' => $request->id,
            'idbord' => $request->idbord,
            'cn22' => $request->id.'-cn22.pdf'

        ]);

        $pdf = PDF::loadView('cn22',$data);
        $pdf->setOptions(['DOMPDF_ENABLE_CSS_FLOAT' => true]);
        //$pdf->download($request->id.'cn22.pdf');
        return $pdf->stream($request->id.".pdf");
    }
}

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
        *{
            margin: 0px!important;
            padding: 5px!important;
        }
        table{
            width: 500px;
        }
        .tg  {border-collapse:collapse;border-spacing:0;}
        .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
            overflow:hidden;padding:10px 20px;word-break:normal;}
        .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
            font-weight:normal;overflow:hidden;padding:10px 20px;word-break:normal;}
        .tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
        .check{
            height: 10px;
            width: 10px;
            border-right:1px solid black ;
        }
    </style>
</head>
<body>

<table class="tg">
    <thead>
    <tr>
        <th class="tg-0pky" colspan="6"></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td class="tg-0pky" colspan="3"><h2><b>Déclaration en douane</b></h2></td>
        <td class="tg-0pky" colspan="2">Peut etre <br> ouvert d'office</td>
        <td class="tg-0pky" colspan="1"><h2>CN 22</h2></td>
    </tr>
    <tr>
        <td class="tg-0pky" colspan="4"><h4>La Poste tunisienne</h4></td>
        <td class="tg-0pky" colspan="2"><h4>Important!</h4>Voir instruction au verso</td>
    </tr>
    <tr>
        <td class="tg-0pky" colspan="2"><h6> Cadeau</h6></td>
        <td class="tg-0pky" colspan="4"><h6> Echantillion commercial</h6></td>
    </tr>
    <tr>
        <td class="tg-0pky" colspan="2"><h6>  Document</h6></td>
        <td class="tg-0pky" colspan="4"><h6>  Retour de marchandise</h6></td>
    </tr>
    <tr>
        <td class="tg-0pky" colspan="2"><h6>  Vente de marchandise</h6></td>
        <td class="tg-0pky" colspan="4"><h6>  Autre (veuillez spécifier):______________</h6></td>
    </tr>
    <tr>
        <td class="tg-0pky" colspan="2">Quantité et description détaillée du contenu (1)</td>
        <td class="tg-0pky">Poids <br> net (2)</td>
        <td class="tg-0pky">Valeur et monnaie (3) <br></td>
        <td class="tg-0pky">Valeur tarifaire SH* (4) <br></td>
        <td class="tg-0pky">Pays d'origine (5) <br></td>
    </tr>
    <tr>
        <td class="tg-0pky" colspan="2">
            {{$desc}}
        </td>
        <td class="tg-0pky">
            <h6 style="font-size: 10px;">{{$p1}}</h6>
            <h6 style="font-size: 10px;">{{$p2}}</h6>
            <h6 style="font-size: 10px;">{{$p2}}</h6>
            <h6 style="font-size: 10px;">{{$p3}}</h6>
            <h6 style="font-size: 10px;">{{$p4}}</h6></td>
        <td class="tg-0pky">
            <h6 style="font-size: 10px;">{{$val1}}</h6>
            <h6 style="font-size: 10px;">{{$val2}}</h6>
            <h6 style="font-size: 10px;">{{$val3}}</h6>
            <h6 style="font-size: 10px;">{{$val4}}</h6>
            <h6 style="font-size: 10px;">{{$val5}}</h6></td>
        <td class="tg-0pky">
            <h6 style="font-size: 10px;">{{$tsr}}</h6>
        </td>
        <td class="tg-0pky">
            <h6 style="font-size: 10px;">{{$pays}}</h6>
        </td>
    </tr>
    <tr>
        <td class="tg-0pky" colspan="3"> Poids total (en kg) (6)
            <h6 style="font-size: 10px;">{{$pnet}}</h6></td>
        <td class="tg-0pky"> Valeur totale (7)
            <h6 style="font-size: 10px;">{{$tot}}</h6></td>
        <td class="tg-0pky"></td>
        <td class="tg-0pky"></td>
    </tr>
    <tr>
        <td class="tg-0pky" colspan="6" rowspan="2"></td>
    </tr>
    <tr>
    </tr>
    </tbody>
</table>
</body>
</html>

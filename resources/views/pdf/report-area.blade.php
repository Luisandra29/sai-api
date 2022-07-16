<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <!-- CSRF Token -->
        <title> REPORTE DE {{ $title }} </title>
        <style>
           body {
                font-family: 'Helvetica';
                font-size: 15px;
            }
            .header {
                width: 100%;
                font-size: 9px;
                position: relative;
                display: block;
            }
            .header div {
                display: inline-block;
            }
            .heading{
                text-align: center;
                font-size: 12px;
                margin-right: -3px;
                margin-left: 70px;
            }
            #entesLOGO {
                float: right;
                margin-top: -3px;
                margin-left: -7px;
                z-index: 2;
            }
            table, td, th {
                border: 1px #000 solid;
            }
            td {
                font-size: 12px;
                padding: 2px 1px;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                margin-top: 5px;
            }
            .details td {
                text-align: center;
            }
            .details .object-payment {
                text-align: left;
                padding-left: 3px;
            }
            .tables {
                display:block;
                text-align: center;
            }
            .bill-info {
                width: 100%;
                clear: both;
                font-weight: bold;
            }
            .col-bill-info {
                float: left;
                width: 50%;
                font-size: 16px;
            }
            .total-amount {
                text-align: right;
            }
            .miscellaneus {
                font-size: 12px;
            }
            caption {
                font-weight: bold;
            }
            th {
                font-size: 10px;
                padding: 3px 1px;
            }
        </style>
    </head>

    <body>

        <div class="container">
            <div class="header">
                <div class="alcLOGO">
                    <img src="{{ base_path().'/public/images/logoAlcaldia.png' }}" height="110px" width="150px" alt="sumatlogo"/>

                </div>
                <div class="heading">
                <p>
                    REPÚBLICA BOLIVARIANA DE VENEZUELA<br>
                    ALCALDÍA BOLIVARIANA DEL MUNICIPIO BERMÚDEZ<br>
                    DESPACHO DE LA ALCALDÍA BOLIVARIANA DEL MUNICIPIO BERMÚDEZ<br>
                    ESTADO SUCRE - MUNICIPIO BERMÚDEZ<br>
                </p>
                </div>
                <div id="entesLOGO">
                    <img src="{{ base_path().'/public/images/DTI.png' }}" height="80px" width="90px" alt="logo" />
                    <img src="{{ base_path().'/public/images/fundLogo.png' }}" height="90px" width="140px" alt="logo" />
                </div>
            </div>

        <p>CANTIDAD DE {{ $subTitle }}: <b>{{ $total }}</b></p>
        <div class="tables">

            <caption>REPORTE DE {{ $title }} <span style="text-transform:uppercase"><b>{{ $name }}</b></span></caption>

            <br>
            <table style="text-align: center">
                <tbody>
                  <tr>
                    <th width="60%">{{$subTitle}}</th>
                    <th width="40%">CANTIDAD DE PERSONAS</th>

                  </tr>

                  @foreach($subAreas as $index => $subArea)
                      <tr>
                         <td>{{ $subArea->name }}</td>
                         <td>{{ $subArea->people->count() }}</td>
                     </tr>
                  @endforeach
                 
                </tbody>
            </table>
            <br>
            <div class="bill-info">
                <div class="col-bill-info">
                    FECHA DE EMISIÓN: {{ $emissionDate }}
                </div>
            </div>
        </div>
    </div>
    </body>
</html>
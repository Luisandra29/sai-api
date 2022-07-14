<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <!-- CSRF Token -->
        <title> Reporte de solicitudes </title>
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
                margin-left: 35px;


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
                    <img src="{{ base_path().'/public/images/logoAlcaldia.png' }}" height="90px" width="180px" alt="sumatlogo"/>

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

        <p>Nº DE SOLICITUDES: <b>{{ $total }}</b></p>
        <div class="tables">
            <caption>REPORTE DE SOLICITUDES</caption>
            <br>
            <table style="text-align: center">
                <tbody>
                  <tr>
                    <th width="30%">SOLICITANTE</th>
                    <th width="10%">C.I</th>
                    <th width="30%">ASUNTO</th>
                    <th width="10%">NO. SOLICITUD</th>
                    <th width="15%">SUBCATEGORÍA</th>
                  </tr>
                    @foreach($applications as $index => $application)
                        <tr>
                           <td>{{ $application->person->name }}</td>
                           <td>{{ $application->person->dni }}</td>
                           <td>{{ $application->title }}</td>
                           <td>{{ $application->num }}</td>
                           <td>{{ $application->subcategory->name }}</td>
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

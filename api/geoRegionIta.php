<?php

include('../php/funzioni.php');
header("Content-type: application/json");

//prendo in ingresso l'anno
$tipo_dato = analizza_GET2("Tipologia");

$tipologia = "usano internet";
if($tipo_dato == "usano internet")
    $tipologia = "usano internet";
else if ($tipo_dato == "mensilmente")
    $tipologia = "mensilmente";
else if ($tipo_dato == "settimanalmente")
    $tipologia = "settimanalmente";
else if ($tipo_dato == "quotidianamente")
    $tipologia = "quotidianamente";

$sql = "SELECT Territorio, Valore
		FROM internetregioni
        WHERE  Misura = 'per 100 persone con le stesse caratteristiche' 
        and Anno ='2016'
        and Tipologia = '".$tipologia."'";

$campi = array('Territorio' => 'utf8_encode', 'Valore' => 'floatval');

echo query_cartine($sql, $campi);


?>
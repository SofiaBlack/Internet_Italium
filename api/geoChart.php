<?php

include('../php/funzioni.php');
header("Content-type: application/json");

//prendo in ingresso l'anno
$tipo_anno = analizza_GET("Anno");
// default
$anno = "2008";
if ($tipo_anno == "2008")
    $anno = "2008";
else if ($tipo_anno == "2014")
    $anno = "2014";
else if($tipo_anno == "2016")
    $anno = "2016";

$sql = "SELECT Nazione, Valore
        FROM interneteu
        WHERE Anno ='".$anno."'";

$campi = array("Nazione" => "utf8_encode","Valore" => "floatval");

echo query_cartine($sql, $campi);


?>
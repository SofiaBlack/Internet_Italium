<?php
include('../php/funzioni.php');
header("Content-type: application/json");

//prendo in ingresso l'anno
$tipo_anno = analizza_GET("Anno");
// default
$anno = "2015";
if ($tipo_anno == "2015")
    $anno = "2015";
else if ($tipo_anno == "2016")
    $anno = "2016";

$sql = "SELECT Nazione, Valore
        FROM competenzedigitali
        WHERE Anno ='".$anno."'";

$campi = array("Nazione" => "utf8_encode","Valore" => "floatval");

echo esegui_query($sql, $campi,false);
?>
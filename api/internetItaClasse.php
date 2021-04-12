<?php

include('../php/funzioni.php');
header("Content-type: application/json");

$tipo_anno = analizza_GET("Anno");
// default
$anno = "2014";
if ($tipo_anno == "2014")
    $anno = "2014";
else if ($tipo_anno == "2015")
    $anno = "2015";
else if($tipo_anno == "2016")
    $anno = "2016";

$sql = "SELECT Fascia as name, Valore, Tipologia
        FROM internetclasseeta
        WHERE Misura = 'per 100 persone con le stesse caratteristiche' 
            and Sesso = 'totale'
            and Tipologia <> 'usano internet'
            and Anno = '".$anno."'
        ORDER BY Fascia";

$campi = array ('name' => 'utf8_encode', 'Valore' => 'floatval', 'Tipologia' => 'utf8_encode');

echo esegui_query($sql, $campi, true);
?>
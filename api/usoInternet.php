<?php

include('../php/funzioni.php');
header("Content-type: application/json");
 
$sql = "SELECT Fascia , Valore
		FROM internetclasseeta 
        WHERE Misura = 'per 100 persone con le stesse caratteristiche'  
            and Sesso = 'totale' and Tipologia = 'usano Internet' and Anno <> '2017'";

$campi = array('Fascia' => 'utf8_encode', 'Valore' => 'floatval');

echo esegui_query($sql, $campi, true);

?>
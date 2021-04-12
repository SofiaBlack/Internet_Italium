<?php

include('../php/funzioni.php');
header("Content-type: application/json");
 
$sql = "SELECT Tipologia , Valore
		FROM internetita";

$campi = array('Tipologia' => 'utf8_encode', 'Valore' => 'floatval');

echo esegui_query($sql, $campi, true);

?>
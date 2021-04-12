<?php

include('../php/funzioni.php');
header("Content-type: application/json");

$sql = "SELECT Territorio, Valore
		FROM venditeonlineita
        WHERE  Tipologia = 'da 3 mesi a 1 anno fa' 
        and Anno ='2016'";

$campi = array('Territorio' => 'utf8_encode', 'Valore' => 'floatval');

echo query_cartine($sql, $campi, false);


?>
<?php
include('../php/funzioni.php');
header("Content-type: application/json");

$sql = "SELECT Nazione, Valore
        FROM fibraeuropa
        WHERE Anno ='2016'";

$campi = array("Nazione" => "utf8_encode","Valore" => "floatval");

echo esegui_query($sql, $campi,false);
?>
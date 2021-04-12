<?php
include('../php/funzioni.php');
header("Content-type: application/json");

//prendo in ingresso l'anno
$tipo_dato = analizza_GET4("Tipologia");

$tipologia = "Connessione";
if($tipo_dato == "Connessione")
    $tipologia = "Connettività";
else if ($tipo_dato == "Capitale Umano")
    $tipologia = "Capitale Umano";
else if ($tipo_dato == "Tecnologia Digitale")
    $tipologia = "Tecnologia Digitale";
else if ($tipo_dato == "Servizi Pubblici Digitali")
    $tipologia = "Servizi Pubblici Digitali";


$sql = "SELECT Nazione, Valore
		FROM situazioneeu
		WHERE Tipologia = '".$tipologia."'";

$campi = array('Nazione' => 'utf8_encode', 'Valore' => 'floatval');

echo esegui_query($sql, $campi, false);
?>
<?php

include('../php/funzioni.php');
header("Content-type: application/json");

//prendo in ingresso l'anno
$tipo_dato = analizza_GET3("Tipologia");

$tipologia = "connessione a banda larga";
if($tipo_dato == "connessione a banda larga")
    $tipologia = "connessione a banda larga";
else if ($tipo_dato == "connessione fissa a banda larga")
    $tipologia = "connessione fissa a banda larga";

$sql = "SELECT Territorio, Valore
		FROM internetbanda
        WHERE Tipologia = '".$tipologia."'";

$campi = array('Territorio' => 'utf8_encode', 'Valore' => 'floatval',);

echo esegui_query($sql, $campi, false);

?>
<?php 

//CONNESSIONE A MySQL
function openDB($database="544914", $password=NULL, $username="root", $servername="localhost") {
$db = mysqli_connect($servername, $username, $password, $database);
if (!$db) 
    die ("Connessione fallita: ".mysqli_connect_error());
return $db;
}

//LETTURA RECORDS
function select($db,$sql){
//Esecuzione query
$resultSet = mysqli_query($db, $sql);
if (!$resultSet) 
    print ("Errore esecuzione $sql:".mysqli_error());
// Copio i records in un array associativo
while($rec=mysqli_fetch_assoc($resultSet)) 
    $records[]=$rec;
return $records;
}

//CHIUSURA CONNESSIONE A MySQL

function closeDB($db){
    mysqli_close($db);
}

?>
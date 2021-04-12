<?php
/*************FUNZIONI ANALIZZA GET ***********************/

/* AnalizzaGet in base all'anno*/
function analizza_GET($parametro)
{
    if(isset($_GET[$parametro]))
    {
        $anno = $_GET[$parametro];
        $tipo_anno = "";
        switch($anno) 
        {
            case "2008":
                $tipo_anno = "2008";
                break;
            case "2014":
                $tipo_anno = "2014";
                break;
            case "2015":
                $tipo_anno = "2015";
                break;
            case "2016":
                $tipo_anno = "2016";
                break;
            default: 
                $tipo_anno = $anno;
        }
        return $tipo_anno;
    }
    else 
    {
        echo json_encode(
            array(  "status" => "error",
                    "dettagli" => "parametro $parametro mancante")
        );
        exit(1);
    }
}
/* AnalizzaGet in base alla tipologia di quantità d'utilizzo*/
function analizza_GET2($parametro)
{
    if(isset($_GET[$parametro]))
    {
        $tipologia = $_GET[$parametro];
        $tipo_dato = "";
        switch($tipologia) 
        {
            case "mensilmente":
                $tipo_dato = "mensilmente";
                break;
            case "annualmente":
                $tipo_dato = "annualmente";
                break;
            case "usano internet":
                $tipo_dato = "usano internet";
                break;
            case "settimanalmente":
                $tipo_dato = "settimanalmente";
                break;
            case "giornalmente":
                $tipo_dato = "giornalmente";
                break;
            default: 
                $tipo_dato = $tipologia;
        }
        return $tipo_dato;
    }
    else 
    {
        echo json_encode(
            array(  "status" => "error",
                    "dettagli" => "parametro $parametro mancante")
        );
        exit(1);
    }
}
 /*AnalizzaGet in base alla tipologia di connessione*/
function analizza_GET3($parametro)
{
    if(isset($_GET[$parametro]))
    {
        $tipologia = $_GET[$parametro];
        $tipo_dato = "";
        switch($tipologia) 
        {
            case "connessione a banda larga":
                $tipo_dato = "connessione a banda larga";
                break;
            case "connessione fissa a banda larga":
                $tipo_dato = "connessione fissa a banda larga";
                break;
            default: 
                $tipo_dato = $tipologia;
        }
        return $tipo_dato;
    }
    else 
    {
        echo json_encode(
            array(  "status" => "error",
                    "dettagli" => "parametro $parametro mancante")
        );
        exit(1);
    }
}

/*AnalizzaGet in base alla tipologia di indice*/
function analizza_GET4($parametro)
{
    if(isset($_GET[$parametro]))
    {
        $tipologia = $_GET[$parametro];
        $tipo_dato = "";
        switch($tipologia) 
        {
            case "Connessione":
                $tipo_dato = "Connessione";
                break;
            case "Capitale Umano":
                $tipo_dato = "Capitale Umano";
                break;
            case "Tecnologia Digitale":
                $tipo_dato = "Tecnologia Digitale";
                break;
            case "Servizi Pubblici Digitali":
                $tipo_dato = "Servizi Pubblici Digitali";
                break;
            default: 
                $tipo_dato = $tipologia;
        }
        return $tipo_dato;
    }
    else 
    {
        echo json_encode(
            array(  "status" => "error",
                    "dettagli" => "parametro $parametro mancante")
        );
        exit(1);
    }
}


/******************FUNZIONI ESEGUI QUERY ******************/

/*Funzione che crea array associativi e non per la creazione dei grafici */
function esegui_query($sql, $campi, $is_associative)
{
    include("../api/config.php");
    $risultato = select($db, $sql);

    $return = array();
    $is_prima = true;
    for($i = 0; $i < count($risultato); $i++)
    {
        foreach ($campi as $chiave => $formato) 
        {
            if(isset($risultato[$i][$chiave]))
                $risultato[$i][$chiave] = $formato($risultato[$i][$chiave]);
        }
        if ($is_associative)
            $return[] = $risultato[$i];
        else 
        {
            
            
            $riga = array();
            foreach ($risultato[$i] as $chiave => $valore) 
            {
            
                $riga[] = $valore;
            }
            
            $return[] = $riga;
        }
    }

    closeDB($db);

    return json_encode($return);
}
/*Funzione che crea l'array richiesto per la creazione di grafici di tipo 'cartina' */
function query_cartine ($sql, $campi) {
    include("../api/config.php");
    $risultato = select($db, $sql);

    $return = array();
    $is_prima = true;
    for($i = 0; $i < count($risultato); $i++)
    {
        foreach ($campi as $chiave => $formato) 
        {
            if(isset($risultato[$i][$chiave]))
                $risultato[$i][$chiave] = $formato($risultato[$i][$chiave]);
        }
        $prima_riga = array();
        $riga = array();
        foreach ($risultato[$i] as $chiave => $valore) 
        {
            if($is_prima)
                $prima_riga[] = $chiave;
            $riga[] = $valore;
        }
        if($is_prima)
        {
            $return[] = $prima_riga;
            $is_prima = false;
        }
        $return[] = $riga;
    }
    

    closeDB($db);

    return json_encode($return);
}
?>
$(document).ready(function() {
    /*IN EUROPA*/
    crea_geo_chart();
    cambia_paragrafo();
    situazione_europea ();
    competenze_digitali();
    fibra_europa();
    /*IN ITALIA*/
    internet_banda();
    crea_grafico_colonne2();
    /*I GIOVANI*/
    crea_grafico_line();
    crea_grafico_colonne();
    /*IN EUROPA*/
    $("input[name=radioGeo]:radio").change(drawMarkersMap);
    $("input[name=radioGeo]:radio").change(cambia_paragrafo);
    $("input[name=radiositEu]:radio").change(situazione_europea);
    $("input[name=radioDig]:radio").change(competenze_digitali);
    /*IN ITALIA*/
    $("input[name=radioGeoIta]:radio").change(drawRegionMap);
    $("input[name=radioBanda]:radio").change(internet_banda);
    /*I GIOVANI*/
    $("input[name=radioAnno]:radio").change(crea_grafico_colonne);
});

/*FUNZIONE CHE CREA LE CARTINE*/
function crea_geo_chart() {
    google.charts.load("current", {
        "packages":["geochart"],
        "mapsApiKey": "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
    });
    google.charts.setOnLoadCallback(drawMarkersMap);
    google.charts.setOnLoadCallback(drawRegionMap);
    google.charts.setOnLoadCallback(drawRegionVendite);
}

/*************************SEZIONE EUROPA ***************************/

// Funzione che cambia il paragrafo della spiegazione della cartina europea a seconda sel radio selezionato
function cambia_paragrafo() {
    var PARAGRAFI = [
        {   
            anno: "2008",
            par: "Dalla cartina si può notare come nel 2008 l'Italia sia fra le nazioni più arretrate, avendo solo il 47% della popolazione con accesso a Internet in famiglia. La troviamo sopra a nazioni come Grecia, Romania e Bulgaria, mentre si distanzia di poco da Portogallo e Repubblica Ceca. Le nazioni più connesse si trovano tutte nel nord Europa."
        },{
            anno: "2014",
            par: "Nel 2014 l'Italia si trova ancora in una situazione di svantaggio rispetto alla maggior parte delle altre nazioni, con un 73% di famiglie connesse. Sopra si trovano ancora le nazioni del nord con un alto tasso di connessione: i Paese Bassi si trovano all'apice con il 96%, seguiti da Norvegia, Svezia e Finlandia. In fondo alla classifica troviamo sempre Bulgaria e Grecia con l'aggiunta della Romania."
        },{
            anno: "2016",
            par: "Anche nel 2016 la situazione italiana non è migliorata, rimanendo stabile nella sua arretratezza. Migliorano invece le nazioni dell'est Europa, che vede in ascesa Repubblica Ceca e Romania. (Mancano i dati relativi a Svizzera, presente nel 2014)"
        }
    ];
    var nodoParagrafo=document.getElementById("paragrafoEu");
    var anno = $("input[name=radioGeo]:checked").val();
    for (var i = 0; i < PARAGRAFI.length; i++){
        var elemento = PARAGRAFI[i];
        if (anno == PARAGRAFI[i].anno) {
            var nodoTesto = document.createTextNode(PARAGRAFI[i].par)
            nodoParagrafo.replaceChild(nodoTesto, nodoParagrafo.firstChild);
        }
    }
}

/*Funzione cartina europea*/
function drawMarkersMap() {
  var tipoAnno = $("input[name=radioGeo]:checked").val();
  $.getJSON("api/geoChart.php?Anno=" + tipoAnno, function(list) {
        var data = google.visualization.arrayToDataTable(list);
        var options = {
            region: 150,
            resolution: "countries",
            datalessRegionColor:'none',
            colorAxis: {colors: ["#FAEBD7","#6495ED"]},
            backgroundColor: "none"
        }
        var chart = new google.visualization.GeoChart(document.getElementById("geoChart"));
        chart.draw(data, options);
    });
}

/*Funzione che crea il grafico sulle competenze digitali europee */
function competenze_digitali () {  
    var anno = $("input[name=radioDig]:checked").val();
    $("#tabLine").empty();
    $.getJSON("api/competenzedigitali.php?Anno=" + anno, 
        function(result) {
            Highcharts.chart('compdig', {
                chart: {
                    type: 'column',
                    backgroundColor: null
                },
                title: {
                    text: 'Competenze Digitali di base o superiori in Europa'
                },
                subtitle: {
                    text: 'dati ricavati dal "Digital Single Marker Eu"'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Popolazione (percentuale)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Populazione: <b>{point.y:.1f} percento</b>'
                },
                series: [{
                    name: 'Nazioni',
                    data: result
                }]
            });
        })
    }


/*Funzione che crea il grafico sugli indicatori di digitalizzazione europei*/
function situazione_europea () {  
    $("#tabLine").empty();
    var tipologia = $("input[name=radiositEu]:checked").val();
    $.getJSON("api/SituazioneEuropea.php?Tipologia=" + tipologia, 
        function(result) {
            Highcharts.chart('situaEu', {
                chart: {
                    type: 'column',
                    backgroundColor: null
                },
                title: {
                    text: 'Sviluppo Tecnologico Europeo'
                },
                subtitle: {
                    text: 'Indicatori di Digitalizzazione secondo il "Digital Single Market Eu"'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Popolazione (percentuale)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Populazione: <b>{point.y:.1f} %</b>'
                },
                series: [{
                    name: 'Nazioni',
                    data: result
                }]
            });
})
}

/*Funzione che crea il grafico relativo alla diffusione della fibra in europa */
function fibra_europa () {  
    $.getJSON("api/fibraEu.php", 
        function(result) {
            Highcharts.chart('fibraEu', {
                chart: {
                    type: 'column',
                    backgroundColor: null
                },
                title: {
                    text: 'Diffusione della connessione a Banda Ultra-Larga in Europa'
                },
                subtitle: {
                    text: 'secondo il "Digital Single Market Eu"'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Popolazione (percentuale)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Populazione: <b>{point.y:.1f} percento</b>'
                },
                series: [{
                    name: 'Nazioni',
                    data: result
                }]
            });
        })
    }

/*************************SEZIONE ITALIA ***************************/

/*Funzione per la cartina italiana relativa all'utilizzo di internet in italia*/
function drawRegionMap() {
    var tipoDato = $("input[name=radioGeoIta]:checked").val();
    $.getJSON("api/geoRegionIta.php?Tipologia=" + tipoDato, function(list) {
          var data = google.visualization.arrayToDataTable(list);
          var options = {
              region: "IT",
              displayMode: "regions",
              resolution: "provinces",
              datalessRegionColor:'none',
              colorAxis: {colors: ["#FAEBD7","#6495ED"]},
              backgroundColor: "none"
          }
          var chart = new google.visualization.GeoChart(document.getElementById("geoIta"));
          chart.draw(data, options);
      });
  }

/* Funzione che crea il grafico del livello di diffusione di banda in Italia*/
function internet_banda () {  
    var tipologia = $("input[name=radioBanda]:checked").val();
    $("#tabLine").empty();
    $.getJSON("api/bandainternet.php?Tipologia=" + tipologia, 
        function(result) {
            Highcharts.chart('conBanda', {
                chart: {
                    type: 'column',
                    backgroundColor: null
                },
                title: {
                    text: 'Connessione Banda Larga'
                },
                subtitle: {
                    text: "dati Istat 2016"
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Percentuale'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'connessi nel 2016: <b>{point.y:.1f}%</b>'
                },
                series: [{
                    name: "Connessi",
                    data: result
                }, {
                }]
            });
        })
}

/* Funzione che crea il grafico relativo al diverso utilizzo di internet in Italia*/
function crea_grafico_colonne2(){
    $("#utilizzo").empty();
    $.getJSON("api/internetItaUso.php", function(result){
        Highcharts.chart('utilizzo', {
            chart: {
              type: 'bar',
              backgroundColor: null
            },
            title: {
              text: 'Utilizzo di Internet in Italia'
            },
            subtitle: {
                text: 'Dati ISTAT 2016'
            },
            xAxis: {
              categories: [ 
                            "Tipologie"
                        ],
              title: {
                text: null
              }
            },
            yAxis: {
              min: 0,
              title: {
                text: 'Valori',
                align: 'high'
              },
              labels: {
                overflow: 'justify'
              }
            },
            
            plotOptions: {
              bar: {
                dataLabels: {
                  enabled: true
                }
              }
            },
            credits: {
              enabled: false
            },
            series: [{
                name: result[0].Tipologia,
                data: [result[0].Valore],
                color: "#66CDAA"
            },{
                name: result[1].Tipologia,
                data: [result[1].Valore],
                color: "#7B68EE"
            },{
                name: result[2].Tipologia,
                data: [result[2].Valore],
                color: "#668B8B"
            },{
                name: result[3].Tipologia,
                data: [result[3].Valore],
                color: "#76EEC6"
            },{
                name: result[4].Tipologia,
                data: [result[4].Valore],
                color: "#FFC1C1"
            },{
                name: result[5].Tipologia,
                data: [result[5].Valore],
                color: "#9FB6CD"
            },{
                name: result[6].Tipologia,
                data: [result[6].Valore],
                color: "#2E8B57"
            },{
                name: result[7].Tipologia,
                data: [result[7].Valore],
                color: "#EE82EE"
            },{
                name: result[8].Tipologia,
                data: [result[8].Valore],
                color: "#F08080"
            },{
                name: result[9].Tipologia,
                data: [result[9].Valore],
                color: "#B452CD"
            },{
                name: result[10].Tipologia,
                data: [result[10].Valore],
                color: "#A3A3A3"
            },{
                name: result[11].Tipologia,
                data: [result[11].Valore],
                color: "#00FA9A"
            },{
                name: result[12].Tipologia,
                data: [result[12].Valore],
                color: "#9400D3"
            },{
                name: result[13].Tipologia,
                data: [result[13].Valore],
                color: "#FFDEAD"
            }
        ]
          });
    });
    
}

/*Funzione per la cartina italiana relativa alla diffuzione di vendite online in italia*/
function drawRegionVendite() {
    $.getJSON("api/geoVenditeRegionIta.php", function(list) {
          var data = google.visualization.arrayToDataTable(list);
          var options = {
              region: "IT",
              displayMode: "regions",
              resolution: "provinces",
              datalessRegionColor:'none',
              colorAxis: {colors: ["#FAEBD7","#6495ED"]},
              backgroundColor: "none"
          }
          var chart = new google.visualization.GeoChart(document.getElementById("venditeIta"));
          chart.draw(data, options);
      });
  }

/**************************SEZIONE GIOVANI *************************/

/* Funzione che crea il grafico relativo alla crescita di utilizzo di internet da parte dei giovani italiani */
function crea_grafico_line() {
    $("#tabLine").empty();
    $.getJSON("api/usoInternet.php", 
    function(result) {
          Highcharts.chart("tabLine", {
              chart: {
                  type: "line",
                  backgroundColor: null
              },
              title: {
                  text: "Crescita dell'uso di Internet per fascia di età"
              },
              subtitle: {
                  text: "Situazione italiana"
              },
              yAxis: {
                  title: {
                  text: "Valore in percentuale"
                  }
              },
              xAxis: {
                  categories: ["2014", "2015", "2016"],
              },
              plotOptions: {
                  line: {
                      dataLabels: {
                          enabled: true
                      },
                      enableMouseTracking: false
                  }
              },
              series: [{   
                  name: result[0].Fascia, //15-17
                  data: [result[0].Valore, result[1].Valore, result[2].Valore],
                  color: "#6495ED"
                  },{   
                  name: result[9].Fascia, //18-19
                  data: [result[9].Valore, result[10].Valore, result[11].Valore],
                  color: "#808080"
                  },{
                  name: result[6].Fascia, //20-24
                  data: [result[6].Valore, result[7].Valore, result[8].Valore],
                  color: "#DB7093"
                  },{
                  name: result[3].Fascia, //25-34
                  data: [result[3].Valore, result[4].Valore, result[5].Valore],
                  color: "#3CB371"
                  }
              ],
          });
      });
  }

/* Funzione che crea il grafico relativo all'utilizzo di internet da pate dei giovani italiani*/
function crea_grafico_colonne () {
    $("#classe").empty();
    
    var tipoAnno = $("input[name=radioAnno]:checked").val();
    $.getJSON("api/internetItaClasse.php?Anno="+tipoAnno, function(result){
        Highcharts.chart("classe", {
            chart: {
                type: "column",
                backgroundColor: null
            },
            title: {
                text: "Uso di Internet tra i Giovani"
            },
            subtitle: {
                text: "in Italia"
            },
            xAxis: {
                categories: [
                    "non usano Internet",
                    "qualche volta all' anno",
                    "qualche volta al mese",
                    "una o più volte a settimana",
                    "tutti i giorni",
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Percentuale"
                }
            },
            tooltip: {
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
				name: result[0].name, //15-17
                data: [result[2].Valore, result[3].Valore, result[4].Valore, result[1].Valore, result[0].Valore],
                color: "#6495ED"
			    },{
				name: result[5].name, //18-19
                data: [result[9].Valore, result[5].Valore, result[7].Valore, result[8].Valore, result[6].Valore],
                color: "#808080"
                },{
                name: result[10].name, //20-24
                data: [result[10].Valore, result[12].Valore, result[14].Valore, result[11].Valore, result[13].Valore],
                color: "#DB7093"
                },{
                name: result[15].name, //25-34
                data: [result[16].Valore, result[18].Valore, result[15].Valore, result[17].Valore, result[19].Valore],
                color: "#3CB371"
                }
            ]
        });
    });
}



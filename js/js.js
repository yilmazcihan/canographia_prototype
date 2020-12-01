var lyon = L.layerGroup();
var colleges = L.layerGroup();
var planeau = L.layerGroup();
var zfe = L.layerGroup();
var espaceboise = L.layerGroup();
var cada = L.layerGroup();
var trott = L.layerGroup();
var lieuxsurfa = L.layerGroup();
var jardinscoll = L.layerGroup();
var pluvio = L.layerGroup();




var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

var collectivite  = L.tileLayer();

var map = L.map('map', {
	center: [45.770617010400656, 4.828867547445176],
	zoom: 15,
	layers: [grayscale, streets]
});

var baseLayers = {

	"Niveaux de gris": grayscale,
	"Street View": streets,

};

var overlays = {
	"Arbres d'alignement": lyon,
	"Collèges Henri Barbusse & Ampère":colleges,
	"Zones à faible emissions":zfe,
	"Plans d'eaux de la métropole":planeau,
	"Espaces boisé":espaceboise,
	"Batiments & cadastres":cada,
	"Trottoirs & Chaussées":trott,
	"Lieux surfaciques":lieuxsurfa,
	"Pluviométrie":pluvio,
};

var collectivite = {
	"Jardins collectifs":jardinscoll,
};

L.control.layers(baseLayers,overlays,{collapsed:false}).addTo(map);


var arbresalign = $.ajax({
	url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=abr_arbres_alignement.abrarbre&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4171&startIndex=0&count=100',
	dataType: 'json',
	success: function(data){
		L.geoJSON(arbresalign.responseJSON).addTo(lyon)
	}
})
var faibleemiss = $.ajax({
	url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=eco_ecologie.ecoperimetrezfe_1_0_0&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4171&startIndex=0',
	dataType: 'json',
	success: function(data){
		L.geoJSON(faibleemiss.responseJSON).addTo(zfe)
	}
})
var amperebarbusse = $.ajax({
	url: 'https://api.maptiler.com/data/18dc9770-0c56-4100-8c6d-eda7ece30c16/features.json?key=8zuKqFboKoQI76NqZ7Rm',
	dataType: 'json',
	success: function(data){
		L.geoJSON(amperebarbusse.responseJSON).addTo(colleges)
	}
})

var plandeau = $.ajax({
	url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=adr_voie_lieu.adrlieulin&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4171&startIndex=0&count=500',
	dataType: 'json',
	success: function(data){
		L.geoJSON(plandeau.responseJSON).addTo(planeau)
	}
})

var espacebois = $.ajax({
	url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=pos_opposable.posboise&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4171&startIndex=0&count=800',
	dataType: 'json',
	success: function(data){
		L.geoJSON(espacebois.responseJSON).addTo(espaceboise)
	}
})

var cadastre = $.ajax({
	url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=cad_cadastre.cadbatiment&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4171&startIndex=0&count=700',
	dataType: 'json',
	success: function(data){
		L.geoJSON(cadastre.responseJSON).addTo(cada)
	}
})

var trottoir = $.ajax({
	url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=pvo_patrimoine_voirie.pvochausseetrottoir&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4171&startIndex=0&count=900',
	dataType: 'json',
	success: function(data){
		L.geoJSON(trottoir.responseJSON).addTo(trott)
	}
})

var lieuxsurfaciques = $.ajax({
	url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=adr_voie_lieu.adrlieusurf&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4171&startIndex=0&count=100',
	dataType: 'json',
	success: function(data){
		L.geoJSON(lieuxsurfaciques.responseJSON).addTo(lieuxsurfa)
	}
})

var jardinscollectifs = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.895439,
						45.752869
					],
					[
						4.895707,
						45.752539
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.889254,
						45.753604
					],
					[
						4.889275,
						45.753571
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "6",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.890933,
						45.74705
					],
					[
						4.891673,
						45.747204
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"weight": "5"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.866804,
						45.750228
					],
					[
						4.8666,
						45.750288
					],
					[
						4.866444,
						45.749918
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "6",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.848527,
						45.756251
					],
					[
						4.848549,
						45.756082
					],
					[
						4.848774,
						45.756094
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "5",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.847159,
						45.752283
					],
					[
						4.84724,
						45.752425
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "4",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.844037,
						45.752096
					],
					[
						4.843887,
						45.751984
					],
					[
						4.844198,
						45.751797
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"weight": "6"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.838979,
						45.751785
					],
					[
						4.838871,
						45.751617
					],
					[
						4.838796,
						45.751651
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"weight": "6"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.838941,
						45.752964
					],
					[
						4.838979,
						45.752949
					],
					[
						4.839091,
						45.753125
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"weight": "6"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.847057,
						45.74997
					],
					[
						4.847127,
						45.75003
					],
					[
						4.847701,
						45.749667
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "6",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.845196,
						45.74915
					],
					[
						4.845695,
						45.749158
					],
					[
						4.84569,
						45.749191
					],
					[
						4.845126,
						45.749184
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"weight": "7"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.849096,
						45.748753
					],
					[
						4.849343,
						45.748735
					],
					[
						4.849235,
						45.748443
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"weight": "6"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.867233,
						45.756528
					],
					[
						4.866949,
						45.755255
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"weight": "6"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.882575,
						45.749569
					],
					[
						4.882688,
						45.749839
					],
					[
						4.883203,
						45.74973
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "5",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.89486,
						45.751864
					],
					[
						4.894956,
						45.751718
					],
					[
						4.895166,
						45.751785
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "4",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.888288,
						45.741337
					],
					[
						4.88831,
						45.741139
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "5",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.888492,
						45.74036
					],
					[
						4.888455,
						45.740671
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "DarkSlateGrey",
					"iconClass": "Circle"
				}
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					4.855694,
					45.76594
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "DarkSlateGrey",
					"iconClass": "Circle"
				}
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					4.855984,
					45.765989
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "DarkSlateGrey",
					"iconClass": "Circle"
				}
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					4.855877,
					45.766079
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "DarkSlateGrey",
					"iconClass": "Circle"
				}
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					4.856869,
					45.766266
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.889442,
						45.753735
					],
					[
						4.889479,
						45.753881
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.852577,
						45.744808
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "6",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.890107,
						45.750741
					],
					[
						4.890364,
						45.750224
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "6",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.890112,
						45.750891
					],
					[
						4.89044,
						45.750228
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "6",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.891491,
						45.751134
					],
					[
						4.891598,
						45.75095
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "4",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.895514,
						45.751052
					],
					[
						4.895611,
						45.750913
					],
					[
						4.895799,
						45.750977
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "5",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.892548,
						45.751647
					],
					[
						4.892671,
						45.751437
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "5",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.890922,
						45.750977
					],
					[
						4.891089,
						45.750674
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "6",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.890788,
						45.751123
					],
					[
						4.89103,
						45.750629
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "5",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.89082,
						45.747743
					],
					[
						4.89199,
						45.748087
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.845309,
						45.753275
					],
					[
						4.845421,
						45.753361
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.844874,
						45.755461
					],
					[
						4.844837,
						45.75554
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.844504,
						45.755701
					],
					[
						4.844606,
						45.75573
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.844638,
						45.755715
					],
					[
						4.844751,
						45.755513
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.873123,
						45.748858
					],
					[
						4.873107,
						45.748802
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.873193,
						45.749019
					],
					[
						4.873145,
						45.748911
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.873166,
						45.749158
					],
					[
						4.873123,
						45.749075
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.845443,
						45.75338
					],
					[
						4.845647,
						45.753552
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.862845,
						45.762591
					],
					[
						4.862861,
						45.762157
					],
					[
						4.862786,
						45.762089
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.842052,
						45.750464
					],
					[
						4.841945,
						45.75037
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.842015,
						45.750505
					],
					[
						4.841859,
						45.750367
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.826211,
						45.736294
					],
					[
						4.82648,
						45.736186
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_storage_options": {
					"color": "Green",
					"opacity": "0.8",
					"weight": "4"
				},
				"_umap_options": {
					"color": "Green",
					"opacity": "0.8",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "MultiLineString",
				"coordinates": [
					[
						[
							4.856102,
							45.765117
						],
						[
							4.857008,
							45.765162
						]
					],
					[
						[
							4.856091,
							45.765162
						],
						[
							4.856992,
							45.765207
						]
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_storage_options": {
					"color": "DarkGreen",
					"opacity": "0.7",
					"weight": "4"
				},
				"_umap_options": {
					"color": "DarkGreen",
					"opacity": "0.7",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.851971,
						45.738058
					],
					[
						4.852009,
						45.738136
					],
					[
						4.851982,
						45.738237
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_storage_options": {
					"color": "DarkGreen",
					"opacity": "0.7",
					"weight": "4"
				},
				"_umap_options": {
					"color": "DarkGreen",
					"opacity": "0.7",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.852411,
						45.738477
					],
					[
						4.853119,
						45.73799
					],
					[
						4.853109,
						45.737904
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_storage_options": {
					"color": "DarkGreen",
					"opacity": "0.7",
					"weight": "4"
				},
				"_umap_options": {
					"color": "DarkGreen",
					"opacity": "0.7",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.853184,
						45.737915
					],
					[
						4.853178,
						45.73796
					],
					[
						4.853393,
						45.737803
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_storage_options": {
					"color": "DarkGreen",
					"opacity": "0.8",
					"weight": "4"
				},
				"_umap_options": {
					"color": "DarkGreen",
					"opacity": "0.8",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.853184,
						45.73516
					],
					[
						4.853205,
						45.734943
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.864865,
						45.74246
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "5",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.83532,
						45.774322
					],
					[
						4.834864,
						45.773828
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "5",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.835256,
						45.774352
					],
					[
						4.8348,
						45.773858
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "6",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.849139,
						45.756195
					],
					[
						4.849144,
						45.756079
					],
					[
						4.84937,
						45.756082
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "5"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.849021,
						45.752418
					],
					[
						4.848951,
						45.75241
					],
					[
						4.848876,
						45.752403
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "4"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.868435,
						45.756666
					],
					[
						4.86859,
						45.756647
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "ForestGreen",
					"opacity": "1",
					"weight": "5"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.868526,
						45.756588
					],
					[
						4.868402,
						45.756603
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.895434,
						45.748768
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "7",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.889361,
						45.75043
					],
					[
						4.88956,
						45.75009
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "6",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.889608,
						45.75015
					],
					[
						4.889474,
						45.750419
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "6",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.887859,
						45.750172
					],
					[
						4.888074,
						45.74985
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"weight": "5",
					"opacity": "1"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.888047,
						45.74985
					],
					[
						4.887854,
						45.749798
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"weight": "6"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.835063,
						45.775579
					],
					[
						4.835197,
						45.775572
					],
					[
						4.835481,
						45.775186
					],
					[
						4.835792,
						45.774917
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"weight": "6"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.81184,
						45.756187
					],
					[
						4.810499,
						45.756378
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Teal",
					"weight": "6"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.883927,
						45.723776
					],
					[
						4.884281,
						45.723469
					],
					[
						4.884506,
						45.723166
					],
					[
						4.884641,
						45.723244
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"iconClass": "Circle",
					"color": "Gold"
				}
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					4.848731,
					45.743168
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"iconClass": "Circle"
				}
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					4.848812,
					45.743138
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"iconClass": "Circle"
				}
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					4.848645,
					45.743183
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"iconClass": "Circle"
				}
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					4.848897,
					45.743112
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"iconClass": "Circle"
				}
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					4.848559,
					45.743205
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Gold",
					"weight": "6"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.837165,
						45.772417
					],
					[
						4.837654,
						45.77241
					],
					[
						4.837841,
						45.772361
					],
					[
						4.837933,
						45.772245
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "Green",
					"opacity": "1",
					"weight": "5"
				}
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						4.891735,
						45.750873
					],
					[
						4.891804,
						45.750784
					]
				]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"_umap_options": {
					"color": "DarkSlateGray",
					"iconUrl": "/uploads/pictogram/park2-24_1.png",
					"showLabel": null,
					"labelDirection": "top",
					"labelInteractive": true
				},
				"name": "Fleurissement pied d'arbre",
				"description": "{{https://framapic.org/QS0t9GkQan2m/Bw6kJEqFsbPE.jpg}}\n{{https://framapic.org/Oybw3pwyOLPQ/ifBhopLgoZoq.jpg}}\n{{https://framapic.org/URVJDoJ0OpkQ/dxGdotpEevuU.jpg}}\n{{https://framapic.org/syvnW8PFocFn/H5dLtPeyh09Q.jpg}}\n"
				},
				"geometry": {
					"type": "Point",
					"coordinates": [
						4.874695,
						45.749416
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"_storage_options": {
						"color": "DarkCyan",
						"iconUrl": "/uploads/pictogram/garden-24_1.png",
						"showLabel": true,
						"labelHover": true,
						"labelInteractive": true
					},
					"name": "Fleurissement pied d'arbre",
					"description": "Projet réalisé  par le Conseil de Quartier Brotteaux - place Déroudille\n{{https://wtf.roflcopter.fr/pics/SQrhZ6VS/Uj2jm8rL.jpg}}",
						"_umap_options": {
							"color": "DarkSlateGray",
							"iconUrl": "/uploads/pictogram/park2-24_1.png",
							"showLabel": null,
							"labelHover": true,
							"labelInteractive": true,
							"labelDirection": "top"
						}
					},
					"geometry": {
						"type": "Point",
						"coordinates": [
							4.855732,
							45.766026
						]
					}
				},
				{
					"type": "Feature",
					"properties": {
						"_umap_options": {
							"color": "DarkSlateGray",
							"iconUrl": "/uploads/pictogram/park2-24_1.png",
							"showLabel": null,
							"labelDirection": "top",
							"labelInteractive": true
						},
						"name": "Fleurissement pied d'arbre",
						"description": "{{https://wtf.roflcopter.fr/pics/JjHRb86u/dhT3cbnD.jpg}}\n{{https://wtf.roflcopter.fr/pics/ghucqznh/mgCpGOaM.jpg}}"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [
								4.873273,
								45.749012
							]
						}
					},
					{
						"type": "Feature",
						"properties": {
							"_storage_options": {
								"color": "DarkCyan",
								"iconUrl": "/uploads/pictogram/garden-24_1.png"
							},
							"name": "Fleurissement pied d'arbre",
							"description": "Plantations réalisées par les enfants du collège Clément Marot lors de l'événement la rue aux enfants. La gestion est effectuée par l'association la Cour des Gônes. \n{{https://wtf.roflcopter.fr/pics/DfxlXoDf/WOnOxrJ5.jpg}}",
								"_umap_options": {
									"color": "DarkSlateGray",
									"iconUrl": "/uploads/pictogram/park2-24_1.png",
									"showLabel": null,
									"labelDirection": "top",
									"labelInteractive": true
								}
							},
							"geometry": {
								"type": "Point",
								"coordinates": [
									4.819844,
									45.778194
								]
							}
						},
						{
							"type": "Feature",
							"properties": {
								"_umap_options": {
									"color": "DarkSlateGray",
									"iconUrl": "/uploads/pictogram/park2-24_1.png",
									"showLabel": null,
									"labelDirection": "top",
									"labelInteractive": true
								},
								"name": "Fleurissement pied d'arbre",
								"description": "{{https://wtf.roflcopter.fr/pics/NrXbl3pg/AFGF4Hvq.jpg}}"
								},
								"geometry": {
									"type": "Point",
									"coordinates": [
										4.845051,
										45.750861
									]
								}
							},
							{
								"type": "Feature",
								"properties": {
									"_storage_options": {
										"color": "Teal",
										"iconUrl": "/uploads/pictogram/garden-24_1.png",
										"showLabel": true,
										"labelHover": true,
										"labelInteractive": true
									},
									"name": "Fleurissement pied d'arbre",
									"description": "Pieds d'arbres fleuris Allée André Mure. Projet réalisé par les habitants du quartier et la MJC Confluence\n{{https://wtf.roflcopter.fr/pics/cTmu4Npm/XUtpa6Uy.JPG}}\n{{https://wtf.roflcopter.fr/pics/G35MiiyM/2TfOVC9E.JPG}}",
										"_umap_options": {
											"color": "DarkSlateGray",
											"iconUrl": "/uploads/pictogram/park2-24_1.png",
											"showLabel": null,
											"labelHover": true,
											"labelInteractive": true,
											"labelDirection": "top"
										}
									},
									"geometry": {
										"type": "Point",
										"coordinates": [
											4.815842,
											45.743494
										]
									}
								},
								{
									"type": "Feature",
									"properties": {
										"_umap_options": {
											"color": "DarkSlateGray",
											"iconClass": "Default",
											"iconUrl": "/uploads/pictogram/park2-24_1.png",
											"showLabel": null,
											"labelDirection": "top",
											"labelInteractive": true
										},
										"name": "Fleurissement pied d'arbre",
										"description": "Installation d'une prairie fleurie au pied de 4 arbres \n{{https://wtf.roflcopter.fr/pics/LXCsWXyn/yzBJUD5k.PNG}}"
										},
										"geometry": {
											"type": "Point",
											"coordinates": [
												4.831796,
												45.774513
											]
										}
									},
									{
										"type": "Feature",
										"properties": {
											"_umap_options": {
												"color": "DarkSlateGray",
												"iconUrl": "/uploads/pictogram/park2-24_1.png",
												"showLabel": null,
												"labelInteractive": true,
												"labelDirection": "top"
											},
											"name": "Fleurissement pied d'arbre",
											"description": "Projet mené par l'association Ostara \n\n"
										},
										"geometry": {
											"type": "Point",
											"coordinates": [
												4.804807,
												45.773734
											]
										}
									},
									{
										"type": "Feature",
										"properties": {
											"_umap_options": {
												"iconClass": "Circle",
												"color": "DarkSlateGrey"
											},
											"name": "Fleurissement pied d'arbre"
										},
										"geometry": {
											"type": "Point",
											"coordinates": [
												4.868354,
												45.754705
											]
										}
									},
									{
										"type": "Feature",
										"properties": {
											"_umap_options": {
												"color": "DarkSlateGray",
												"iconClass": "Circle"
											},
											"name": "Fleurissement pied d'arbre"
										},
										"geometry": {
											"type": "Point",
											"coordinates": [
												4.868199,
												45.754686
											]
										}
									},
									{
										"type": "Feature",
										"properties": {
											"_umap_options": {
												"iconUrl": "/uploads/pictogram/park2-24_1.png",
												"showLabel": null,
												"labelDirection": "top",
												"labelInteractive": true,
												"color": "DarkSlateGray"
											},
											"name": "Fleurissement pied d'arbre",
											"description": "Projet réalisé par le Conseil de Quartier Brotteaux \n{{https://framapic.org/0KbLsg9Ygvmw/EERgxp5Tjr1q.JPG}}\n{{https://framapic.org/nBrYl6kCrCPX/6BxIHGJBFiza.JPG}}\n{{https://framapic.org/PawLuNkvLQVd/FMQXyU0jsGwa.JPG}}\n{{https://framapic.org/1Li3WDAr9Jbt/QzuQPYR3DtTh.JPG}}\n\n\n"
											},
											"geometry": {
												"type": "Point",
												"coordinates": [
													4.856853,
													45.766314
												]
											}
										},
										{
											"type": "Feature",
											"properties": {
												"_umap_options": {
													"color": "DarkSlateGray",
													"showLabel": null,
													"iconUrl": "/uploads/pictogram/park2-24_1.png",
													"iconClass": "Circle"
												},
												"name": "Fleurissement pied d'arbre",
												"description": "{{https://framapic.org/rA5mnx2jYzRB/BRayOLtekFUl.jpg}}"
												},
												"geometry": {
													"type": "Point",
													"coordinates": [
														4.86918,
														45.754806
													]
												}
											},
											{
												"type": "Feature",
												"properties": {
													"_umap_options": {
														"color": "DarkSlateGray",
														"iconUrl": "/uploads/pictogram/park2-24_1.png",
														"showLabel": null,
														"labelDirection": "top",
														"labelInteractive": true
													},
													"name": "Fleurissement pied d'arbre",
													"description": "{{https://framapic.org/TGtlg8ix6Mbm/iYjzSvLXamYr.jpg}}"
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.884539,
															45.770576
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "DarkSlateGrey",
															"iconUrl": "/uploads/pictogram/park2-24_1.png"
														},
														"name": "Fleurissement pied d'arbre",
														"description": "141 cours du Dr Long  _ projet soutenu par le collectif Montchat Nature "
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.891164,
															45.751782
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "DarkSlateGrey",
															"iconUrl": "/uploads/pictogram/park2-24_1.png"
														},
														"name": "Fleurissement pied d'arbre"
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.862674,
															45.74524
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "DarkSlateGrey",
															"iconUrl": "/uploads/pictogram/park2-24_1.png"
														},
														"name": "Fleurissement pied d'arbre"
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.838566,
															45.732823
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "DarkSlateGrey",
															"iconUrl": "/uploads/pictogram/park2-24_1.png"
														},
														"name": "Fleurissement pied d'arbre",
														"description": "38 rue Denuzière"
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.81957,
															45.744755
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"iconClass": "Circle",
															"color": "DarkSlateGray"
														},
														"name": "Fleurissement pied d'arbre "
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.868177,
															45.75478
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "DarkSlateGray",
															"iconClass": "Circle"
														},
														"name": "Fleurissement pied d'arbre "
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.868698,
															45.754746
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "DarkSlateGray",
															"iconClass": "Circle"
														},
														"name": "Fleurissement pied d'arbre "
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.868993,
															45.754784
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "DarkSlateGray",
															"iconClass": "Circle"
														},
														"name": "Fleurissement pied d'arbre "
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.868381,
															45.754802
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "DarkSlateGray",
															"iconClass": "Circle"
														},
														"name": "Fleurissement pied d'arbre "
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.868665,
															45.75484
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "Gold",
															"iconClass": "Circle"
														},
														"name": "Fleurissement pied d'arbre en cours"
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.846441,
															45.743894
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "Gold",
															"iconClass": "Circle"
														},
														"name": "Fleurissement pied d'arbre en cours"
													},
													"geometry": {
														"type": "Point",
														"coordinates": [
															4.846349,
															45.743917
														]
													}
												},
												{
													"type": "Feature",
													"properties": {
														"_umap_options": {
															"color": "DarkSlateGrey",
															"showLabel": null,
															"labelDirection": "top",
															"labelInteractive": true,
															"iconUrl": "/uploads/pictogram/park2-24_1.png"
														},
														"name": "Fleurissement pied d’arbre ",
														"description": "{{https://wtf.roflcopter.fr/pics/jkhmZ7cK/P1n0rKgV.jpg}}\n"
														},
														"geometry": {
															"type": "Point",
															"coordinates": [
																4.846317,
																45.752938
															]
														}
													},
													{
														"type": "Feature",
														"properties": {
															"_umap_options": {
																"iconUrl": "/uploads/pictogram/park2-24_1.png",
																"showLabel": null,
																"labelDirection": "top",
																"labelInteractive": true,
																"color": "DarkSlateGray"
															},
															"name": "Fleurissement pied d’arbre ",
															"description": "{{https://wtf.roflcopter.fr/pics/eN7Urkad/UZKuHZVx.jpg}}"
															},
															"geometry": {
																"type": "Point",
																"coordinates": [
																	4.843179,
																	45.753597
																]
															}
														},
														{
															"type": "Feature",
															"properties": {
																"name": "Fleurissement pied d’arbre ",
																"description": "{{https://wtf.roflcopter.fr/pics/8bFQ70qo/YO3ENPq9.jpeg}}\n{{https://wtf.roflcopter.fr/pics/R2Sy8miS/oHAdWdOY.jpeg}}\n",
																	"_umap_options": {
																		"color": "DarkSlateGray",
																		"iconUrl": "/uploads/pictogram/park2-24_1.png"
																	}
																},
																"geometry": {
																	"type": "Point",
																	"coordinates": [
																		4.852417,
																		45.737489
																	]
																}
															},
															{
																"type": "Feature",
																"properties": {
																	"_storage_options": {
																		"iconUrl": "/uploads/pictogram/garden-24_1.png",
																		"color": "Teal",
																		"showLabel": true,
																		"labelHover": true,
																		"labelInteractive": true
																	},
																	"description": "Mon jardin de rue Monplaisir. \nFleurissement en pieds d'arbres. Projet réalisé par le conseil de Quartier Monplaisir\n{{https://wtf.roflcopter.fr/pics/BixY5vvp/b2l4bZX1.JPG}}",
																		"_umap_options": {
																			"iconUrl": "/uploads/pictogram/park2-24_1.png",
																			"color": "DarkSlateGrey",
																			"showLabel": null,
																			"labelHover": true,
																			"labelInteractive": true,
																			"labelDirection": "top"
																		},
																		"name": "Fleurissement pied d’arbre "
																	},
																	"geometry": {
																		"type": "Point",
																		"coordinates": [
																			4.857985,
																			45.740349
																		]
																	}
																},
																{
																	"type": "Feature",
																	"properties": {
																		"_umap_options": {
																			"color": "DarkSlateGray",
																			"iconUrl": "/uploads/pictogram/park2-24_1.png"
																		},
																		"name": "Fleurissement pied d’arbre ",
																		"description": "{{https://wtf.roflcopter.fr/pics/41MFTQrZ/LcXBulZi.jpg}}"
																		},
																		"geometry": {
																			"type": "Point",
																			"coordinates": [
																				4.845915,
																				45.752193
																			]
																		}
																	},
																	{
																		"type": "Feature",
																		"properties": {
																			"_umap_options": {
																				"color": "DarkSlateGray",
																				"iconUrl": "/uploads/pictogram/park2-24_1.png"
																			},
																			"name": "Fleurissement pied d’arbre ",
																			"description": "{{https://wtf.roflcopter.fr/pics/rpjFL4uk/V4udJVDl.jpg}}\n"
																			},
																			"geometry": {
																				"type": "Point",
																				"coordinates": [
																					4.836001,
																					45.776956
																				]
																			}
																		},
																		{
																			"type": "Feature",
																			"properties": {
																				"_umap_options": {
																					"color": "DarkSlateGray",
																					"iconUrl": "/uploads/pictogram/park2-24_1.png"
																				},
																				"name": "Fleurissement pied d’arbre ",
																				"description": "{{https://wtf.roflcopter.fr/pics/yDonFUdu/Zuv9Nju8.JPG}}\n{{https://wtf.roflcopter.fr/pics/HDGJEBhO/KcTcjWAK.JPG}}"
																				},
																				"geometry": {
																					"type": "Point",
																					"coordinates": [
																						4.869308,
																						45.748719
																					]
																				}
																			},
																			{
																				"type": "Feature",
																				"properties": {
																					"_umap_options": {
																						"color": "DarkSlateGrey",
																						"iconUrl": "/uploads/pictogram/park2-24_1.png"
																					},
																					"name": "Fleurissement pied d’arbre ",
																					"description": "{{https://wtf.roflcopter.fr/pics/mblAUbxt/nh6TF4UE.jpg}}"
																					},
																					"geometry": {
																						"type": "Point",
																						"coordinates": [
																							4.869561,
																							45.754798
																						]
																					}
																				},
																				{
																					"type": "Feature",
																					"properties": {
																						"_umap_options": {
																							"color": "DarkSlateGray",
																							"iconClass": "Circle"
																						},
																						"name": "Fleurissement pied d’arbre "
																					},
																					"geometry": {
																						"type": "Point",
																						"coordinates": [
																							4.86938,
																							45.748691
																						]
																					}
																				},
																				{
																					"type": "Feature",
																					"properties": {
																						"_umap_options": {
																							"color": "DarkSlateGray",
																							"iconClass": "Circle"
																						},
																						"name": "Fleurissement pied d’arbre "
																					},
																					"geometry": {
																						"type": "Point",
																						"coordinates": [
																							4.86947,
																							45.748672
																						]
																					}
																				},
																				{
																					"type": "Feature",
																					"properties": {
																						"_umap_options": {
																							"color": "DarkSlateGray",
																							"iconUrl": "/uploads/pictogram/park2-24_1.png"
																						},
																						"name": "Fleurissement pied d’arbre ",
																						"description": "{{https://wtf.roflcopter.fr/pics/6ZfGdqSf/4ZmmbZtZ.jpg}}\n"
																						},
																						"geometry": {
																							"type": "Point",
																							"coordinates": [
																								4.857207,
																								45.770075
																							]
																						}
																					},
																					{
																						"type": "Feature",
																						"properties": {
																							"_umap_options": {
																								"color": "DarkSlateGray",
																								"iconClass": "Circle",
																								"iconUrl": "/uploads/pictogram/park2-24_1.png"
																							},
																							"name": "Fleurissement pied d’arbre "
																						},
																						"geometry": {
																							"type": "Point",
																							"coordinates": [
																								4.869203,
																								45.748736
																							]
																						}
																					},
																					{
																						"type": "Feature",
																						"properties": {
																							"name": "Micro-implantations florales",
																							"description": "Rue saint Amour et Carrefour André Philippe\n{{https://photos.google.com/album/AF1QipMEA9CtrUPFGyFRxvIXSJZCIqOnZcBme1J1nqdD/photo/AF1QipNi09hg319PpYVIWcAkR-A_kxCvBjekWQr3qhNe}}",
																								"_storage_options": {
																									"color": "Green",
																									"weight": "4",
																									"popupTemplate": "Default",
																									"showLabel": true,
																									"labelHover": true,
																									"labelInteractive": true,
																									"opacity": "0.7"
																								},
																								"_umap_options": {
																									"color": "Green",
																									"weight": "4",
																									"popupTemplate": "Default",
																									"showLabel": true,
																									"labelHover": true,
																									"labelInteractive": true,
																									"opacity": "0.7"
																								}
																							},
																							"geometry": {
																								"type": "LineString",
																								"coordinates": [
																									[
																										4.850657,
																										45.754724
																									],
																									[
																										4.851172,
																										45.756049
																									],
																									[
																										4.851408,
																										45.756064
																									]
																								]
																							}
																						},
																						{
																							"type": "Feature",
																							"properties": {
																								"name": "Micro-implantations florales",
																								"description": "Rue Bechevelin \n{{https://framapic.org/qT1t3CXoHWlp/rK9nk8ZBkBf3?dl}}",
																									"_storage_options": {
																										"color": "Green",
																										"opacity": "0.8",
																										"weight": "4",
																										"popupTemplate": "Default",
																										"showLabel": true,
																										"labelHover": true,
																										"labelInteractive": true
																									},
																									"_umap_options": {
																										"color": "Green",
																										"opacity": "0.8",
																										"weight": "4",
																										"popupTemplate": "Default",
																										"showLabel": true,
																										"labelHover": true,
																										"labelInteractive": true
																									}
																								},
																								"geometry": {
																									"type": "LineString",
																									"coordinates": [
																										[
																											4.842457,
																											45.754001
																										],
																										[
																											4.842471,
																											45.753939
																										],
																										[
																											4.842484,
																											45.753883
																										],
																										[
																											4.842567,
																											45.753923
																										]
																									]
																								}
																							},
																							{
																								"type": "Feature",
																								"properties": {
																									"_storage_options": {
																										"color": "Green",
																										"iconUrl": "/uploads/pictogram/garden-24_1.png",
																										"showLabel": true,
																										"labelHover": true,
																										"labelInteractive": true
																									},
																									"name": "Micro-implantations florales",
																									"description": "Les Petits brins zurbains\n{{https://wtf.roflcopter.fr/pics/U5lwuRPG/q31M3N1L.JPG}}\n{{https://wtf.roflcopter.fr/pics/9DaQbnYi/SKslfZcy.JPG}}\n{{https://wtf.roflcopter.fr/pics/wiJJzvCF/iIjKc3r5.JPG}}\n",
																										"_umap_options": {
																											"color": "Green",
																											"iconUrl": "/uploads/pictogram/garden-24_1.png",
																											"showLabel": null,
																											"labelHover": true,
																											"labelInteractive": true,
																											"labelDirection": "top"
																										}
																									},
																									"geometry": {
																										"type": "Point",
																										"coordinates": [
																											4.844906,
																											45.751976
																										]
																									}
																								},
																								{
																									"type": "Feature",
																									"properties": {
																										"_storage_options": {
																											"showLabel": true,
																											"color": "Green",
																											"iconUrl": "/uploads/pictogram/garden-24_1.png",
																											"labelHover": true,
																											"labelInteractive": true
																										},
																										"name": "Micro-implantations florales",
																										"description": "Fleurissement de trottoirs. Projet réalisé par le conseil de Quartier Monplaisir\ncontacts : cq8monplaisir@gmail.com\n{{https://framapic.org/DahEjMBVFw2r/09IoKDYTElDi.JPG}}",
																											"_umap_options": {
																												"showLabel": true,
																												"color": "Green",
																												"iconUrl": "/uploads/pictogram/garden-24_1.png",
																												"labelHover": true,
																												"labelInteractive": true
																											}
																										},
																										"geometry": {
																											"type": "Point",
																											"coordinates": [
																												4.860871,
																												45.743561
																											]
																										}
																									},
																									{
																										"type": "Feature",
																										"properties": {
																											"_storage_options": {
																												"color": "Green",
																												"iconUrl": "/uploads/pictogram/garden-24_1.png",
																												"iconClass": "Default",
																												"showLabel": true,
																												"labelHover": true,
																												"labelInteractive": true
																											},
																											"name": "Micro-implantations florales",
																											"description": "Fleurissement de trottoirs. Projet réalisé par le conseil de Quartier Monplaisir. \ncontacts : cq8monplaisir@gmail.com\n{{https://wtf.roflcopter.fr/pics/g81eYt7e/Me1h1Jkz.JPG}}\n{{https://wtf.roflcopter.fr/pics/rbQw8IKb/CGUOiN4A.JPG}}",
																												"_umap_options": {
																													"color": "Green",
																													"iconUrl": "/uploads/pictogram/garden-24_1.png",
																													"iconClass": "Default",
																													"showLabel": true,
																													"labelHover": true,
																													"labelInteractive": true
																												}
																											},
																											"geometry": {
																												"type": "Point",
																												"coordinates": [
																													4.864841,
																													45.742442
																												]
																											}
																										},
																										{
																											"type": "Feature",
																											"properties": {
																												"_storage_options": {
																													"color": "Green",
																													"iconUrl": "/uploads/pictogram/garden-24_1.png",
																													"popupTemplate": "Default",
																													"showLabel": true,
																													"labelHover": true,
																													"labelInteractive": true
																												},
																												"name": "Micro-implantations florales",
																												"description": "Fleurissement de trottoirs. Projet réalisé par le conseil de Quartier Monplaisir. \ncontacts : cq8monplaisir@gmail.com\n{{https://framapic.org/ZRIUxDdsiODf/hswJh7bjw0me.PNG}}\n{{https://framapic.org/diTmYfbCIoPj/V90Q9drVGl1Y.PNG}}",
																													"_umap_options": {
																														"color": "Green",
																														"iconUrl": "/uploads/pictogram/garden-24_1.png",
																														"popupTemplate": "Default",
																														"showLabel": true,
																														"labelHover": true,
																														"labelInteractive": true
																													}
																												},
																												"geometry": {
																													"type": "Point",
																													"coordinates": [
																														4.863338,
																														45.746024
																													]
																												}
																											},
																											{
																												"type": "Feature",
																												"properties": {
																													"_storage_options": {
																														"color": "Green",
																														"iconUrl": "/uploads/pictogram/garden-24_1.png",
																														"showLabel": true,
																														"labelHover": true,
																														"labelInteractive": true
																													},
																													"name": "Micro-implantations florales",
																													"description": "{{https://wtf.roflcopter.fr/pics/jHtodahS/rQpolwV5.image}}",
																														"_umap_options": {
																															"color": "Green",
																															"iconUrl": "/uploads/pictogram/garden-24_1.png",
																															"showLabel": null,
																															"labelHover": true,
																															"labelInteractive": true,
																															"labelDirection": "top"
																														}
																													},
																													"geometry": {
																														"type": "Point",
																														"coordinates": [
																															4.842482,
																															45.754012
																														]
																													}
																												},
																												{
																													"type": "Feature",
																													"properties": {
																														"_storage_options": {
																															"color": "Green",
																															"iconUrl": "/uploads/pictogram/garden-24_1.png",
																															"showLabel": true,
																															"labelHover": true,
																															"labelInteractive": true
																														},
																														"name": "Micro-implantations florales",
																														"_umap_options": {
																															"color": "Green",
																															"iconUrl": "/uploads/pictogram/garden-24_1.png",
																															"showLabel": null,
																															"labelHover": true,
																															"labelInteractive": true,
																															"labelDirection": "top"
																														},
																														"description": "{{https://wtf.roflcopter.fr/pics/bgb7ZScs/oLWA9bVP.jpg}}\n{{https://wtf.roflcopter.fr/pics/psf75aim/nJCnZmHy.jpg}}"
																														},
																														"geometry": {
																															"type": "Point",
																															"coordinates": [
																																4.839799,
																																45.753024
																															]
																														}
																													},
																													{
																														"type": "Feature",
																														"properties": {
																															"_storage_options": {
																																"color": "Green",
																																"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																"showLabel": true,
																																"labelDirection": "auto",
																																"labelHover": true,
																																"labelInteractive": true
																															},
																															"name": "Micro-implantations florales",
																															"description": "{{https://wtf.roflcopter.fr/pics/PFdcXkGg/Meleaiu8.JPG}}\n{{https://wtf.roflcopter.fr/pics/Q21fmUsM/SOmcGOHk.JPG}}",
																																"_umap_options": {
																																	"color": "Green",
																																	"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																	"showLabel": null,
																																	"labelDirection": "top",
																																	"labelHover": true,
																																	"labelInteractive": true
																																}
																															},
																															"geometry": {
																																"type": "Point",
																																"coordinates": [
																																	4.851097,
																																	45.755854
																																]
																															}
																														},
																														{
																															"type": "Feature",
																															"properties": {
																																"_storage_options": {
																																	"color": "Green",
																																	"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																	"popupTemplate": "Default",
																																	"showLabel": true,
																																	"labelHover": true,
																																	"labelInteractive": true
																																},
																																"name": "Micro-implantations florales",
																																"_umap_options": {
																																	"color": "Green",
																																	"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																	"popupTemplate": "Default",
																																	"showLabel": true,
																																	"labelHover": true,
																																	"labelInteractive": true
																																},
																																"description": "{{https://wtf.roflcopter.fr/pics/iHCFd1X7/UStUBxck.jpg}}"
																																},
																																"geometry": {
																																	"type": "Point",
																																	"coordinates": [
																																		4.833298,
																																		45.770786
																																	]
																																}
																															},
																															{
																																"type": "Feature",
																																"properties": {
																																	"_storage_options": {
																																		"color": "Green",
																																		"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																		"showLabel": true,
																																		"labelHover": true,
																																		"labelInteractive": true
																																	},
																																	"description": "Fleurissement de trottoirs. Projet réalisé par le conseil de Quartier Monplaisir.\ncontacts : cq8monplaisir@gmail.com\n{{https://wtf.roflcopter.fr/pics/1No49zEm/sIF1FBkS.JPG}}",
																																		"name": "Micro-implantations florales",
																																		"_umap_options": {
																																			"color": "Green",
																																			"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																			"showLabel": null,
																																			"labelHover": true,
																																			"labelInteractive": true,
																																			"labelDirection": "top"
																																		}
																																	},
																																	"geometry": {
																																		"type": "Point",
																																		"coordinates": [
																																			4.858725,
																																			45.741098
																																		]
																																	}
																																},
																																{
																																	"type": "Feature",
																																	"properties": {
																																		"_storage_options": {
																																			"color": "Green",
																																			"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																			"showLabel": true,
																																			"labelHover": true,
																																			"labelInteractive": true
																																		},
																																		"name": "Micro-implantations florales",
																																		"description": "{{https://wtf.roflcopter.fr/pics/jgOYQTjx/JfBuVz7t.JPG}}",
																																			"_umap_options": {
																																				"color": "Green",
																																				"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																				"showLabel": null,
																																				"labelHover": true,
																																				"labelInteractive": true,
																																				"labelDirection": "top"
																																			}
																																		},
																																		"geometry": {
																																			"type": "Point",
																																			"coordinates": [
																																				4.852449,
																																				45.738462
																																			]
																																		}
																																	},
																																	{
																																		"type": "Feature",
																																		"properties": {
																																			"_storage_options": {
																																				"color": "Green",
																																				"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																				"showLabel": true,
																																				"labelHover": true,
																																				"labelInteractive": true
																																			},
																																			"name": "Micro-implantations florales",
																																			"_umap_options": {
																																				"color": "Green",
																																				"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																				"showLabel": null,
																																				"labelHover": true,
																																				"labelInteractive": true,
																																				"labelDirection": "top"
																																			}
																																		},
																																		"geometry": {
																																			"type": "Point",
																																			"coordinates": [
																																				4.813203,
																																				45.767912
																																			]
																																		}
																																	},
																																	{
																																		"type": "Feature",
																																		"properties": {
																																			"_storage_options": {
																																				"color": "Green",
																																				"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																				"showLabel": true,
																																				"labelHover": true,
																																				"labelInteractive": true
																																			},
																																			"name": "Micro-implantations florales",
																																			"_umap_options": {
																																				"color": "Green",
																																				"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																				"showLabel": null,
																																				"labelHover": true,
																																				"labelInteractive": true,
																																				"labelDirection": "top"
																																			},
																																			"description": ""
																																		},
																																		"geometry": {
																																			"type": "Point",
																																			"coordinates": [
																																				4.810649,
																																				45.75783
																																			]
																																		}
																																	},
																																	{
																																		"type": "Feature",
																																		"properties": {
																																			"_storage_options": {
																																				"color": "Green",
																																				"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																				"showLabel": true,
																																				"labelHover": true,
																																				"labelInteractive": true
																																			},
																																			"name": "Micro-implantations florales",
																																			"_umap_options": {
																																				"color": "Green",
																																				"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																				"showLabel": null,
																																				"labelHover": true,
																																				"labelInteractive": true,
																																				"labelDirection": "top"
																																			},
																																			"description": "{{https://wtf.roflcopter.fr/pics/mXsD9MId/DqMXREkH.JPG}}"
																																			},
																																			"geometry": {
																																				"type": "Point",
																																				"coordinates": [
																																					4.817355,
																																					45.756183
																																				]
																																			}
																																		},
																																		{
																																			"type": "Feature",
																																			"properties": {
																																				"_storage_options": {
																																					"color": "Green",
																																					"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																					"showLabel": true,
																																					"labelHover": true,
																																					"labelInteractive": true
																																				},
																																				"name": "Micro-implantations florales",
																																				"description": "{{https://wtf.roflcopter.fr/pics/DK0zknNq/5ydnR6j5.image}}",
																																					"_umap_options": {
																																						"color": "Green",
																																						"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																						"showLabel": null,
																																						"labelHover": true,
																																						"labelInteractive": true,
																																						"labelDirection": "top"
																																					}
																																				},
																																				"geometry": {
																																					"type": "Point",
																																					"coordinates": [
																																						4.826324,
																																						45.752762
																																					]
																																				}
																																			},
																																			{
																																				"type": "Feature",
																																				"properties": {
																																					"_storage_options": {
																																						"showLabel": true,
																																						"labelHover": true,
																																						"labelInteractive": true,
																																						"color": "Green",
																																						"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																					},
																																					"name": "Micro-implantations florales",
																																					"_umap_options": {
																																						"showLabel": null,
																																						"labelHover": true,
																																						"labelInteractive": true,
																																						"color": "Green",
																																						"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																						"labelDirection": "top"
																																					},
																																					"description": "Micro-implantations florales présentes sur le quai Gailleton, crées et gérées par les habitants du quartier. \n{{https://wtf.roflcopter.fr/pics/k4AEadVA/1xYwTTok.jpg}}\n{{https://wtf.roflcopter.fr/pics/kdzH5ips/e9qzKrgm.jpg}}"
																																					},
																																					"geometry": {
																																						"type": "Point",
																																						"coordinates": [
																																							4.833083,
																																							45.753533
																																						]
																																					}
																																				},
																																				{
																																					"type": "Feature",
																																					"properties": {
																																						"_storage_options": {
																																							"color": "Green",
																																							"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																							"showLabel": true,
																																							"labelHover": true,
																																							"labelInteractive": true
																																						},
																																						"name": "Micro-implantations florales",
																																						"description": "{{https://framapic.org/apY46XgGxJFt/7UPbHm9MpquG?dl}}",
																																							"_umap_options": {
																																								"color": "Green",
																																								"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																								"showLabel": null,
																																								"labelHover": true,
																																								"labelInteractive": true,
																																								"labelDirection": "top"
																																							}
																																						},
																																						"geometry": {
																																							"type": "Point",
																																							"coordinates": [
																																								4.866021,
																																								45.756835
																																							]
																																						}
																																					},
																																					{
																																						"type": "Feature",
																																						"properties": {
																																							"_storage_options": {
																																								"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																								"color": "Green"
																																							},
																																							"name": "Micro-implantations florales",
																																							"description": "rue Martin\n{{https://wtf.roflcopter.fr/pics/Q5Ktqq8p/Ize7dx6w.jpg}}\n{{https://wtf.roflcopter.fr/pics/pQwd88Re/abp934Xs.JPG}}\n{{https://wtf.roflcopter.fr/pics/Pg9W3uPc/r4meY9VY.JPG}}\n{{https://wtf.roflcopter.fr/pics/cN2Z5vqC/yRx03O9p.JPG}}",
																																								"_umap_options": {
																																									"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																									"color": "Green",
																																									"showLabel": null,
																																									"labelDirection": "top",
																																									"labelInteractive": true
																																								}
																																							},
																																							"geometry": {
																																								"type": "Point",
																																								"coordinates": [
																																									4.886566,
																																									45.743921
																																								]
																																							}
																																						},
																																						{
																																							"type": "Feature",
																																							"properties": {
																																								"_storage_options": {
																																									"showLabel": true,
																																									"labelHover": true,
																																									"labelInteractive": true,
																																									"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																									"color": "Green"
																																								},
																																								"name": "Micro-implantations florales",
																																								"_umap_options": {
																																									"showLabel": null,
																																									"labelHover": true,
																																									"labelInteractive": true,
																																									"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																									"color": "Green",
																																									"labelDirection": "top"
																																								},
																																								"description": "{{https://framapic.org/D5YgdyUzfYqU/j5y804153Kaa.jpg}}"
																																								},
																																								"geometry": {
																																									"type": "Point",
																																									"coordinates": [
																																										4.879206,
																																										45.749547
																																									]
																																								}
																																							},
																																							{
																																								"type": "Feature",
																																								"properties": {
																																									"_storage_options": {
																																										"color": "Green",
																																										"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																										"showLabel": true,
																																										"labelHover": true,
																																										"labelInteractive": true
																																									},
																																									"name": "Micro-implantations florales",
																																									"description": "{{https://wtf.roflcopter.fr/pics/gallery#z313tZz5/O81PcSHi.JPG}}",
																																										"_umap_options": {
																																											"color": "Green",
																																											"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																											"showLabel": null,
																																											"labelHover": true,
																																											"labelInteractive": true,
																																											"labelDirection": "top"
																																										}
																																									},
																																									"geometry": {
																																										"type": "Point",
																																										"coordinates": [
																																											4.883723,
																																											45.751235
																																										]
																																									}
																																								},
																																								{
																																									"type": "Feature",
																																									"properties": {
																																										"_storage_options": {
																																											"color": "Green",
																																											"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																											"showLabel": true,
																																											"labelHover": true,
																																											"labelInteractive": true
																																										},
																																										"name": "Micro-implantations florales",
																																										"_umap_options": {
																																											"color": "Green",
																																											"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																											"showLabel": null,
																																											"labelHover": true,
																																											"labelInteractive": true,
																																											"labelDirection": "top"
																																										}
																																									},
																																									"geometry": {
																																										"type": "Point",
																																										"coordinates": [
																																											4.888144,
																																											45.747941
																																										]
																																									}
																																								},
																																								{
																																									"type": "Feature",
																																									"properties": {
																																										"_storage_options": {
																																											"showLabel": true,
																																											"labelHover": true,
																																											"labelInteractive": true,
																																											"color": "Green",
																																											"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																										},
																																										"name": "Micro-implantations florales",
																																										"description": "{{https://framapic.org/cbvXc8dV2qbw/IvvvNUvgK51Z?dl}}",
																																											"_umap_options": {
																																												"showLabel": true,
																																												"labelHover": true,
																																												"labelInteractive": true,
																																												"color": "Green",
																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																											}
																																										},
																																										"geometry": {
																																											"type": "Point",
																																											"coordinates": [
																																												4.894463,
																																												45.750524
																																											]
																																										}
																																									},
																																									{
																																										"type": "Feature",
																																										"properties": {
																																											"_storage_options": {
																																												"color": "DarkGreen",
																																												"opacity": "0.7",
																																												"weight": "4"
																																											},
																																											"name": "Micro-implantations florales",
																																											"description": "{{https://framapic.org/wK9VxXLutXtv/9uTPpz6lk13S?dl}}",
																																												"_umap_options": {
																																													"color": "DarkGreen",
																																													"opacity": "0.7",
																																													"weight": "4"
																																												}
																																											},
																																											"geometry": {
																																												"type": "LineString",
																																												"coordinates": [
																																													[
																																														4.895262,
																																														45.75311
																																													],
																																													[
																																														4.897842,
																																														45.752841
																																													]
																																												]
																																											}
																																										},
																																										{
																																											"type": "Feature",
																																											"properties": {
																																												"_umap_options": {
																																													"color": "Green",
																																													"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																													"showLabel": null,
																																													"labelDirection": "top",
																																													"labelInteractive": true
																																												},
																																												"name": "Micro-implantations florales",
																																												"description": "{{https://wtf.roflcopter.fr/pics/ylEjWeEm/ptrWzIPg.jpg}}"
																																												},
																																												"geometry": {
																																													"type": "Point",
																																													"coordinates": [
																																														4.82626,
																																														45.736302
																																													]
																																												}
																																											},
																																											{
																																												"type": "Feature",
																																												"properties": {
																																													"_storage_options": {
																																														"color": "Orange",
																																														"iconClass": "Default",
																																														"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																													},
																																													"name": "Micro-implantations florales",
																																													"_umap_options": {
																																														"color": "Green",
																																														"iconClass": "Default",
																																														"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																														"showLabel": null,
																																														"labelDirection": "top",
																																														"labelInteractive": true
																																													},
																																													"description": "{{https://wtf.roflcopter.fr/pics/LGw0EMav/w3nauTtO.jpg}}\n\n{{https://wtf.roflcopter.fr/pics/06Nc0JTv/Eyt2Y10T.jpg}}\n\n{{https://wtf.roflcopter.fr/pics/dJe5XsBv/w0uaqjHK.jpg}}"
																																													},
																																													"geometry": {
																																														"type": "Point",
																																														"coordinates": [
																																															4.835143,
																																															45.77418
																																														]
																																													}
																																												},
																																												{
																																													"type": "Feature",
																																													"properties": {
																																														"_umap_options": {
																																															"color": "Green",
																																															"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																															"showLabel": null,
																																															"labelDirection": "top",
																																															"labelInteractive": true
																																														},
																																														"name": "Micro-implantations florales"
																																													},
																																													"geometry": {
																																														"type": "Point",
																																														"coordinates": [
																																															4.845534,
																																															45.753425
																																														]
																																													}
																																												},
																																												{
																																													"type": "Feature",
																																													"properties": {
																																														"_umap_options": {
																																															"color": "Green",
																																															"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																															"showLabel": null,
																																															"labelDirection": "top",
																																															"labelInteractive": true
																																														},
																																														"name": "Micro-implantations florales"
																																													},
																																													"geometry": {
																																														"type": "Point",
																																														"coordinates": [
																																															4.858398,
																																															45.748641
																																														]
																																													}
																																												},
																																												{
																																													"type": "Feature",
																																													"properties": {
																																														"_storage_options": {
																																															"color": "Orange",
																																															"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																														},
																																														"name": "Micro-implantations florales",
																																														"_umap_options": {
																																															"color": "Green",
																																															"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																															"showLabel": null,
																																															"labelDirection": "top"
																																														},
																																														"description": "{{https://wtf.roflcopter.fr/pics/BGnGycGp/tk8G6ZUf.PNG}}"
																																														},
																																														"geometry": {
																																															"type": "Point",
																																															"coordinates": [
																																																4.841816,
																																																45.750438
																																															]
																																														}
																																													},
																																													{
																																														"type": "Feature",
																																														"properties": {
																																															"_umap_options": {
																																																"color": "Green",
																																																"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																"showLabel": null,
																																																"labelDirection": "top",
																																																"labelInteractive": true
																																															},
																																															"name": "Micro-implantations florales",
																																															"description": "{{https://wtf.roflcopter.fr/pics/w229X5eZ/Z9uGYIB9.jpg}}\n{{https://wtf.roflcopter.fr/pics/0Lz3JbKg/xDBMFsS5.jpg}}"
																																															},
																																															"geometry": {
																																																"type": "Point",
																																																"coordinates": [
																																																	4.844869,
																																																	45.755498
																																																]
																																															}
																																														},
																																														{
																																															"type": "Feature",
																																															"properties": {
																																																"_umap_options": {
																																																	"color": "Green",
																																																	"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																	"showLabel": null,
																																																	"labelDirection": "top",
																																																	"labelInteractive": true
																																																},
																																																"name": "Micro-implantations florales",
																																																"description": "Micro-implantations florales réalisés  par les habitants de la rue Flandin et du quartier \n{{https://wtf.roflcopter.fr/pics/D6ZnZEor/pgsLZrA4.jpg}}\n{{https://wtf.roflcopter.fr/pics/A89dSlsy/9qmlJGqG.jpg}}"
																																																},
																																																"geometry": {
																																																	"type": "Point",
																																																	"coordinates": [
																																																		4.862877,
																																																		45.762145
																																																	]
																																																}
																																															},
																																															{
																																																"type": "Feature",
																																																"properties": {
																																																	"_umap_options": {
																																																		"color": "Green",
																																																		"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																		"showLabel": null,
																																																		"labelDirection": "top",
																																																		"labelInteractive": true
																																																	},
																																																	"name": "Micro-implantations florales",
																																																	"description": "{{https://wtf.roflcopter.fr/pics/6XNAFD9u/aipVuyiL.PNG}}"
																																																	},
																																																	"geometry": {
																																																		"type": "Point",
																																																		"coordinates": [
																																																			4.845389,
																																																			45.753309
																																																		]
																																																	}
																																																},
																																																{
																																																	"type": "Feature",
																																																	"properties": {
																																																		"_umap_options": {
																																																			"color": "Green",
																																																			"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																			"showLabel": null,
																																																			"labelInteractive": true,
																																																			"labelDirection": "top"
																																																		},
																																																		"name": "Micro-implantations florales",
																																																		"description": "{{https://wtf.roflcopter.fr/pics/XqV9uyIv/qx5jatWv.jpg}\n{{https://wtf.roflcopter.fr/pics/VCyw5lmp/gkB46sRz.jpg}}"
																																																		},
																																																		"geometry": {
																																																			"type": "Point",
																																																			"coordinates": [
																																																				4.849278,
																																																				45.756123
																																																			]
																																																		}
																																																	},
																																																	{
																																																		"type": "Feature",
																																																		"properties": {
																																																			"_umap_options": {
																																																				"color": "Green",
																																																				"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																			},
																																																			"name": "Micro-implantations florales",
																																																			"description": "Projet réalisé par le conseil de quartier Villette Paul Bert : pquartier.vpb@gmail.com\n{{https://wtf.roflcopter.fr/pics/9C9vihM8/18tTeAHf.JPG}}"
																																																			},
																																																			"geometry": {
																																																				"type": "Point",
																																																				"coordinates": [
																																																					4.86866,
																																																					45.75664
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																				},
																																																				"name": "Micro-implantations florales"
																																																			},
																																																			"geometry": {
																																																				"type": "Point",
																																																				"coordinates": [
																																																					4.889479,
																																																					45.750247
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																				},
																																																				"name": "Micro-implantations florales",
																																																				"description": "Place du Chateau _ Projet soutenu par le colletif Montchat Nature "
																																																			},
																																																			"geometry": {
																																																				"type": "Point",
																																																				"coordinates": [
																																																					4.887865,
																																																					45.750187
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"description": "\n",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.865806,
																																																							45.756865
																																																						],
																																																						[
																																																							4.867094,
																																																							45.756775
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.884957,
																																																							45.751789
																																																						],
																																																						[
																																																							4.886599,
																																																							45.752178
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.880462,
																																																							45.749274
																																																						],
																																																						[
																																																							4.879174,
																																																							45.749633
																																																						],
																																																						[
																																																							4.87911,
																																																							45.749528
																																																						],
																																																						[
																																																							4.880311,
																																																							45.749214
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"description": "\n",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.893926,
																																																							45.751347
																																																						],
																																																						[
																																																							4.894892,
																																																							45.751684
																																																						],
																																																						[
																																																							4.894205,
																																																							45.752635
																																																						],
																																																						[
																																																							4.894323,
																																																							45.752672
																																																						],
																																																						[
																																																							4.895976,
																																																							45.750359
																																																						],
																																																						[
																																																							4.897016,
																																																							45.750524
																																																						],
																																																						[
																																																							4.895278,
																																																							45.752957
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.896029,
																																																							45.749588
																																																						],
																																																						[
																																																							4.896716,
																																																							45.748562
																																																						],
																																																						[
																																																							4.896748,
																																																							45.74863
																																																						],
																																																						[
																																																							4.896094,
																																																							45.749603
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.895933,
																																																							45.748203
																																																						],
																																																						[
																																																							4.896158,
																																																							45.747844
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"description": "\n",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.887768,
																																																							45.749057
																																																						],
																																																						[
																																																							4.888133,
																																																							45.748106
																																																						],
																																																						[
																																																							4.888508,
																																																							45.746504
																																																						],
																																																						[
																																																							4.888594,
																																																							45.746519
																																																						],
																																																						[
																																																							4.888498,
																																																							45.746968
																																																						],
																																																						[
																																																							4.889045,
																																																							45.747095
																																																						],
																																																						[
																																																							4.888948,
																																																							45.747177
																																																						],
																																																						[
																																																							4.888465,
																																																							45.747028
																																																						],
																																																						[
																																																							4.888304,
																																																							45.747686
																																																						],
																																																						[
																																																							4.888916,
																																																							45.747851
																																																						],
																																																						[
																																																							4.888895,
																																																							45.747926
																																																						],
																																																						[
																																																							4.888283,
																																																							45.747731
																																																						],
																																																						[
																																																							4.888197,
																																																							45.748121
																																																						],
																																																						[
																																																							4.888712,
																																																							45.748323
																																																						],
																																																						[
																																																							4.888659,
																																																							45.748375
																																																						],
																																																						[
																																																							4.888176,
																																																							45.748173
																																																						],
																																																						[
																																																							4.88809,
																																																							45.748503
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.885569,
																																																							45.743995
																																																						],
																																																						[
																																																							4.88795,
																																																							45.743778
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.886105,
																																																							45.744003
																																																						],
																																																						[
																																																							4.886405,
																																																							45.743973
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.839405,
																																																							45.752379
																																																						],
																																																						[
																																																							4.84033,
																																																							45.753709
																																																						],
																																																						[
																																																							4.840443,
																																																							45.753679
																																																						],
																																																						[
																																																							4.840293,
																																																							45.753466
																																																						],
																																																						[
																																																							4.840148,
																																																							45.753238
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.833823,
																																																							45.753488
																																																						],
																																																						[
																																																							4.833727,
																																																							45.753309
																																																						],
																																																						[
																																																							4.832804,
																																																							45.753661
																																																						],
																																																						[
																																																							4.832579,
																																																							45.753451
																																																						],
																																																						[
																																																							4.833512,
																																																							45.753137
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.842508,
																																																							45.750812
																																																						],
																																																						[
																																																							4.842997,
																																																							45.750494
																																																						],
																																																						[
																																																							4.844397,
																																																							45.751613
																																																						],
																																																						[
																																																							4.843844,
																																																							45.751935
																																																						],
																																																						[
																																																							4.843697,
																																																							45.751798
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.813106,
																																																							45.767912
																																																						],
																																																						[
																																																							4.812827,
																																																							45.768197
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.844646,
																																																							45.751231
																																																						],
																																																						[
																																																							4.84482,
																																																							45.751355
																																																						],
																																																						[
																																																							4.844469,
																																																							45.751561
																																																						],
																																																						[
																																																							4.84382,
																																																							45.751033
																																																						],
																																																						[
																																																							4.843149,
																																																							45.750496
																																																						],
																																																						[
																																																							4.84309,
																																																							45.750442
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.825975,
																																																							45.768458
																																																						],
																																																						[
																																																							4.826013,
																																																							45.768795
																																																						],
																																																						[
																																																							4.826903,
																																																							45.768803
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.826045,
																																																							45.768477
																																																						],
																																																						[
																																																							4.826077,
																																																							45.768758
																																																						],
																																																						[
																																																							4.827392,
																																																							45.768743
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.830927,
																																																							45.768687
																																																						],
																																																						[
																																																							4.830943,
																																																							45.768589
																																																						],
																																																						[
																																																							4.830857,
																																																							45.768571
																																																						],
																																																						[
																																																							4.830696,
																																																							45.768758
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.830449,
																																																							45.768792
																																																						],
																																																						[
																																																							4.83039,
																																																							45.768765
																																																						],
																																																						[
																																																							4.830422,
																																																							45.768698
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.829355,
																																																							45.768702
																																																						],
																																																						[
																																																							4.829162,
																																																							45.768642
																																																						],
																																																						[
																																																							4.829033,
																																																							45.768649
																																																						],
																																																						[
																																																							4.828539,
																																																							45.768518
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.829344,
																																																							45.769211
																																																						],
																																																						[
																																																							4.829291,
																																																							45.769203
																																																						],
																																																						[
																																																							4.827976,
																																																							45.768975
																																																						],
																																																						[
																																																							4.827172,
																																																							45.768967
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.825573,
																																																							45.752972
																																																						],
																																																						[
																																																							4.826678,
																																																							45.75268
																																																						],
																																																						[
																																																							4.826614,
																																																							45.752553
																																																						],
																																																						[
																																																							4.825509,
																																																							45.752852
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.811207,
																																																							45.757853
																																																						],
																																																						[
																																																							4.811153,
																																																							45.75774
																																																						],
																																																						[
																																																							4.809673,
																																																							45.75798
																																																						],
																																																						[
																																																							4.809651,
																																																							45.75789
																																																						],
																																																						[
																																																							4.811132,
																																																							45.75768
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.817462,
																																																							45.756176
																																																						],
																																																						[
																																																							4.816861,
																																																							45.756041
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.8189,
																																																							45.756094
																																																						],
																																																						[
																																																							4.818578,
																																																							45.756064
																																																						],
																																																						[
																																																							4.818406,
																																																							45.756108
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"description": "",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.860841,
																																																							45.743548
																																																						],
																																																						[
																																																							4.860916,
																																																							45.743554
																																																						],
																																																						[
																																																							4.861,
																																																							45.743546
																																																						],
																																																						[
																																																							4.86108,
																																																							45.743486
																																																						]
																																																					],
																																																					[
																																																						[
																																																							4.864849,
																																																							45.742443
																																																						],
																																																						[
																																																							4.864828,
																																																							45.742397
																																																						],
																																																						[
																																																							4.864891,
																																																							45.742381
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"description": "\n",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.864728,
																																																							45.74241
																																																						],
																																																						[
																																																							4.864812,
																																																							45.742392
																																																						],
																																																						[
																																																							4.864776,
																																																							45.742325
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"description": "\n",
																																																				"_umap_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				}
																																																			},
																																																			"geometry": {
																																																				"type": "MultiLineString",
																																																				"coordinates": [
																																																					[
																																																						[
																																																							4.863092,
																																																							45.746114
																																																						],
																																																						[
																																																							4.863634,
																																																							45.745938
																																																						]
																																																					]
																																																				]
																																																			}
																																																		},
																																																		{
																																																			"type": "Feature",
																																																			"properties": {
																																																				"_storage_options": {
																																																					"color": "Green",
																																																					"opacity": "0.8",
																																																					"weight": "4",
																																																					"showLabel": true,
																																																					"labelDirection": "auto",
																																																					"labelHover": true,
																																																					"labelInteractive": true
																																																				},
																																																				"name": "Micro-implantations florales ",
																																																				"description": "{{https://framapic.org/wWWIb1l2RJgK/cDxHcGV8hZLz?dl}}\n",
																																																					"_umap_options": {
																																																						"color": "Green",
																																																						"opacity": "0.8",
																																																						"weight": "4",
																																																						"showLabel": true,
																																																						"labelDirection": "auto",
																																																						"labelHover": true,
																																																						"labelInteractive": true
																																																					}
																																																				},
																																																				"geometry": {
																																																					"type": "MultiLineString",
																																																					"coordinates": [
																																																						[
																																																							[
																																																								4.878852,
																																																								45.752126
																																																							],
																																																							[
																																																								4.884603,
																																																								45.751085
																																																							],
																																																							[
																																																								4.885558,
																																																								45.753706
																																																							],
																																																							[
																																																								4.885665,
																																																								45.753683
																																																							],
																																																							[
																																																								4.884828,
																																																								45.75143
																																																							]
																																																						],
																																																						[
																																																							[
																																																								4.886899,
																																																								45.751759
																																																							],
																																																							[
																																																								4.885633,
																																																								45.75137
																																																							]
																																																						],
																																																						[
																																																							[
																																																								4.884903,
																																																								45.751714
																																																							],
																																																							[
																																																								4.886663,
																																																								45.752118
																																																							]
																																																						]
																																																					]
																																																				}
																																																			},
																																																			{
																																																				"type": "Feature",
																																																				"properties": {
																																																					"_storage_options": {
																																																						"color": "Green",
																																																						"opacity": "0.8",
																																																						"weight": "4",
																																																						"showLabel": true,
																																																						"labelDirection": "auto",
																																																						"labelHover": true,
																																																						"labelInteractive": true
																																																					},
																																																					"name": "Micro-implantations florales ",
																																																					"description": "{{https://framapic.org/klW736rcfWGW/lsFwpPpFwWha?dl}}",
																																																						"_umap_options": {
																																																							"color": "Green",
																																																							"opacity": "0.8",
																																																							"weight": "4",
																																																							"showLabel": true,
																																																							"labelDirection": "auto",
																																																							"labelHover": true,
																																																							"labelInteractive": true
																																																						}
																																																					},
																																																					"geometry": {
																																																						"type": "MultiLineString",
																																																						"coordinates": [
																																																							[
																																																								[
																																																									4.878809,
																																																									45.752074
																																																								],
																																																								[
																																																									4.884582,
																																																									45.751018
																																																								]
																																																							],
																																																							[
																																																								[
																																																									4.892038,
																																																									45.748884
																																																								],
																																																								[
																																																									4.894313,
																																																									45.749566
																																																								],
																																																								[
																																																									4.894238,
																																																									45.749618
																																																								],
																																																								[
																																																									4.892017,
																																																									45.748937
																																																								]
																																																							],
																																																							[
																																																								[
																																																									4.891706,
																																																									45.749423
																																																								],
																																																								[
																																																									4.894447,
																																																									45.750423
																																																								],
																																																								[
																																																									4.894634,
																																																									45.75015
																																																								],
																																																								[
																																																									4.894838,
																																																									45.75015
																																																								],
																																																								[
																																																									4.89501,
																																																									45.750202
																																																								],
																																																								[
																																																									4.894667,
																																																									45.750195
																																																								],
																																																								[
																																																									4.894538,
																																																									45.750412
																																																								],
																																																								[
																																																									4.895568,
																																																									45.750816
																																																								],
																																																								[
																																																									4.89589,
																																																									45.750322
																																																								]
																																																							],
																																																							[
																																																								[
																																																									4.89325,
																																																									45.750052
																																																								],
																																																								[
																																																									4.894398,
																																																									45.750442
																																																								],
																																																								[
																																																									4.893873,
																																																									45.751265
																																																								]
																																																							],
																																																							[
																																																								[
																																																									4.893937,
																																																									45.751273
																																																								],
																																																								[
																																																									4.894956,
																																																									45.751639
																																																								],
																																																								[
																																																									4.895493,
																																																									45.750876
																																																								],
																																																								[
																																																									4.894495,
																																																									45.750486
																																																								],
																																																								[
																																																									4.893969,
																																																									45.751265
																																																								]
																																																							],
																																																							[
																																																								[
																																																									4.895278,
																																																									45.752957
																																																								]
																																																							],
																																																							[
																																																								[
																																																									4.895375,
																																																									45.752979
																																																								],
																																																								[
																																																									4.89545,
																																																									45.753009
																																																								],
																																																								[
																																																									4.897928,
																																																									45.752785
																																																								],
																																																								[
																																																									4.896072,
																																																									45.752111
																																																								]
																																																							],
																																																							[
																																																								[
																																																									4.898036,
																																																									45.75274
																																																								],
																																																								[
																																																									4.896072,
																																																									45.752044
																																																								],
																																																								[
																																																									4.896641,
																																																									45.75128
																																																								],
																																																								[
																																																									4.897681,
																																																									45.751647
																																																								]
																																																							]
																																																						]
																																																					}
																																																				},
																																																				{
																																																					"type": "Feature",
																																																					"properties": {
																																																						"_storage_options": {
																																																							"color": "Green",
																																																							"opacity": "0.8",
																																																							"weight": "4",
																																																							"showLabel": true,
																																																							"labelDirection": "auto",
																																																							"labelHover": true,
																																																							"labelInteractive": true
																																																						},
																																																						"name": "Micro-implantations florales ",
																																																						"_umap_options": {
																																																							"color": "Green",
																																																							"opacity": "0.8",
																																																							"weight": "4",
																																																							"showLabel": true,
																																																							"labelDirection": "auto",
																																																							"labelHover": true,
																																																							"labelInteractive": true
																																																						},
																																																						"description": "{{https://wtf.roflcopter.fr/pics/HNVBILYD/qUynwXbw.jpg}}"
																																																						},
																																																						"geometry": {
																																																							"type": "MultiLineString",
																																																							"coordinates": [
																																																								[
																																																									[
																																																										4.839759,
																																																										45.752695
																																																									],
																																																									[
																																																										4.839644,
																																																										45.752545
																																																									]
																																																								],
																																																								[
																																																									[
																																																										4.839373,
																																																										45.752124
																																																									],
																																																									[
																																																										4.839428,
																																																										45.752207
																																																									],
																																																									[
																																																										4.839539,
																																																										45.752159
																																																									]
																																																								],
																																																								[
																																																									[
																																																										4.842508,
																																																										45.75082
																																																									],
																																																									[
																																																										4.842621,
																																																										45.750883
																																																									],
																																																									[
																																																										4.842777,
																																																										45.751033
																																																									]
																																																								],
																																																								[
																																																									[
																																																										4.844381,
																																																										45.751707
																																																									],
																																																									[
																																																										4.844456,
																																																										45.751666
																																																									],
																																																									[
																																																										4.844676,
																																																										45.751845
																																																									]
																																																								],
																																																								[
																																																									[
																																																										4.843141,
																																																										45.750281
																																																									],
																																																									[
																																																										4.843254,
																																																										45.750213
																																																									],
																																																									[
																																																										4.843141,
																																																										45.750146
																																																									]
																																																								],
																																																								[
																																																									[
																																																										4.843415,
																																																										45.750108
																																																									],
																																																									[
																																																										4.843866,
																																																										45.749823
																																																									]
																																																								],
																																																								[
																																																									[
																																																										4.843567,
																																																										45.750118
																																																									],
																																																									[
																																																										4.844012,
																																																										45.749829
																																																									]
																																																								],
																																																								[
																																																									[
																																																										4.844912,
																																																										45.751306
																																																									],
																																																									[
																																																										4.84474,
																																																										45.751179
																																																									]
																																																								],
																																																								[
																																																									[
																																																										4.845357,
																																																										45.751853
																																																									],
																																																									[
																																																										4.845464,
																																																										45.751782
																																																									],
																																																									[
																																																										4.845577,
																																																										45.751883
																																																									]
																																																								],
																																																								[
																																																									[
																																																										4.844643,
																																																										45.75064
																																																									],
																																																									[
																																																										4.844896,
																																																										45.750554
																																																									],
																																																									[
																																																										4.844933,
																																																										45.750644
																																																									]
																																																								]
																																																							]
																																																						}
																																																					},
																																																					{
																																																						"type": "Feature",
																																																						"properties": {
																																																							"_storage_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"showLabel": true,
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							},
																																																							"name": "Micro-implantations florales ",
																																																							"_umap_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"showLabel": true,
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							}
																																																						},
																																																						"geometry": {
																																																							"type": "MultiLineString",
																																																							"coordinates": [
																																																								[
																																																									[
																																																										4.833282,
																																																										45.770909
																																																									],
																																																									[
																																																										4.833335,
																																																										45.770457
																																																									]
																																																								]
																																																							]
																																																						}
																																																					},
																																																					{
																																																						"type": "Feature",
																																																						"properties": {
																																																							"_storage_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"weight": "4",
																																																								"showLabel": true,
																																																								"labelDirection": "auto",
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							},
																																																							"name": "Micro-implantations florales ",
																																																							"_umap_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"weight": "4",
																																																								"showLabel": true,
																																																								"labelDirection": "auto",
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							}
																																																						},
																																																						"geometry": {
																																																							"type": "MultiLineString",
																																																							"coordinates": [
																																																								[
																																																									[
																																																										4.844922,
																																																										45.751396
																																																									],
																																																									[
																																																										4.844917,
																																																										45.751411
																																																									],
																																																									[
																																																										4.844558,
																																																										45.75163
																																																									],
																																																									[
																																																										4.845496,
																																																										45.752394
																																																									],
																																																									[
																																																										4.845714,
																																																										45.752571
																																																									]
																																																								]
																																																							]
																																																						}
																																																					},
																																																					{
																																																						"type": "Feature",
																																																						"properties": {
																																																							"_storage_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"weight": "4",
																																																								"showLabel": true,
																																																								"labelDirection": "auto",
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							},
																																																							"name": "Micro-implantations florales ",
																																																							"_umap_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"weight": "4",
																																																								"showLabel": true,
																																																								"labelDirection": "auto",
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							}
																																																						},
																																																						"geometry": {
																																																							"type": "MultiLineString",
																																																							"coordinates": [
																																																								[
																																																									[
																																																										4.846789,
																																																										45.750898
																																																									],
																																																									[
																																																										4.847454,
																																																										45.750573
																																																									]
																																																								],
																																																								[
																																																									[
																																																										4.84672,
																																																										45.750846
																																																									],
																																																									[
																																																										4.847567,
																																																										45.75043
																																																									]
																																																								]
																																																							]
																																																						}
																																																					},
																																																					{
																																																						"type": "Feature",
																																																						"properties": {
																																																							"_storage_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"weight": "4",
																																																								"showLabel": true,
																																																								"labelDirection": "auto",
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							},
																																																							"name": "Micro-implantations florales ",
																																																							"description": "",
																																																							"_umap_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"weight": "4",
																																																								"showLabel": true,
																																																								"labelDirection": "auto",
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							}
																																																						},
																																																						"geometry": {
																																																							"type": "MultiLineString",
																																																							"coordinates": [
																																																								[
																																																									[
																																																										4.844182,
																																																										45.750793
																																																									],
																																																									[
																																																										4.84342,
																																																										45.750228
																																																									]
																																																								]
																																																							]
																																																						}
																																																					},
																																																					{
																																																						"type": "Feature",
																																																						"properties": {
																																																							"_storage_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"weight": "4",
																																																								"showLabel": true,
																																																								"labelDirection": "auto",
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							},
																																																							"name": "Micro-implantations florales ",
																																																							"description": "",
																																																							"_umap_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"weight": "4",
																																																								"showLabel": true,
																																																								"labelDirection": "auto",
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							}
																																																						},
																																																						"geometry": {
																																																							"type": "MultiLineString",
																																																							"coordinates": [
																																																								[
																																																									[
																																																										4.852379,
																																																										45.738054
																																																									],
																																																									[
																																																										4.852379,
																																																										45.73805
																																																									],
																																																									[
																																																										4.852867,
																																																										45.736725
																																																									]
																																																								]
																																																							]
																																																						}
																																																					},
																																																					{
																																																						"type": "Feature",
																																																						"properties": {
																																																							"_storage_options": {
																																																								"color": "Green",
																																																								"opacity": "0.8",
																																																								"weight": "4",
																																																								"showLabel": true,
																																																								"labelDirection": "auto",
																																																								"labelHover": true,
																																																								"labelInteractive": true
																																																							},
																																																							"name": "Micro-implantations florales ",
																																																							"description": "{{https://wtf.roflcopter.fr/pics/z6DZwI3B/Xz5zi2kY.JPG}}\n",
																																																								"_umap_options": {
																																																									"color": "Green",
																																																									"opacity": "0.8",
																																																									"weight": "4",
																																																									"showLabel": true,
																																																									"labelDirection": "auto",
																																																									"labelHover": true,
																																																									"labelInteractive": true
																																																								}
																																																							},
																																																							"geometry": {
																																																								"type": "MultiLineString",
																																																								"coordinates": [
																																																									[
																																																										[
																																																											4.851875,
																																																											45.737979
																																																										],
																																																										[
																																																											4.852272,
																																																											45.738031
																																																										],
																																																										[
																																																											4.852449,
																																																											45.73744
																																																										],
																																																										[
																																																											4.85284,
																																																											45.736429
																																																										]
																																																									]
																																																								]
																																																							}
																																																						},
																																																						{
																																																							"type": "Feature",
																																																							"properties": {
																																																								"_storage_options": {
																																																									"color": "Green",
																																																									"opacity": "0.8",
																																																									"weight": "4",
																																																									"showLabel": true,
																																																									"labelDirection": "auto",
																																																									"labelHover": true,
																																																									"labelInteractive": true
																																																								},
																																																								"name": "Micro-implantations florales ",
																																																								"description": "",
																																																								"_umap_options": {
																																																									"color": "Green",
																																																									"opacity": "0.8",
																																																									"weight": "4",
																																																									"showLabel": true,
																																																									"labelDirection": "auto",
																																																									"labelHover": true,
																																																									"labelInteractive": true
																																																								}
																																																							},
																																																							"geometry": {
																																																								"type": "MultiLineString",
																																																								"coordinates": [
																																																									[
																																																										[
																																																											4.853345,
																																																											45.735759
																																																										],
																																																										[
																																																											4.853409,
																																																											45.735343
																																																										]
																																																									]
																																																								]
																																																							}
																																																						},
																																																						{
																																																							"type": "Feature",
																																																							"properties": {
																																																								"_storage_options": {
																																																									"color": "Green",
																																																									"opacity": "0.8",
																																																									"weight": "4",
																																																									"showLabel": true,
																																																									"labelDirection": "auto",
																																																									"labelHover": true,
																																																									"labelInteractive": true
																																																								},
																																																								"name": "Micro-implantations florales ",
																																																								"description": "",
																																																								"_umap_options": {
																																																									"color": "Green",
																																																									"opacity": "0.8",
																																																									"weight": "4",
																																																									"showLabel": true,
																																																									"labelDirection": "auto",
																																																									"labelHover": true,
																																																									"labelInteractive": true
																																																								}
																																																							},
																																																							"geometry": {
																																																								"type": "MultiLineString",
																																																								"coordinates": [
																																																									[
																																																										[
																																																											4.853017,
																																																											45.735991
																																																										],
																																																										[
																																																											4.85313,
																																																											45.735403
																																																										]
																																																									]
																																																								]
																																																							}
																																																						},
																																																						{
																																																							"type": "Feature",
																																																							"properties": {
																																																								"_storage_options": {
																																																									"color": "Green",
																																																									"opacity": "0.8",
																																																									"weight": "4",
																																																									"showLabel": true,
																																																									"labelDirection": "auto",
																																																									"labelHover": true,
																																																									"labelInteractive": true
																																																								},
																																																								"name": "Micro-implantations florales ",
																																																								"description": "",
																																																								"_umap_options": {
																																																									"color": "Green",
																																																									"opacity": "0.8",
																																																									"weight": "4",
																																																									"showLabel": true,
																																																									"labelDirection": "auto",
																																																									"labelHover": true,
																																																									"labelInteractive": true
																																																								}
																																																							},
																																																							"geometry": {
																																																								"type": "MultiLineString",
																																																								"coordinates": [
																																																									[
																																																										[
																																																											4.86108,
																																																											45.743486
																																																										],
																																																										[
																																																											4.861077,
																																																											45.743423
																																																										],
																																																										[
																																																											4.861042,
																																																											45.743368
																																																										]
																																																									]
																																																								]
																																																							}
																																																						},
																																																						{
																																																							"type": "Feature",
																																																							"properties": {
																																																								"_storage_options": {
																																																									"color": "Green",
																																																									"opacity": "0.8",
																																																									"weight": "4",
																																																									"showLabel": true,
																																																									"labelDirection": "auto",
																																																									"labelHover": true,
																																																									"labelInteractive": true
																																																								},
																																																								"name": "Micro-implantations florales ",
																																																								"description": "",
																																																								"_umap_options": {
																																																									"color": "Green",
																																																									"opacity": "0.8",
																																																									"weight": "4",
																																																									"showLabel": true,
																																																									"labelDirection": "auto",
																																																									"labelHover": true,
																																																									"labelInteractive": true
																																																								}
																																																							},
																																																							"geometry": {
																																																								"type": "MultiLineString",
																																																								"coordinates": [
																																																									[
																																																										[
																																																											4.85895,
																																																											45.740978
																																																										],
																																																										[
																																																											4.858655,
																																																											45.741083
																																																										],
																																																										[
																																																											4.858607,
																																																											45.741019
																																																										],
																																																										[
																																																											4.858693,
																																																											45.740929
																																																										]
																																																									],
																																																									[
																																																										[
																																																											4.867791,
																																																											45.745096
																																																										]
																																																									]
																																																								]
																																																							}
																																																						},
																																																						{
																																																							"type": "Feature",
																																																							"properties": {
																																																								"_storage_options": {
																																																									"showLabel": true,
																																																									"labelHover": true,
																																																									"labelInteractive": true,
																																																									"color": "Green",
																																																									"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																								},
																																																								"name": "Micro-implantations florales ",
																																																								"_umap_options": {
																																																									"showLabel": null,
																																																									"labelHover": true,
																																																									"labelInteractive": true,
																																																									"color": "Green",
																																																									"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																									"labelDirection": "top"
																																																								},
																																																								"description": "{{https://wtf.roflcopter.fr/pics/rdFz05nR/guLD5ugg.jpg}}\n{{https://wtf.roflcopter.fr/pics/h81H834L/AAqcqkpe.jpg}}"
																																																								},
																																																								"geometry": {
																																																									"type": "Point",
																																																									"coordinates": [
																																																										4.827799,
																																																										45.768971
																																																									]
																																																								}
																																																							},
																																																							{
																																																								"type": "Feature",
																																																								"properties": {
																																																									"_storage_options": {
																																																										"color": "Green",
																																																										"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																										"showLabel": true,
																																																										"labelHover": true,
																																																										"labelInteractive": true
																																																									},
																																																									"name": "Micro-implantations florales ",
																																																									"description": "{{https://wtf.roflcopter.fr/pics/2f9AC3Jd/oUugk1Un.jpg}}",
																																																										"_umap_options": {
																																																											"color": "Green",
																																																											"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																											"showLabel": null,
																																																											"labelHover": true,
																																																											"labelInteractive": true,
																																																											"labelDirection": "top"
																																																										}
																																																									},
																																																									"geometry": {
																																																										"type": "Point",
																																																										"coordinates": [
																																																											4.856579,
																																																											45.765158
																																																										]
																																																									}
																																																								},
																																																								{
																																																									"type": "Feature",
																																																									"properties": {
																																																										"_umap_options": {
																																																											"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																											"showLabel": null,
																																																											"labelDirection": "top",
																																																											"labelInteractive": true,
																																																											"color": "Green"
																																																										},
																																																										"name": "Micro-implantations florales "
																																																									},
																																																									"geometry": {
																																																										"type": "Point",
																																																										"coordinates": [
																																																											4.895922,
																																																											45.746137
																																																										]
																																																									}
																																																								},
																																																								{
																																																									"type": "Feature",
																																																									"properties": {
																																																										"_umap_options": {
																																																											"color": "Green",
																																																											"iconClass": "Default",
																																																											"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																											"showLabel": null,
																																																											"labelDirection": "top",
																																																											"labelInteractive": true
																																																										},
																																																										"name": "Micro-implantations florales ",
																																																										"description": "{{https://wtf.roflcopter.fr/pics/wnYg5piF/ARkLfF49.jpg}}\n{{https://wtf.roflcopter.fr/pics/8zrkqWHO/fuscdBD9.jpg}}\n"
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.873129,
																																																												45.749165
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales ",
																																																											"description": "{{"
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.846414,
																																																												45.752594
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																												"showLabel": null,
																																																												"labelInteractive": true,
																																																												"labelDirection": "top"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.84893,
																																																												45.7525
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.896088,
																																																												45.751827
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.893411,
																																																												45.75192
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.89265,
																																																												45.751647
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.894999,
																																																												45.751793
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.895514,
																																																												45.751067
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.890783,
																																																												45.751138
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.891689,
																																																												45.750909
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.890091,
																																																												45.750909
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales ",
																																																											"description": "18 rue Jean Marie Chavant"
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.847224,
																																																												45.752328
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales ",
																																																											"description": "2 rue André Chenier "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.890928,
																																																												45.747061
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.893959,
																																																												45.750221
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.896201,
																																																												45.752182
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.892929,
																																																												45.749225
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales ",
																																																											"description": "23 rue Jules Massenet "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.891008,
																																																												45.747799
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.895541,
																																																												45.752822
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales ",
																																																											"description": "51 rue Montesquieu "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.844182,
																																																												45.751842
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales ",
																																																											"description": "3 rue Grillet "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.8454,
																																																												45.749146
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales ",
																																																											"description": "243 rue de Créqui"
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.848511,
																																																												45.756176
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Green",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Micro-implantations florales ",
																																																											"description": "29 cours Richard-Vitton _ Projet soutenu par le collectif Montchat Nature "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.889372,
																																																												45.75378
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Teal",
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																											},
																																																											"name": "Projet de végétalisation",
																																																											"description": "Fleurissement Pieds d'arbres Paul Santy et Micro-implantations florales Rue Victor et Roger thomas - Association \"bien vivre à Montplaisir la plaine\" "
																																																										},
																																																										"geometry": {
																																																											"type": "Point",
																																																											"coordinates": [
																																																												4.884401,
																																																												45.723302
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_umap_options": {
																																																												"color": "Teal",
																																																												"weight": "5",
																																																												"opacity": "0.7"
																																																											},
																																																											"name": "Projet de végétalisation",
																																																											"description": "Fleurissement Pieds d'arbres Paul Santy et Micro-implantations florales Rue Victor et Roger thomas - Association \"bien vivre à Montplaisir la plaine\" "
																																																										},
																																																										"geometry": {
																																																											"type": "LineString",
																																																											"coordinates": [
																																																												[
																																																													4.886139,
																																																													45.726459
																																																												],
																																																												[
																																																													4.886198,
																																																													45.726432
																																																												],
																																																												[
																																																													4.886155,
																																																													45.726373
																																																												]
																																																											]
																																																										}
																																																									},
																																																									{
																																																										"type": "Feature",
																																																										"properties": {
																																																											"_storage_options": {
																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																												"color": "DarkCyan",
																																																												"popupTemplate": "Default",
																																																												"showLabel": true,
																																																												"labelHover": true,
																																																												"labelInteractive": true
																																																											},
																																																											"description": "Jardins de rues - biodiversité - Place Guichard.      Le Conseil de Quartier, en partenariat avec Lyon Nature (Ville de Lyon) et les associations Frapna, Arthropologia, et LPO a réalisé plusieurs dispositifs pour la biodiversité : hôtel à insectes, mangeoires à oiseaux, prairie fleurie, bacs d'incroyables comestibles\n{{https://wtf.roflcopter.fr/pics/RNWbJQSx/InJTo1sc.JPG}}",
																																																												"_umap_options": {
																																																													"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																													"color": "DarkCyan",
																																																													"popupTemplate": "Default",
																																																													"showLabel": null,
																																																													"labelHover": true,
																																																													"labelInteractive": true,
																																																													"labelDirection": "top"
																																																												},
																																																												"name": "Projet de végétalisation "
																																																											},
																																																											"geometry": {
																																																												"type": "Point",
																																																												"coordinates": [
																																																													4.847465,
																																																													45.759245
																																																												]
																																																											}
																																																										},
																																																										{
																																																											"type": "Feature",
																																																											"properties": {
																																																												"_storage_options": {
																																																													"color": "Teal",
																																																													"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																													"showLabel": true,
																																																													"labelHover": true,
																																																													"labelInteractive": true
																																																												},
																																																												"description": "Plantations participatives. Petits fruitiers plantés dans le passage Montluc. Projet à l'initiative de l'association \"Les coccinelles de Sans-soucis\"",
																																																												"_umap_options": {
																																																													"color": "DarkCyan",
																																																													"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																													"showLabel": null,
																																																													"labelHover": true,
																																																													"labelInteractive": true,
																																																													"labelDirection": "top"
																																																												},
																																																												"name": "Projet de végétalisation "
																																																											},
																																																											"geometry": {
																																																												"type": "Point",
																																																												"coordinates": [
																																																													4.862587,
																																																													45.750576
																																																												]
																																																											}
																																																										},
																																																										{
																																																											"type": "Feature",
																																																											"properties": {
																																																												"_storage_options": {
																																																													"color": "Teal",
																																																													"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																													"showLabel": true,
																																																													"labelHover": true,
																																																													"labelInteractive": true
																																																												},
																																																												"description": "Jardinières square Jules Guesde. Projet à l'initiative de habitants en charge du composteur de quartier square Jules Guesde\n{{https://wtf.roflcopter.fr/pics/Ocq5mm5G/Fu7ASZhA.JPG}}\n{{https://framapic.org/t5iNwveXK0Rz/p9WXpN1ZABHh.PNG}}\n{{https://framapic.org/ZLz2uII0c7GV/YGhMEvpWj0zy.jpg}}\n{{https://framapic.org/HRDLpkLhsBNX/Ee8MFyDhm60c.jpg}}\n",
																																																													"_umap_options": {
																																																														"color": "DarkCyan",
																																																														"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																														"showLabel": null,
																																																														"labelHover": true,
																																																														"labelInteractive": true,
																																																														"labelDirection": "top"
																																																													},
																																																													"name": "Projet de végétalisation "
																																																												},
																																																												"geometry": {
																																																													"type": "Point",
																																																													"coordinates": [
																																																														4.838539,
																																																														45.747919
																																																													]
																																																												}
																																																											},
																																																											{
																																																												"type": "Feature",
																																																												"properties": {
																																																													"_umap_options": {
																																																														"color": "DarkCyan",
																																																														"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																														"showLabel": null,
																																																														"labelDirection": "top",
																																																														"labelInteractive": true
																																																													},
																																																													"name": "Projet de végétalisation ",
																																																													"description": "{{https://wtf.roflcopter.fr/pics/lfWiQdxy/PbJwHOov.jpg}}\n{{https://wtf.roflcopter.fr/pics/m5forjFV/88CQuxaR.jpg}}"
																																																													},
																																																													"geometry": {
																																																														"type": "Point",
																																																														"coordinates": [
																																																															4.80978,
																																																															45.769693
																																																														]
																																																													}
																																																												},
																																																												{
																																																													"type": "Feature",
																																																													"properties": {
																																																														"_umap_options": {
																																																															"color": "DarkCyan",
																																																															"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																														},
																																																														"name": "Projet de végétalisation ",
																																																														"description": "Place de l'Europe {{https://framapic.org/GqgUzaBHqfL6/eFRJecQmQCa7.jpg}}"
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.850931,
																																																																45.764469
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																"showLabel": null,
																																																																"labelDirection": "top",
																																																																"labelInteractive": true
																																																															},
																																																															"description": "Rue bon pasteur_Micro-implantations florales ",
																																																															"name": "Projet de végétalisation en cours"
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.827043,
																																																																45.772077
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet de végétalisation en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.835063,
																																																																45.77559
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet de végétalisation en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.84864,
																																																																45.756958
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet de végétalisation en cours ",
																																																															"description": "Place Colbert "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.834623,
																																																																45.772473
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconClass": "Default",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d'arbre en cours ",
																																																															"description": "Pied d'arbre au 124 Avenue Berthelot"
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.848377,
																																																																45.743033
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d'arbre en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.882092,
																																																																45.748087
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d'arbre en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.857341,
																																																																45.748892
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d’arbre en cours ",
																																																															"description": "Fleurissement de 5 Pieds d'arbres entre le N°131 et 133 avenue Berthelot "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.848629,
																																																																45.743205
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d’arbre en cours ",
																																																															"description": "Adresse: 126 Avenue Berthelot "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.852073,
																																																																45.741861
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d’arbre en cours ",
																																																															"description": "Fleurissement d'un pied d'arbre au 126 Avenue Berthelot "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.848517,
																																																																45.742988
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d’arbre en cours ",
																																																															"description": "Adresse: 184 Avenue Berthelot "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.853629,
																																																																45.741364
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d’arbre en cours ",
																																																															"description": "Adresse : 191 Avenue Berthelot "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.854568,
																																																																45.741296
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d’arbre en cours ",
																																																															"description": "Adresse : 11 rue Marcel Teppaz "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.848104,
																																																																45.743883
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d’arbre en cours ",
																																																															"description": "Adresse: 136 Avenue Berthelot "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.849257,
																																																																45.742749
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d’arbre en cours ",
																																																															"description": "Fleurissement des deux Pieds d'arbres au 103 Avenue Berthelot "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.846398,
																																																																45.743917
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/park2-24_1.png"
																																																															},
																																																															"name": "Projet fleurissement pied d’arbre en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.834891,
																																																																45.775164
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																"showLabel": null,
																																																																"labelInteractive": true,
																																																																"labelDirection": "top"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours"
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.794534,
																																																																45.773611
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.882674,
																																																																45.749789
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Green",
																																																																"weight": "5",
																																																																"opacity": "1"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours ",
																																																															"description": "Suite projet Jules Massenet "
																																																														},
																																																														"geometry": {
																																																															"type": "LineString",
																																																															"coordinates": [
																																																																[
																																																																	4.8942,
																																																																	45.749259
																																																																],
																																																																[
																																																																	4.89442,
																																																																	45.74933
																																																																]
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.804265,
																																																																45.776668
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours ",
																																																															"description": "Michel Servet_rue de provence"
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.837471,
																																																																45.7725
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.850587,
																																																																45.740892
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Green",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours ",
																																																															"description": "81 cours Eugénie _ Projet soutenu par le colletif Montchat Nature "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.888487,
																																																																45.740607
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours ",
																																																															"description": "62 rue Rachais - Projet collège"
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.849198,
																																																																45.74842
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours ",
																																																															"description": "21 rue Cavenne - Projet école "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.839038,
																																																																45.753043
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours ",
																																																															"description": "66 rue pasteur - Projet école "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.838871,
																																																																45.751643
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.811883,
																																																																45.756183
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours ",
																																																															"description": "46 rue de Cuire"
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.82995,
																																																																45.777992
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.887269,
																																																																45.748634
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.867088,
																																																																45.756056
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.89207,
																																																																45.745927
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.866632,
																																																																45.750251
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.891158,
																																																																45.742827
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours ",
																																																															"description": "48 rue du repos"
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.852551,
																																																																45.742749
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours ",
																																																															"description": "114 rue montesquieu"
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.847143,
																																																																45.749981
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.829843,
																																																																45.730959
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																"showLabel": null,
																																																																"labelInteractive": true,
																																																																"labelDirection": "top"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "Point",
																																																															"coordinates": [
																																																																4.843356,
																																																																45.757044
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_umap_options": {
																																																																"color": "Gold",
																																																																"weight": "5"
																																																															},
																																																															"name": "Projet micro-implantations florales en cours "
																																																														},
																																																														"geometry": {
																																																															"type": "LineString",
																																																															"coordinates": [
																																																																[
																																																																	4.89133,
																																																																	45.74203
																																																																],
																																																																[
																																																																	4.891153,
																																																																	45.743007
																																																																],
																																																																[
																																																																	4.890187,
																																																																	45.743044
																																																																],
																																																																[
																																																																	4.892349,
																																																																	45.742992
																																																																]
																																																															]
																																																														}
																																																													},
																																																													{
																																																														"type": "Feature",
																																																														"properties": {
																																																															"_storage_options": {
																																																																"color": "Teal",
																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																"showLabel": true,
																																																																"labelHover": true,
																																																																"labelInteractive": true
																																																															},
																																																															"name": "Végétalisation bacs et jardinières",
																																																															"description": "Balconnières fleuries \n{{https://framapic.org/ZSfmLlvR5Yx5/DhCgQW0MKhfv?dl}}",
																																																																"_umap_options": {
																																																																	"color": "Olive",
																																																																	"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																	"showLabel": null,
																																																																	"labelHover": true,
																																																																	"labelInteractive": true,
																																																																	"labelDirection": "top"
																																																																}
																																																															},
																																																															"geometry": {
																																																																"type": "Point",
																																																																"coordinates": [
																																																																	4.833078,
																																																																	45.772185
																																																																]
																																																															}
																																																														},
																																																														{
																																																															"type": "Feature",
																																																															"properties": {
																																																																"_storage_options": {
																																																																	"color": "Teal",
																																																																	"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																	"showLabel": true,
																																																																	"labelHover": true,
																																																																	"labelInteractive": true
																																																																},
																																																																"name": "Végétalisation bacs et jardinières",
																																																																"description": "Jardinons ensemble la Croix-rousse : projet réalisé par les habitants, Lyon Nature et la Mairie du 4ème arrondissement en 2017\n{{https://wtf.roflcopter.fr/pics/I8Fogb8v/KnfJjo9r.image}",
																																																																	"_umap_options": {
																																																																		"color": "Olive",
																																																																		"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																		"showLabel": null,
																																																																		"labelHover": true,
																																																																		"labelInteractive": true,
																																																																		"labelDirection": "top"
																																																																	}
																																																																},
																																																																"geometry": {
																																																																	"type": "Point",
																																																																	"coordinates": [
																																																																		4.832139,
																																																																		45.777835
																																																																	]
																																																																}
																																																															},
																																																															{
																																																																"type": "Feature",
																																																																"properties": {
																																																																	"_storage_options": {
																																																																		"color": "Teal",
																																																																		"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																		"showLabel": true,
																																																																		"labelHover": true,
																																																																		"labelInteractive": true
																																																																	},
																																																																	"name": "Végétalisation bacs et jardinières",
																																																																	"description": "Projet Jardinons ensemble la Croix-rousse : projet réalisé par les habitants, Lyon Nature et la Mairie du 4ème arrondissement \n\n{{https://wtf.roflcopter.fr/pics/I8Fogb8v/KnfJjo9r.imagel}}",
																																																																		"_umap_options": {
																																																																			"color": "Olive",
																																																																			"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																			"showLabel": null,
																																																																			"labelHover": true,
																																																																			"labelInteractive": true,
																																																																			"labelDirection": "top"
																																																																		}
																																																																	},
																																																																	"geometry": {
																																																																		"type": "Point",
																																																																		"coordinates": [
																																																																			4.836109,
																																																																			45.778987
																																																																		]
																																																																	}
																																																																},
																																																																{
																																																																	"type": "Feature",
																																																																	"properties": {
																																																																		"_storage_options": {
																																																																			"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																			"color": "Teal",
																																																																			"labelHover": true,
																																																																			"labelInteractive": true,
																																																																			"showLabel": true
																																																																		},
																																																																		"name": "Végétalisation bacs et jardinières",
																																																																		"description": "Bacs potagers jardinés par les habitants de la rue Pouteau\n{{https://framapic.org/XdG8YQ2pik6d/EuVfDYukcWC1?dl}}",
																																																																			"_umap_options": {
																																																																				"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																				"color": "Olive",
																																																																				"labelHover": true,
																																																																				"labelInteractive": true,
																																																																				"showLabel": null,
																																																																				"labelDirection": "top"
																																																																			}
																																																																		},
																																																																		"geometry": {
																																																																			"type": "Point",
																																																																			"coordinates": [
																																																																				4.833231,
																																																																				45.771418
																																																																			]
																																																																		}
																																																																	},
																																																																	{
																																																																		"type": "Feature",
																																																																		"properties": {
																																																																			"_storage_options": {
																																																																				"color": "DarkCyan",
																																																																				"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																				"showLabel": true,
																																																																				"labelHover": true,
																																																																				"labelInteractive": true
																																																																			},
																																																																			"name": "Végétalisation bacs et jardinières",
																																																																			"description": "Bacs gérés par le mouvement \"les incroyables comestibles\" et Ostara, disposés de Valmy à Gorge de loup {{https://wtf.roflcopter.fr/pics/DFnVkyIW/9UwtfPTB.JPG}}\n{{https://wtf.roflcopter.fr/pics/rKpZuUFZ/B1qjhmGs.JPG}}",
																																																																				"_umap_options": {
																																																																					"color": "Olive",
																																																																					"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																					"showLabel": null,
																																																																					"labelHover": true,
																																																																					"labelInteractive": true,
																																																																					"labelDirection": "top"
																																																																				}
																																																																			},
																																																																			"geometry": {
																																																																				"type": "Point",
																																																																				"coordinates": [
																																																																					4.805446,
																																																																					45.77351
																																																																				]
																																																																			}
																																																																		},
																																																																		{
																																																																			"type": "Feature",
																																																																			"properties": {
																																																																				"_umap_options": {
																																																																					"color": "Olive",
																																																																					"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																																				},
																																																																				"name": "Végétalisation bacs et jardinières ",
																																																																				"description": "21 rue Marc Antoine Petit "
																																																																			},
																																																																			"geometry": {
																																																																				"type": "Point",
																																																																				"coordinates": [
																																																																					4.825643,
																																																																					45.744819
																																																																				]
																																																																			}
																																																																		},
																																																																		{
																																																																			"type": "Feature",
																																																																			"properties": {
																																																																				"description": "bacs jardinés par l'association jardin partagé Saint Nestor \n{{https://wtf.roflcopter.fr/pics/ep6QHFuZ/woL936D5.jpg}}\n{{https://wtf.roflcopter.fr/pics/WoiqcpAA/CvY6OO00.jpg}}",
																																																																					"_umap_options": {
																																																																						"color": "Olive",
																																																																						"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																						"showLabel": null
																																																																					},
																																																																					"name": "Végétalisation bacs et jardinières "
																																																																				},
																																																																				"geometry": {
																																																																					"type": "Point",
																																																																					"coordinates": [
																																																																						4.86115,
																																																																						45.743733
																																																																					]
																																																																				}
																																																																			},
																																																																			{
																																																																				"type": "Feature",
																																																																				"properties": {
																																																																					"_storage_options": {
																																																																						"color": "Teal",
																																																																						"showLabel": true,
																																																																						"labelHover": true,
																																																																						"labelInteractive": true,
																																																																						"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																																					},
																																																																					"_umap_options": {
																																																																						"color": "Olive",
																																																																						"showLabel": null,
																																																																						"labelHover": true,
																																																																						"labelInteractive": true,
																																																																						"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																						"labelDirection": "top"
																																																																					},
																																																																					"name": "Végétalisation bacs et jardinières "
																																																																				},
																																																																				"geometry": {
																																																																					"type": "Point",
																																																																					"coordinates": [
																																																																						4.822311,
																																																																						45.799292
																																																																					]
																																																																				}
																																																																			},
																																																																			{
																																																																				"type": "Feature",
																																																																				"properties": {
																																																																					"_storage_options": {
																																																																						"color": "Teal",
																																																																						"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																																					},
																																																																					"name": "Végétalisation bacs et jardinières ",
																																																																					"description": "jardinières potagères entretenues par les Incroyables comestibles et la MJC Saint Rambert",
																																																																					"_umap_options": {
																																																																						"color": "Olive",
																																																																						"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																						"showLabel": null,
																																																																						"labelDirection": "top",
																																																																						"labelInteractive": true
																																																																					}
																																																																				},
																																																																				"geometry": {
																																																																					"type": "Point",
																																																																					"coordinates": [
																																																																						4.831924,
																																																																						45.801214
																																																																					]
																																																																				}
																																																																			},
																																																																			{
																																																																				"type": "Feature",
																																																																				"properties": {
																																																																					"_storage_options": {
																																																																						"color": "Teal",
																																																																						"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																						"showLabel": true,
																																																																						"labelHover": true,
																																																																						"labelInteractive": true
																																																																					},
																																																																					"name": "Végétalisation bacs et jardinières ",
																																																																					"description": "Bacs en palette, construits par les habitants du quartier et l'association les défricheurs du Zénith. \n{{https://framapic.org/2o1FypoQDKqe/M3YzQjiylHG4?dl}}",
																																																																						"_umap_options": {
																																																																							"color": "Olive",
																																																																							"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																							"showLabel": null,
																																																																							"labelHover": true,
																																																																							"labelInteractive": true,
																																																																							"labelDirection": "top"
																																																																						}
																																																																					},
																																																																					"geometry": {
																																																																						"type": "Point",
																																																																						"coordinates": [
																																																																							4.877479,
																																																																							45.746623
																																																																						]
																																																																					}
																																																																				},
																																																																				{
																																																																					"type": "Feature",
																																																																					"properties": {
																																																																						"_storage_options": {
																																																																							"color": "Teal",
																																																																							"iconClass": "Default",
																																																																							"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																							"showLabel": true,
																																																																							"labelHover": true,
																																																																							"labelInteractive": true
																																																																						},
																																																																						"name": "Végétalisation bacs et jardinières ",
																																																																						"_umap_options": {
																																																																							"color": "Olive",
																																																																							"iconClass": "Default",
																																																																							"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																							"showLabel": null,
																																																																							"labelHover": true,
																																																																							"labelInteractive": true,
																																																																							"labelDirection": "top"
																																																																						},
																																																																						"description": "Bacs Incroyables comestibles {{https://framapic.org/T2s5LPwW1waQ/9adrw5D0lCHn.PNG}}\n"
																																																																						},
																																																																						"geometry": {
																																																																							"type": "Point",
																																																																							"coordinates": [
																																																																								4.840196,
																																																																								45.73957
																																																																							]
																																																																						}
																																																																					},
																																																																					{
																																																																						"type": "Feature",
																																																																						"properties": {
																																																																							"_storage_options": {
																																																																								"color": "Teal",
																																																																								"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																								"showLabel": true,
																																																																								"labelHover": true,
																																																																								"labelInteractive": true
																																																																							},
																																																																							"_umap_options": {
																																																																								"color": "Olive",
																																																																								"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																								"showLabel": null,
																																																																								"labelHover": true,
																																																																								"labelInteractive": true,
																																																																								"labelDirection": "top"
																																																																							},
																																																																							"description": "Bacs Incroyables Comestibles Parc Blandan\n\n{{https://wtf.roflcopter.fr/pics/WmRTdlGn/OT7IVeEM.JPG}}",
																																																																								"name": "Végétalisation bacs et jardinières "
																																																																							},
																																																																							"geometry": {
																																																																								"type": "Point",
																																																																								"coordinates": [
																																																																									4.852266,
																																																																									45.745276
																																																																								]
																																																																							}
																																																																						},
																																																																						{
																																																																							"type": "Feature",
																																																																							"properties": {
																																																																								"_storage_options": {
																																																																									"color": "Teal",
																																																																									"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																									"showLabel": true,
																																																																									"labelHover": true,
																																																																									"labelInteractive": true
																																																																								},
																																																																								"description": "Bacs potager Bacs de plantes comestibles, aromatiques et ornementales entretenus par Jardin en herbe et les Incroyables Comestibles \n{{https://wtf.roflcopter.fr/pics/synyVI6A/zncK3e8N.JPG}}\n{{https://wtf.roflcopter.fr/pics/xGHRvBSS/fjesMvLM.JPG}}",
																																																																									"_umap_options": {
																																																																										"color": "Olive",
																																																																										"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																										"showLabel": true,
																																																																										"labelHover": true,
																																																																										"labelInteractive": true,
																																																																										"labelDirection": "top"
																																																																									},
																																																																									"name": "Végétalisation bacs et jardinières "
																																																																								},
																																																																								"geometry": {
																																																																									"type": "Point",
																																																																									"coordinates": [
																																																																										4.89427,
																																																																										45.747462
																																																																									]
																																																																								}
																																																																							},
																																																																							{
																																																																								"type": "Feature",
																																																																								"properties": {
																																																																									"_storage_options": {
																																																																										"color": "DarkCyan",
																																																																										"showLabel": true,
																																																																										"labelHover": true,
																																																																										"labelInteractive": true,
																																																																										"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																																									},
																																																																									"name": "Végétalisation bacs et jardinières ",
																																																																									"description": "Bacs potagers. Bacs gérés par la crèche AGDS et les parents d'élèves\n{{https://wtf.roflcopter.fr/pics/R87uWHxF/chrarRQI.jpg}}\n{{https://wtf.roflcopter.fr/pics/1gC1124J/zDMVgNMv.jpg}}",
																																																																										"_umap_options": {
																																																																											"color": "Olive",
																																																																											"showLabel": null,
																																																																											"labelHover": true,
																																																																											"labelInteractive": true,
																																																																											"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																											"labelDirection": "top"
																																																																										}
																																																																									},
																																																																									"geometry": {
																																																																										"type": "Point",
																																																																										"coordinates": [
																																																																											4.857244,
																																																																											45.74106
																																																																										]
																																																																									}
																																																																								},
																																																																								{
																																																																									"type": "Feature",
																																																																									"properties": {
																																																																										"_storage_options": {
																																																																											"color": "DarkCyan",
																																																																											"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																											"showLabel": true,
																																																																											"labelHover": true,
																																																																											"labelInteractive": true
																																																																										},
																																																																										"description": "Bacs potagers Parc Sisley et nichoirs à insectes réalisés par l'école Montbrilland et les habitants du quartier\n{{https://framapic.org/7BiKJxP1nvbf/PUIrOclcFtkK?dl}}",
																																																																											"_umap_options": {
																																																																												"color": "Olive",
																																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																												"showLabel": null,
																																																																												"labelHover": true,
																																																																												"labelInteractive": true,
																																																																												"labelDirection": "top"
																																																																											},
																																																																											"name": "Végétalisation bacs et jardinières "
																																																																										},
																																																																										"geometry": {
																																																																											"type": "Point",
																																																																											"coordinates": [
																																																																												4.867877,
																																																																												45.751928
																																																																											]
																																																																										}
																																																																									},
																																																																									{
																																																																										"type": "Feature",
																																																																										"properties": {
																																																																											"_storage_options": {
																																																																												"color": "Orange",
																																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																																											},
																																																																											"_umap_options": {
																																																																												"color": "Olive",
																																																																												"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																												"showLabel": null,
																																																																												"labelDirection": "top",
																																																																												"labelInteractive": true
																																																																											},
																																																																											"description": "bacs potagers place Gensoul {{https://wtf.roflcopter.fr/pics/VLlXXI49/zpAw1euk.jpg}}\n{{https://wtf.roflcopter.fr/pics/P88Z40dT/HRuxTLsn.jpg}}",
																																																																												"name": "Végétalisation bacs et jardinières "
																																																																											},
																																																																											"geometry": {
																																																																												"type": "Point",
																																																																												"coordinates": [
																																																																													4.8242,
																																																																													45.751445
																																																																												]
																																																																											}
																																																																										},
																																																																										{
																																																																											"type": "Feature",
																																																																											"properties": {
																																																																												"_storage_options": {
																																																																													"color": "Orange",
																																																																													"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																																												},
																																																																												"name": "Végétalisation bacs et jardinières ",
																																																																												"_umap_options": {
																																																																													"color": "Olive",
																																																																													"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																													"showLabel": null,
																																																																													"labelDirection": "top",
																																																																													"labelInteractive": true
																																																																												},
																																																																												"description": "Projet réalisé par les jardiniers du composteur du quai de Serbie\n{{https://wtf.roflcopter.fr/pics/5ExzVvyd/R29aRJ0K.jpg}}"
																																																																												},
																																																																												"geometry": {
																																																																													"type": "Point",
																																																																													"coordinates": [
																																																																														4.840829,
																																																																														45.771175
																																																																													]
																																																																												}
																																																																											},
																																																																											{
																																																																												"type": "Feature",
																																																																												"properties": {
																																																																													"_storage_options": {
																																																																														"color": "Teal",
																																																																														"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																														"showLabel": true,
																																																																														"labelHover": true,
																																																																														"labelInteractive": true
																																																																													},
																																																																													"description": "Jardinières école primaire. Fleurissement et décoration des jardinières par l'école primaire et le conseil de quartier (Quartiers anciens) ",
																																																																													"_umap_options": {
																																																																														"color": "Olive",
																																																																														"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																														"showLabel": null,
																																																																														"labelHover": true,
																																																																														"labelInteractive": true,
																																																																														"labelDirection": "top"
																																																																													},
																																																																													"name": "Végétalisation bacs et jardinières "
																																																																												},
																																																																												"geometry": {
																																																																													"type": "Point",
																																																																													"coordinates": [
																																																																														4.825412,
																																																																														45.757246
																																																																													]
																																																																												}
																																																																											},
																																																																											{
																																																																												"type": "Feature",
																																																																												"properties": {
																																																																													"_storage_options": {
																																																																														"color": "Teal",
																																																																														"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																														"showLabel": true,
																																																																														"labelHover": true,
																																																																														"labelInteractive": true
																																																																													},
																																																																													"description": "Jardinières Place Vollon entretenues par l'association les Fruits de la Terre\n{{https://wtf.roflcopter.fr/pics/Gh0qo59x/NAgieAko.image}}",
																																																																														"_umap_options": {
																																																																															"color": "Olive",
																																																																															"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																															"showLabel": null,
																																																																															"labelHover": true,
																																																																															"labelInteractive": true,
																																																																															"labelDirection": "top"
																																																																														},
																																																																														"name": "Végétalisation bacs et jardinières "
																																																																													},
																																																																													"geometry": {
																																																																														"type": "Point",
																																																																														"coordinates": [
																																																																															4.827472,
																																																																															45.75557
																																																																														]
																																																																													}
																																																																												},
																																																																												{
																																																																													"type": "Feature",
																																																																													"properties": {
																																																																														"_storage_options": {
																																																																															"color": "Teal",
																																																																															"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																															"showLabel": true,
																																																																															"labelHover": true,
																																																																															"labelInteractive": true
																																																																														},
																																																																														"description": "Jardinières pont Bonaparte? Fleurissement par le conseil de quartier \"Quartiers Anciens\"\n{{https://wtf.roflcopter.fr/pics/zptfbPUY/8jhl6pOu.JPG}}\n{{https://wtf.roflcopter.fr/pics/7Yc261xp/d6lG35hW.JPG}}",
																																																																															"_umap_options": {
																																																																																"color": "Olive",
																																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																																"showLabel": null,
																																																																																"labelHover": true,
																																																																																"labelInteractive": true,
																																																																																"labelDirection": "top"
																																																																															},
																																																																															"name": "Végétalisation bacs et jardinières "
																																																																														},
																																																																														"geometry": {
																																																																															"type": "Point",
																																																																															"coordinates": [
																																																																																4.828271,
																																																																																45.759533
																																																																															]
																																																																														}
																																																																													},
																																																																													{
																																																																														"type": "Feature",
																																																																														"properties": {
																																																																															"_umap_options": {
																																																																																"color": "Olive",
																																																																																"iconClass": "Default",
																																																																																"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																																															},
																																																																															"name": "Végétalisation bacs et jardinières ",
																																																																															"description": "Bac potager en libre service au sein du Clos st benoit, à l’initiative de l’association Pentes vertes depuis juin 2017. \n{{https://wtf.roflcopter.fr/pics/s3b8CTBO/fK1bX9S7.jpg}}\n"
																																																																															},
																																																																															"geometry": {
																																																																																"type": "Point",
																																																																																"coordinates": [
																																																																																	4.825503,
																																																																																	45.768904
																																																																																]
																																																																															}
																																																																														},
																																																																														{
																																																																															"type": "Feature",
																																																																															"properties": {
																																																																																"_storage_options": {
																																																																																	"color": "Teal",
																																																																																	"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																																	"showLabel": true,
																																																																																	"labelHover": true,
																																																																																	"labelInteractive": true
																																																																																},
																																																																																"description": "Potager dans le square de l'abbé Rozier géré par l'association la Passerelle Eau de Robec \n{{https://wtf.roflcopter.fr/pics/vkFwBDLK/pUVsOPmR.JPG}}",
																																																																																	"name": "Végétalisation bacs et jardinières ",
																																																																																	"_umap_options": {
																																																																																		"color": "Olive",
																																																																																		"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																																		"showLabel": null,
																																																																																		"labelHover": true,
																																																																																		"labelInteractive": true,
																																																																																		"labelDirection": "top"
																																																																																	}
																																																																																},
																																																																																"geometry": {
																																																																																	"type": "Point",
																																																																																	"coordinates": [
																																																																																		4.833724,
																																																																																		45.76957
																																																																																	]
																																																																																}
																																																																															},
																																																																															{
																																																																																"type": "Feature",
																																																																																"properties": {
																																																																																	"_storage_options": {
																																																																																		"color": "Teal",
																																																																																		"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																																		"showLabel": true,
																																																																																		"labelHover": true,
																																																																																		"labelInteractive": true
																																																																																	},
																																																																																	"name": "Végétalisation bacs et jardinières ",
																																																																																	"description": "projet de jardinage animé par le centre Social Pierrette Augier dans le Parc Roquette\n{{https://wtf.roflcopter.fr/pics/627RB32C/wmZiKw1J.JPG}}",
																																																																																		"_umap_options": {
																																																																																			"color": "Olive",
																																																																																			"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																																			"showLabel": null,
																																																																																			"labelHover": true,
																																																																																			"labelInteractive": true,
																																																																																			"labelDirection": "top"
																																																																																		}
																																																																																	},
																																																																																	"geometry": {
																																																																																		"type": "Point",
																																																																																		"coordinates": [
																																																																																			4.805928,
																																																																																			45.776122
																																																																																		]
																																																																																	}
																																																																																},
																																																																																{
																																																																																	"type": "Feature",
																																																																																	"properties": {
																																																																																		"_umap_options": {
																																																																																			"color": "Olive",
																																																																																			"iconUrl": "/uploads/pictogram/garden-24_1.png"
																																																																																		},
																																																																																		"name": "Végétalisation bacs et jardinières ",
																																																																																		"description": "Bacs gérés par l'association Zéro déchet Lyon\n{{https://wtf.roflcopter.fr/pics/l5QXZ33y/E3IV0f2X.jpg}}"
																																																																																		},
																																																																																		"geometry": {
																																																																																			"type": "Point",
																																																																																			"coordinates": [
																																																																																				4.807581,
																																																																																				45.776234
																																																																																			]
																																																																																		}
																																																																																	},
																																																																																	{
																																																																																		"type": "Feature",
																																																																																		"properties": {
																																																																																			"_storage_options": {
																																																																																				"color": "Teal",
																																																																																				"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																																				"showLabel": true,
																																																																																				"popupTemplate": "Default",
																																																																																				"labelHover": true,
																																																																																				"labelInteractive": true
																																																																																			},
																																																																																			"description": "Bacs Incroyables comestibles \n{{https://framapic.org/UWZv2qZkN36P/KqSHO6vpGUqt?dl}}",
																																																																																				"_umap_options": {
																																																																																					"color": "Olive",
																																																																																					"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																																					"showLabel": null,
																																																																																					"popupTemplate": "Default",
																																																																																					"labelHover": true,
																																																																																					"labelInteractive": true,
																																																																																					"labelDirection": "top"
																																																																																				},
																																																																																				"name": "Végétalisation bacs et jardinières "
																																																																																			},
																																																																																			"geometry": {
																																																																																				"type": "Point",
																																																																																				"coordinates": [
																																																																																					4.834714,
																																																																																					45.772773
																																																																																				]
																																																																																			}
																																																																																		},
																																																																																		{
																																																																																			"type": "Feature",
																																																																																			"properties": {
																																																																																				"_storage_options": {
																																																																																					"color": "Teal",
																																																																																					"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																																					"showLabel": true,
																																																																																					"labelHover": true,
																																																																																					"labelInteractive": true
																																																																																				},
																																																																																				"description": "Le verger du Télégraphe.  Verger et plante sauvages plantés à l'initiative des habitants du quartier et l'association Jardingues",
																																																																																				"_umap_options": {
																																																																																					"color": "Olive",
																																																																																					"iconUrl": "/uploads/pictogram/garden-24_1.png",
																																																																																					"showLabel": null,
																																																																																					"labelHover": true,
																																																																																					"labelInteractive": true,
																																																																																					"labelDirection": "top"
																																																																																				},
																																																																																				"name": "Végétalisation bacs et jardinières "
																																																																																			},
																																																																																			"geometry": {
																																																																																				"type": "Point",
																																																																																				"coordinates": [
																																																																																					4.817945,
																																																																																					45.757336
																																																																																				]
																																																																																			}
																																																																																		}
																																																																																	]
																																																																																}

var pluviometrie = $.ajax({
																																																																																	url: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=adr_voie_lieu.adrlieusurf&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4171&startIndex=0&count=100',
																																																																																	dataType: 'json',
																																																																																	success: function(data){
																																																																																		L.geoJSON(pluviometrie.responseJSON).addTo(pluvio)
																																																																																	}
																																																																																})

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=MHGMzr8B5tlVrWvrc4x3', {
attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);


L.geoJSON(jardinscollectifs).addTo(jardinscoll)

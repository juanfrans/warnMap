mapboxgl.accessToken = 'pk.eyJ1IjoiamZzMjExOCIsImEiOiJja2p1ZHJwaGkyazlrMnhsZWNqYXloejR1In0.YV5hQzIkwM4fT66wLddOsQ';

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/jfs2118/ckaa2fs3o23ns1joz5l78ypj6',
center: [-73.963,40.718], // starting position [lng, lat]
zoom: 10 // starting zoom
});

map.on('load', function() {
  // This is the function that finds the first symbol layer
    // var layers = map.getStyle().layers;
    // var firstSymbolId;
    // for (var i = 0; i < layers.length; i++) {
    //   console.log(layers[i].id);
    //     // if (layers[i].type === 'symbol') {
    //     //     firstSymbolId = layers[i].id;
    //     //     break;
    //     // }
    // }
//   map.addSource('dem', {
//     'type': 'raster-dem',
//     'url': 'mapbox://mapbox.terrain-rgb'
//   });
//   map.addLayer({
//     'id': 'hillshading',
//     'source': 'dem',
//     'type': 'hillshade'
//     // insert below waterway-river-canal-shadow;
//     // where hillshading sits in the Mapbox Outdoors style
//     // TODO: modify the basemap to remove unnecessary layers and rearrange these layers to make the sit in the right order
//   },'road-intersection');
  map.addLayer({
    id: 'warnData',
    type: 'circle',
    source: {
      type: 'geojson',
      data: 'data/warnDataGoogle.geojson'
    },
    paint: {
        'circle-color': 'lightgray',
        'circle-stroke-color': 'black',
        'circle-stroke-width': 0.5,
        'circle-radius': ['interpolate',['linear'],['zoom'],
            10, 4,
            14, 6,
            18, 12]
    }
  },'road-label');
  map.addLayer({
    id: 'warnData2019',
    type: 'circle',
    source: {
      type: 'geojson',
      data: 'data/warnDataGoogle2019.geojson'
    },
    paint: {
        'circle-color': 'red',
        'circle-stroke-color': 'black',
        'circle-stroke-width': 0.5,
        'circle-radius': ['interpolate',['linear'],['zoom'],
            10, 4,
            14, 6,
            18, 12]
    }
  },'road-label');
});

// Create the popup
map.on('click', 'warnData', function (e) {
    var companyName = e.features[0].properties.company;
    var address = e.features[0].properties.address;
    var businessType = e.features[0].properties.businessType;
    var numberAffected = e.features[0].properties.numberAffected;
    var totalEmployees = e.features[0].properties.totalEmployees;
    var reasonDislocation = e.features[0].properties.reasonDislocation;
    var noticeDate = e.features[0].properties.noticeDate;
    // wnrPerc = (wnrPerc * 100).toFixed(0);
    // totalVotes = totalVotes.toLocaleString();
    companyName = companyName.toUpperCase();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+companyName+'</h4>'
            +'<p>Address: <b>'+address+'</b><br>'
            +"Business type: <b>"+businessType+'</b><br>'
            +"Number of people affected: <b>"+numberAffected+'</b><br>'
            +"Total number of employees: <b>"+totalEmployees+'</b><br>'
            +"Reason for closing: <b>"+reasonDislocation+'</b><br>'
            +"Notice date: <b>"+noticeDate+'</p>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the warnData layer.
map.on('mouseenter', 'warnData', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'warnData', function () {
    map.getCanvas().style.cursor = '';
});

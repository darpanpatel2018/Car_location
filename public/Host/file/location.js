
    var x;
    var y;
    var x1;
    var y1;
    var position;
    var position1;
    var marker;
    var map;
    var path = [];
    var result;
    var style;

    function initMap(){

    map_Styling();
    
    function map_Styling(){
        style =  [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
    }
  
      map = undefined;
      var latlng = new google.maps.LatLng(22.994459, 72.617287);

      var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
         styles : style
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
      //  google.maps.event.addDomListener(window, 'load', initialize);


    // Map options
    var mapref = firebase.database().ref('DHT11/Loc');
    var maprefForPastTrip = firebase.database().ref('DHT11/Location/');
    
    
    maprefForPastTrip.on('child_added', function(snapshot){
        var m = snapshot.val();
        x = m.Latitude;
        y = m.Longitude;
    
 
        var latlng = new google.maps.LatLng(x, y);
        path.push(latlng);

        var latLngBounds = new google.maps.LatLngBounds();
          for(var i = 0; i < path.length; i++) {
            latLngBounds.extend(path[i]);
            // Place the marker      
          }
          // Creates the polyline object
          var polyline = new google.maps.Polyline({
            map: map,
            path: path,
            strokeColor: '#212121',
            strokeOpacity: 0.6,
            strokeWeight: 4
          });
          // Fit the bounds of the generated points
          map.fitBounds(latLngBounds);
   		 

    });
    
    mapref.on('child_added', function(snapshot) {
    console.log( snapshot.val());
    var m = snapshot.val();
    x = m.Latitude;
    y = m.Longitude;
    

    
    marker = undefined;
   
    position = [x, y];
 
        var latlng = new google.maps.LatLng(position[0], position[1]);

    //    var image = {
      //         path: "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z",
        //       strokeColor: 'white',
   // strokeWeight: .10,
    //fillOpacity: 1,
    //fillColor: '#404040',
    //offset: '10%',
    // rotation: parseInt(heading[i]),
    //anchor: new google.maps.Point(10, 25)
        
   // }
   var image ='./image/marker.png';  
   marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Your current location!",
            icon : image
        }); 
  });    
    
    mapref.on('child_changed', function(snapshot) {
    console.log( snapshot.val());
    var m = snapshot.val();
    x1 = m.Latitude;
    y1 = m.Longitude;
  
    position1 = [x1, y1];
    var result = [x1, y1];
    console.log(position1);
    animate(result);
    
  });   
    
    function animate (result){
    var numDeltas = 1;
    var delay = 100000000; //milliseconds
    var i = 0;
    var deltaLat;
    var deltaLng;

    transition(result)
          
    function transition(result){
        i = 0;
        deltaLat = (result[0] - position[0])/1;
        deltaLng = (result[1] - position[1])/1;
        moveMarker();
    }
  
    function moveMarker(){
        position[0] += deltaLat;
        position[1] += deltaLng;
       
       //code for ICON
      //  var icon = {
    //path: "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z",
    //strokeColor: 'white',
    //strokeWeight: .10,
    //fillOpacity: 1, 
    //fillColor: '#404040',
    //offset: '5%',
    //anchor: new google.maps.Point(10, 25),
    //rotation: 0,
    //}
    var icon ='./image/marker.png';
        //code for moving markers on map
        var latlng = new google.maps.LatLng(position[0], position[1]);
        marker.setPosition(latlng);
        marker.setIcon(icon);
        //code for setting new point for poly line 
        // path.push(latlng);
        
        //code to itratte function Movemarker until marke moves completly to new position 
        if(i!=numDeltas){
            i++;
            setTimeout(moveMarker, delay);
        }
    }

   
    
    var latLngBounds = new google.maps.LatLngBounds();
          for(var i = 0; i < path.length; i++) {
            latLngBounds.extend(path[i]);
            // Place the marker      
          }
          // Creates the polyline object
          var polyline = new google.maps.Polyline({
            map: map,
            path: path,
            strokeColor: '#000000',
            strokeOpacity: 0.7,
            strokeWeight: 5
          });
          // Fit the bounds of the generated points
          map.fitBounds(latLngBounds);
  }
 }
$(document).ready(function() {
    initialize_gmaps();
})


var map;
var arr = [];
var counter = 0;
// var days = []

// day1 = {
//   hotel: string
//   restaurants: [],
//   thingsToDo: [],
//   markers: []
// }

// day1.setHotel = function() {

// }


function initialize_gmaps() {
  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
  // set the map options hash
  var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById("map-canvas");
  // initialize a new Google Map with the options
  map = new google.maps.Map(map_canvas_obj, mapOptions);
  // Add the marker to the map
  var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Hello World!"
  });
  // Add the marker to the map by calling setMap()
  marker.setMap(map);
}





$('.glyphicon-plus-sign').on('click', function() {
  var $selected, $itineraryItem, collection;
  // console.log('i am clicking plus signs');
  // console.log('this: ', $(this)[0]);
  if ($(this)[0].id === 'hotels-btn') {
    $selected = $('select.fn-hotels');
    $itineraryItem = $('.it-hotel');
    collection = all_hotels;
  }

  if ($(this)[0].id === 'restaurants-btn') {
    $selected = $('select.fn-restaurants');
    $itineraryItem = $('.it-restaurant');
    collection = all_restaurants;
  }

  if ($(this)[0].id === 'thingsToDo-btn') {
    $selected = $('select.fn-thingsToDo');
    $itineraryItem = $('.it-things');
    collection = all_things_to_do;
  }

  $itineraryItem.append('<li>'+$selected.val()+'<span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span></li>');

var lat, lng;
for(var i = 0; i < collection.length; i++) {
  if(collection[i].name === $selected.val()){
    lat = collection[i].place[0].location[0];
    lng = collection[i].place[0].location[1];
  }
}
var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat,lng),
    title: $selected.val()
});

// To add the marker to the map, call setMap();
marker.setMap(map);
arr.push(marker);
})



$('ul').on('click', 'span', function() {
  var name = $(this)[0].parentElement.innerText;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].title === name) {
      arr[i].setMap(null);
      arr.splice(i,1);
    }
  }
  $(this)[0].parentElement.remove();

})
$('.btn-add-day').on('click', function() {
  counter++;
  $(this).before('<button class="btn btn-info circle">'+counter+'</button>')
})




$(document).ready(function() {
    initialize_gmaps();
    firstDay();
});

var dayIndex = 1;
var map;
var markersArray = [];
var counter = 0;
var days = [];
var dayObj = days[dayIndex - 1];
//
var Day = function() {
  this.markerArray = [];
  this.hotels = [];
  this.restaurants = [];
  this.thingsToDo = [];
};

function firstDay() {
  counter++;
  var day = new Day(counter);
  days.push(day);
  $('.btn-add-day').before('<button class="btn btn-info circle day-btn">'+counter+'</button>');
}
// add to map and new li
// remove map and li





//instantiation method

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
  // var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     title:"Hello World!"
  // });
  // // Add the marker to the map by calling setMap()
  // marker.setMap(map);
}

//Change Day Index
$('.panel-heading').on('click', '.day-btn', function(){
  dayObj = days[dayIndex - 1];
  dayObj.markerArray.forEach(function(item) {
    item.setMap(null);
  });
  dayIndex = +$(this)[0].innerText;
  changeDays();
});


$('.glyphicon-plus-sign').on('click', function() {
    var $selected, $itineraryItem, collection, type;
    if ($(this)[0].id === 'hotels-btn') {
      $selected = $('select.fn-hotels');
      $itineraryItem = $('.it-hotel');
      collection = all_hotels;
      type = 'hotels';

    }

    if ($(this)[0].id === 'restaurants-btn') {
      $selected = $('select.fn-restaurants');
      $itineraryItem = $('.it-restaurant');
      collection = all_restaurants;
      type = 'restaurants';
    }

    if ($(this)[0].id === 'thingsToDo-btn') {
      $selected = $('select.fn-thingsToDo');
      $itineraryItem = $('.it-things');
      collection = all_things_to_do;
      type = 'thingsToDo';
    }

    var liString = '<li>'+$selected.val()+'<span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span></li>';
    $itineraryItem.append(liString);

    days[dayIndex - 1][type].push(liString);

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
    markersArray.push(marker);
    days[dayIndex - 1].markerArray.push(marker);
});



$('ul').on('click', 'span', function() {
  var name = $(this)[0].parentElement.innerText;
  var arraytype;
  var classname = $(this)[0].parentElement.parentElement.className;
  // console.dir($(this)[0].parentElement.parentElement.className);
  for (var i = 0; i < markersArray.length; i++) {
    if (markersArray[i].title === name) {
      markersArray[i].setMap(null);
      markersArray.splice(i,1);
    }
  }

    if(classname === 'it-hotel') {
      arraytype = 'hotels';
    }
    if(classname === 'it-restaurant') {
      arraytype = 'restaurants';
    }
    if(classname === 'it-things') {
      arraytype = 'thingsToDo';
    }

  var liToRemove = $(this)[0].parentElement.outerHTML;
// console.log(dayObj);
console.log(dayObj[arraytype]);
  dayObj[arraytype].forEach(function(element){
    if(element === liToRemove) {
      dayObj[arraytype].splice(dayObj[arraytype].indexOf(liToRemove),1);
    }
  });
  $(this)[0].parentElement.remove();


});


//Create First Day
function firstDay() {
  counter++;
  var day = new Day(counter);
  days.push(day);
  $('.btn-add-day').before('<button class="btn btn-info circle day-btn">'+counter+'</button>');
}

//Add New Day
$('.btn-add-day').on('click', function() {
  counter++;
  var day = new Day(counter);
  days.push(day);
  $(this).before('<button class="btn btn-info circle day-btn">'+counter+'</button>');
});


function changeDays() {
  $('.panel-body ul').empty();
  // map.setMap(null);

  dayObj = days[dayIndex - 1];

  dayObj.hotels.forEach(function(item) {
  $('.it-hotel').append(item);
  });

  dayObj.restaurants.forEach(function(item) {
  $('.it-restaurant').append(item);
  });

  dayObj.thingsToDo.forEach(function(item) {
  $('.it-things').append(item);
  });

  dayObj.markerArray.forEach(function(item) {
    item.setMap(map);
  });
}

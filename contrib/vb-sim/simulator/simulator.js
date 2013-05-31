/*******************************************************************************
*  Code contributed to the webinos project
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
* 
*     http://www.apache.org/licenses/LICENSE-2.0
* 
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Copyright 2012 BMW AG
* Copyright 2012 TU München
******************************************************************************/

now.ready(function () {
  $('#inputGear').removeAttr('disabled');
});
$(document).ready(function () {
  //$(':checkbox').iphoneStyle();
  $("#slider-pf-or").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pf-or").val(ui.value);
    },
    stop: function (event, ui) {
      setPsFront();
    }
  });
  //$( "#pf-or" ).val(( "#slider-pf-or" ).slider( "value" ));
  $("#slider-pf-r").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pf-r").val(ui.value);
    },
    stop: function (event, ui) {
      setPsFront();
    }
  });
  //$( "#pf-r" ).val(( "#slider-pf-r" ).slider( "value" ) );
  $("#slider-pf-mr").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pf-mr").val(ui.value);
    },
    stop: function (event, ui) {
      setPsFront();
    }
  });
  //$( "#pf-mr" ).val(( "#slider-pf-mr" ).slider( "value" ) );
  $("#slider-pf-ml").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pf-ml").val(ui.value);
    },
    stop: function (event, ui) {
      setPsFront();
    }
  });
  //$( "#pf-ml" ).val(( "#slider-pf-ml" ).slider( "value" ) );
  $("#slider-pf-l").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pf-l").val(ui.value);
    },
    stop: function (event, ui) {
      setPsFront();
    }
  });
  //$( "#pf-l" ).val(( "#slider-pf-l" ).slider( "value" ) );
  $("#slider-pf-ol").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pf-ol").val(ui.value);
    },
    stop: function (event, ui) {
      setPsFront();
    }
  });
  //$( "#pf-ol" ).val(( "#slider-pf-ol" ).slider( "value" ) );
  $("#slider-pr-or").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pr-or").val(ui.value);
    },
    stop: function (event, ui) {
      setPsRear();
    }
  });
  //$( "#pr-or" ).val(( "#slider-pr-or" ).slider( "value" ));
  $("#slider-pr-r").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pr-r").val(ui.value);
    },
    stop: function (event, ui) {
      setPsRear();
    }
  });
  //$( "#pr-r" ).val(( "#slider-pr-r" ).slider( "value" ) );
  $("#slider-pr-mr").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pr-mr").val(ui.value);
    },
    stop: function (event, ui) {
      setPsRear();
    }
  });
  //$( "#pr-mr" ).val(( "#slider-pr-mr" ).slider( "value" ) );
  $("#slider-pr-ml").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pr-ml").val(ui.value);
    },
    stop: function (event, ui) {
      setPsRear();
    }
  });
  //$( "#pr-ml" ).val(( "#slider-pr-ml" ).slider( "value" ) );
  $("#slider-pr-l").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pr-l").val(ui.value);
    },
    stop: function (event, ui) {
      setPsRear();
    }
  });
  //$( "#pr-l" ).val(( "#slider-pr-l" ).slider( "value" ) );
  $("#slider-pr-ol").slider({
    range: "min",
    value: 255,
    min: 10,
    max: 255,
    slide: function (event, ui) {
      $("#pr-ol").val(ui.value);
    },
    stop: function (event, ui) {
      setPsRear();
    }
  });
  $("#slider-da-x").slider({
    range: "min",
    value: 0,
    min: 0,
    max: 100,
    step: 0.1,
    slide: function (event, ui) {
      $("#da-x").val(ui.value);
    },
    stop: function (event, ui) {
      setDeviceMotion();
    }
  });
  $("#slider-da-y").slider({
    range: "min",
    value: 0,
    min: 0,
    max: 100,
    step: 0.1,
    slide: function (event, ui) {
      $("#da-y").val(ui.value);
    },
    stop: function (event, ui) {
      setDeviceMotion();
    }
  });
  $("#slider-da-z").slider({
    range: "min",
    value: 0,
    min: 0,
    max: 100,
    step: 0.1,
    slide: function (event, ui) {
      $("#da-z").val(ui.value);
    },
    stop: function (event, ui) {
      setDeviceMotion();
    }
  });
  //$( "#pr-ol" ).val(( "#slider-pr-ol" ).slider( "value" ) );

  //---------Window Data-----------
  $("#slider-wd-d").slider({
    range: "min",
    value: 0,
    min: 1,
    max: 100,
    slide: function (event, ui) {
      $("#wd-d").val(ui.value);
    },
    stop: function (event, ui) {
      setWindowData();
    }
  });

  $("#slider-wd-fp").slider({
    range: "min",
    value: 0,
    min: 1,
    max: 100,
    slide: function (event, ui) {
      $("#wd-fp").val(ui.value);
    },
    stop: function (event, ui) {
      setWindowData();
    }
  }); 

  $("#slider-wd-bd").slider({
    range: "min",
    value: 0,
    min: 1,
    max: 100,
    slide: function (event, ui) {
      $("#wd-bd").val(ui.value);
    },
    stop: function (event, ui) {
      setWindowData();
    }
  });

  $("#slider-wd-bp").slider({
    range: "min",
    value: 0,
    min: 1,
    max: 100,
    slide: function (event, ui) {
      $("#wd-bp").val(ui.value);
    },
    stop: function (event, ui) {
      setWindowData();
    }
  }); 
 //---------Climate Data-----------
  $("#slider-call-vl").slider({
    range: "min",
    value: 0,
    min: 1,
    max: 9,
    slide: function (event, ui) {
      $("#call-vl").val(ui.value);
    },
    stop: function (event, ui) {
      setClimateAllData();
    }
  });

  $("#slider-cd-vl").slider({
    range: "min",
    value: 0,
    min: 1,
    max: 9,
    slide: function (event, ui) {
      $("#cd-vl").val(ui.value);
    },
    stop: function (event, ui) {
      setClimateDriverData();
    }
  });

  $("#slider-cfp-vl").slider({
    range: "min",
    value: 0,
    min: 1,
    max: 9,
    slide: function (event, ui) {
      $("#cfp-vl").val(ui.value);
    },
    stop: function (event, ui) {
      setClimateFrontPassengerData();
    }
  });

  $("#slider-cbd-vl").slider({
    range: "min",
    value: 0,
    min: 1,
    max: 9,
    slide: function (event, ui) {
      $("#cbd-vl").val(ui.value);
    },
    stop: function (event, ui) {
      setClimateBehindDriverData();
    }
  });
 
  $("#slider-cbp-vl").slider({
    range: "min",
    value: 0,
    min: 1,
    max: 9,
    slide: function (event, ui) {
      $("#cbp-vl").val(ui.value);
    },
    stop: function (event, ui) {
      setClimateBehindPassengerData();
    }
  });
 //----------------------------------

  if (navigator.geolocation) {
    $('#myLocation').removeAttr('disabled');
  }
  $('#inputGear').change(function () {
    now.setGear($('#inputGear').val());
  });
  $('#pr-or').change(function () {
    setPsRear();
  });
  $('#pr-r').change(function () {
    setPsRear();
  });
  $('#pr-mr').change(function () {
    setPsRear();
  });
  $('#pr-ml').change(function () {
    setPsRear();
  });
  $('#pr-l').change(function () {
    setPsRear();
  });
  $('#pr-ol').change(function () {
    setPsRear();
  });
  $('#pf-or').change(function () {
    setPsFront();
  });
  $('#pf-r').change(function () {
    setPsFront();
  });
  $('#pf-mr').change(function () {
    setPsFront();
  });
  $('#pf-ml').change(function () {
    setPsFront();
  });
  $('#pf-l').change(function () {
    setPsFront();
  });
  $('#pf-ol').change(function () {
    setPsFront();
  });
  $('input[id*="tc-"]').change(function () {
    setTripComputer();
  });
  $('#setTripComputer').click(function () {
    setTripComputer();
  });
  //-------Door Data-------
  $('input[id*="dd-"]').change(function () {
    setDoorData();
  });
  $('#setDoorData').click(function () {
    setDoorData();
  });
  //-------Window Data------
  $('#wd-d').change(function () {
    setWindowData();
  });
  $('#wd-fp').change(function () {
    setWindowData();
  });
  $('#wd-bd').change(function () {
    setWindowData();
  });
  $('#wd-bp').change(function () {
    setWindowData();
  });  
  //--------Wiper Data--------
  $('#ws-p').change(function () {
    setWiperData();
  });
  //--------Engine Oil Data---
  $('#eo-l').change(function () {
    setEngineOilData();
  });
  //--------Interfaces Data-----
  $('#id-fl').change(function () {
    setInterfacesData();
  });
  $('#id-hd').change(function () {
    setInterfacesData();
  });
  $('#id-sw').change(function () {
    setInterfacesData();
  });
  $('#id-vt').change(function () {
    setInterfacesData();
  });  
  //--------Seat Data----------
  $('#sd-d').change(function () {
    setSeatDriverData();
  });
  $('#sfp-fp').change(function () {
    setSeatFrontPassengerData();
  });
  $('#sbd-bd').change(function () {
    setSeatBehindDriverData();
  });
  $('#sbp-bp').change(function () {
    setSeatBehindPassengerData();
  });
  //-------Tire Pressure Data------
  $('#tp-fl').change(function () {
    setTirePressureData();
  });
  $('#tp-fr').change(function () {
    setTirePressureData();
  });
  $('#tp-rl').change(function () {
    setTirePressureData();
  });
  $('#tp-rr').change(function () {
    setTirePressureData();
  });  
  //-------Climate Control Data------
  $('#call-dt').change(function () {
    setClimateAllData();
  });
  $('#call-ac').change(function () {
    setClimateAllData();
  });
  $('#call-vl').change(function () {
    setClimateAllData();
  });
  $('#call-vm').change(function () {
    setClimateAllData();
  });
  $('#cd-dt').change(function () {
    setClimateDriverData();
  });
  $('#cd-ac').change(function () {
    setClimateDriverData();
  });
  $('#cd-vl').change(function () {
    setClimateDriverData();
  });
  $('#cd-vm').change(function () {
    setClimateDriverData();
  });
  $('#cfp-dt').change(function () {
    setClimateFrontPassengerData();
  });
  $('#cfp-ac').change(function () {
    setClimateFrontPassengerData();
  });
  $('#cfp-vl').change(function () {
    setClimateFrontPassengerData();
  });
  $('#cfp-vm').change(function () {
    setClimateFrontPassengerData();
  });
  $('#cbd-dt').change(function () {
    setClimateBehindDriverData();
  });
  $('#cbd-ac').change(function () {
    setClimateBehindDriverData();
  });
  $('#cbd-vl').change(function () {
    setClimateBehindDriverData();
  });
  $('#cbd-vm').change(function () {
    setClimateBehindDriverData();
  });
  $('#cbp-dt').change(function () {
    setClimateBehindPassengerData();
  }); 
  $('#cbp-ac').change(function () {
    setClimateBehindPassengerData();
  });  
  $('#cbp-vl').change(function () {
    setClimateBehindPassengerData();
  });  
  $('#cbp-vm').change(function () {
    setClimateBehindPassengerData();
  });   
  //---------Park Sensor-------
  $('#setPsFront').click(function () {
    setPsFront();
  });
  $('#setPsRear').click(function () {
    setPsRear();
  });
  $('#setDeviceMotion').click(function () {
    setDeviceMotion();
  });
  $('#l-fog-front').bind('click', function () {
    now.setLightsFogFront($('#l-fog-front').is(':checked'));
  });
  $('#l-fog-rear').bind('click', function () {
    now.setLightsFogRear($('#l-fog-rear').is(':checked'));
  });
  $('#l-hibeam').bind('click', function () {
    now.setLightsHibeam($('#l-hibeam').is(':checked'));
  });
  $('#l-parking').bind('click', function () {
    now.setLightsParking($('#l-parking').is(':checked'));
  });
  $('#l-head').bind('click', function () {
    now.setLightsHead($('#l-head').is(':checked'));
  });
  $('#l-signal-left').bind('click', function () {
    now.setLightsSignalLeft($('#l-signal-left').is(':checked'));
  });
  $('#l-signal-right').bind('click', function () {
    now.setLightsSignalRight($('#l-signal-right').is(':checked'));
  });
  $('#l-signal-warn').bind('click', function () {
    now.setLightsSignalWarn($('#l-signal-warn').is(':checked'));
  });
  $('#locateOnMap').click(function () {
    var address = $('#d-street').val() + " " + $('d-streetnumber').val() + ", " + $('#d-city').val() + ", " + $('#d-country').val();
    geocoder.geocode({
      'address': address
    }, handleGeocoder);
  });
  $('#setDestinationReached').click(function () {
    now.setDestinationReached(getAdressData());
  });
  $('#setDestinationCancelled').click(function () {
    now.setDestinationCancelled(getAdressData());
  });
  $('#setDestinationChanged').click(function () {
    now.setDestinationChanged(getAdressData());
  });
  $('#setLocation').click(function () {
    setGeolocation();
  });
  $('#c-alt').bind('change', function () {
    setGeolocation();
  });
  $('#c-speed').bind('change', function () {
    setGeolocation();
  });
  $('#c-heading').bind('change', function () {
    setGeolocation();
  });

  function getAdressData() {
    var data = new Object();
    data.street = $('#d-street').val();
    data.streetnumber = $('#d-streetnumber').val();
    data.country = $('#d-country').val();
    data.city = $('#d-city').val();
    data.postalcode = $('#d-postalcode').val();
    data.premises = $('#d-premises').val();
    data.region = $('#d-region').val();
    data.county = $('#d-county').val();
    data.additionals = '';
    return data;
  }
  $('#myLocation').click(function () {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);

    function successFunction(pos) {
      console.log(pos);
      position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      marker.setPosition(position);
      map.setCenter(position);
      $('#c-lat').val(position.lat());
      $('#c-lng').val(position.lng());
      geocoder.geocode({
        'latLng': position
      }, handleReversedGeocoder);
    }

    function errorFunction(position) {
      alert('Error!');
    }
  });
  initializeMap();
});
var centerPoint = new google.maps.LatLng(41.38765942141657, 2.1694680888855373);
var markerPoint = new google.maps.LatLng(41.38765942141657, 2.1694680888855373);
var marker;
var position;
var map;
var geocoder;

function initializeMap() {
  var mapOptions = {
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: centerPoint
  };
  $('#c-lng').val(markerPoint.lng());
  $('#c-lat').val(markerPoint.lat());
  map = new google.maps.Map(document.getElementById("map_canvas"),
  mapOptions);
  geocoder = new google.maps.Geocoder();
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: markerPoint
  });
  google.maps.event.addListener(marker, 'dragend', handleNewPosition);
}

function handleNewPosition() {
  position = marker.getPosition();
  $('#c-lat').val(position.lat());
  $('#c-lng').val(position.lng());
  geocoder.geocode({
    'latLng': position
  }, handleReversedGeocoder);
}

function setGeolocation() {
  var position = new Object();
  position.coords = new Object();
  position.coords.latitude = $('#c-lat').val();
  position.coords.longitude = $('#c-lng').val();
  position.coords.accuracy = 99;
  position.coords.heading = $('#c-heading').val();
  position.coords.speed = $('#c-speed').val();
  position.coords.altitude = $('#c-alt').val();
  now.setGeolocation(position);
}

function setPsFront() {
  var psData = new Object();
  psData.ol = $('#pf-ol').val();
  psData.l = $('#pf-l').val();
  psData.ml = $('#pf-ml').val();
  psData.mr = $('#pf-mr').val();
  psData.r = $('#pf-r').val();
  psData.or = $('#pf-or').val();
  now.setPsFront(psData);
}

function setPsRear() {
  var psData = new Object();
  psData.ol = $('#pr-ol').val();
  psData.l = $('#pr-l').val();
  psData.ml = $('#pr-ml').val();
  psData.mr = $('#pr-mr').val();
  psData.r = $('#pr-r').val();
  psData.or = $('#pr-or').val();
  now.setPsRear(psData);
}

function setDeviceMotion() {
  var dmData = new Object();
  dmData.acceleration = new Object();
  dmData.acceleration.x = $('#da-x').val();
  dmData.acceleration.y = $('#da-y').val();
  dmData.acceleration.z = $('#da-z').val();
  dmData.rotationRate = new Object();
  dmData.rotationRate.alpha = $('#da-ra').val();
  dmData.rotationRate.beta = $('#da-rb').val();;
  dmData.rotationRate.gamma = $('#da-rg').val();;
  dmData.interval = $('#da-i').val();
  now.setMotion(dmData);
}

function setTripComputer() {
  var tcData = new Object();
  tcData.c1 = $('#tc-c1').val();
  tcData.c2 = $('#tc-c2').val();
  tcData.s1 = $('#tc-s1').val();
  tcData.s2 = $('#tc-s2').val();
  tcData.d = $('#tc-d').val();
  tcData.m = $('#tc-m').val();
  tcData.r = $('#tc-r').val();
  now.setTripComputer(tcData);
}

//----------Door Data----------
function setDoorData() {
  var ddData = new Object();
  ddData.d = $('#dd-d').val();
  ddData.fp = $('#dd-fp').val();
  ddData.bd = $('#dd-bd').val();
  ddData.bp = $('#dd-bp').val();
  ddData.td = $('#dd-td').val();
  now.setDoorData(ddData);
}

//-----------Window Data--------
function setWindowData() {
  var wdData = new Object();
  wdData.d = $('#wd-d').val();
  wdData.fp = $('#wd-fp').val();
  wdData.bd = $('#wd-bd').val();
  wdData.bp = $('#wd-bp').val();
  now.setWindowData(wdData);
}

//------------Wiper Data----------
function setWiperData() {
  var wsData = new Object();
  wsData.p = $('#ws-p').val();
  now.setWiperData(wsData);
}

//------------Engine Oil Data------
function setEngineOilData() {
  var eoData = new Object();
  eoData.l = $('#eo-l').val();
  now.setEngineOilData(eoData);
}

//------------Interfaces Data--------
function setInterfacesData() {
  var idData = new Object();
  idData.fl = $('#id-fl').val();
  idData.hd = $('#id-hd').val();
  idData.sw = $('#id-sw').val();
  idData.vt = $('#id-vt').val();
  now.setInterfacesData(idData);
}

//------------Seat Data-------------
function setSeatDriverData() {
  var sdData = new Object();
  sdData.d = $('#sd-d').val();
  now.setSeatDriverData(sdData);
}

function setSeatFrontPassengerData() {
  var sfpData = new Object();
  sfpData.fp = $('#sfp-fp').val();
  now.setSeatFrontPassengerData(sfpData);
}

function setSeatBehindDriverData() {
  var sbdData = new Object();
  sbdData.bd = $('#sbd-bd').val();
  now.setSeatBehindDriverData(sbdData);
}

function setSeatBehindPassengerData() {
  var sbpData = new Object();
  sbpData.bp = $('#sbp-bp').val();
  now.setSeatBehindPassengerData(sbpData);
}

//-----------Tire Pressure Data--------
function setTirePressureData() {
  var tpData = new Object();
  tpData.fl = $('#tp-fl').val();
  tpData.fr = $('#tp-fr').val();
  tpData.rl = $('#tp-rl').val();
  tpData.rr = $('#tp-rr').val();
  now.setTirePressureData(tpData);
}

//------------Climate Control Data-------------
function setClimateAllData() {
  var callData = new Object();
  callData.dt = $('#call-dt').val();
  callData.ac = $('#call-ac').val();
  callData.vl = $('#call-vl').val();
  callData.vm = $('#call-vm').val();
  now.setClimateAllData(callData);
}

function setClimateDriverData() {
  var cdData = new Object();
  cdData.dt = $('#cd-dt').val();
  cdData.ac = $('#cd-ac').val();
  cdData.vl = $('#cd-vl').val();
  cdData.vm = $('#cd-vm').val();
  now.setClimateDriverData(cdData);
}

function setClimateFrontPassengerData() {
  var cfpData = new Object();
  cfpData.dt = $('#cfp-dt').val();
  cfpData.ac = $('#cfp-ac').val();
  cfpData.vl = $('#cfp-vl').val();
  cfpData.vm = $('#cfp-vm').val();
  now.setClimateFrontPassengerData(cfpData);
}

function setClimateBehindDriverData() {
  var cbdData = new Object();
  cbdData.dt = $('#cbd-dt').val();
  cbdData.ac = $('#cbd-ac').val();
  cbdData.vl = $('#cbd-vl').val();
  cbdData.vm = $('#cbd-vm').val();
  now.setClimateBehindDriverData(cbdData);
}

function setClimateBehindPassengerData() {
  var cbpData = new Object();
  cbpData.dt = $('#cbp-dt').val();
  cbpData.ac = $('#cbp-ac').val();
  cbpData.vl = $('#cbp-vl').val();
  cbpData.vm = $('#cbp-vm').val();
  now.setClimateBehindPassengerData(cbpData);
}

function updateAddress(address) {
  for (var i = 0; i < address.address_components.length; i++) {
    var component = address.address_components[i];
    switch (component.types[0]) {
      case 'street_number':
        $('#d-streetnumber').val(component.long_name);
        break;
      case 'route':
        $('#d-street').val(component.long_name);
        break;
      case 'country':
        $('#d-country').val(component.long_name);
        break;
      case 'postal_code':
        $('#d-postalcode').val(component.long_name);
        break;
      case 'postal_code':
        $('#d-postalcode').val(component.long_name);
        break;
      case 'administrative_area_level_1':
        //STATES
        $('#d-region').val(component.long_name);
        break;
      case 'administrative_area_level_3':
        //COUNTIES				
        $('#d-county').val(component.long_name);
        break;
      case 'administrative_area_level_2':
        //COUNTIES				
        $('#d-county').val(component.long_name);
        break;
      case 'locality':
        //CITY				
        $('#d-city').val(component.long_name);
        break;
      case 'premise':
        //COUNTIES				
        $('#d-premises').val(component.long_name);
        break;
    }
  }
}

function handleReversedGeocoder(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    if (results[0]) {
      var position = new Object();
      position.coords = new Object();
      position.coords.latitude = results[0].geometry.location.lat()
      position.coords.longitude = results[0].geometry.location.lng();
      position.coords.altitude = $('#c-alt').val();
      position.coords.accuracy = 99;
      position.coords.heading = $('#c-heading').val();
      position.coords.speed = $('#c-speed').val();
      now.setGeolocation(position);
      updateAddress(results[0]);
    }
  } else {
    alert("Geocoder failed due to: " + status);
  }
}

function handleGeocoder(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    if (results[0]) {
      updateAddress(results[0]);
      centerPoint = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      map.setCenter(centerPoint);
      marker.setPosition(centerPoint);
      $('#c-lat').val(centerPoint.lat());
      $('#c-lng').val(centerPoint.lng());
      var position = new Object();
      position.coords = new Object();
      position.coords.latitude = results[0].geometry.location.lat()
      position.coords.longitude = results[0].geometry.location.lng();
      position.coords.altitude = $('#c-alt').val();
      position.coords.accuracy = 99;
      position.coords.heading = $('#c-heading').val();
      position.coords.speed = $('#c-speed').val();
      now.setGeolocation(position);
    }
  } else {
    alert("Geocoder failed due to: " + status);
  }
}

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
(function () {

    // rpcHandler set be setRPCHandler
    var rpcHandler = null;
    var vs;

    function gearEvent(value) {
        this.gear = value;
    }

    function TripComputerEvent(avgCon1, avgCon2, avgSpeed1, avgSpeed2, tripDistance, mileage, range) {
        this.averageConsumption = avgCon1;
        this.tripConsumption = avgCon2;
        this.averageSpeed = avgSpeed1;
        this.tripSpeed = avgSpeed2;
        this.tripDistance = tripDistance;
        this.mileage = mileage;
        this.range = range;
    }

    //Door Data
     function DoorDataEvent(driver, frontpassenger, behinddriver, behindpassenger, trunkdeck) {
        this.driver = driver;
        this.frontpassenger = frontpassenger;
        this.behinddriver = behinddriver;
        this.behindpassenger = behindpassenger;
        this.trunkdeck = trunkdeck;
     }
    
    //------Window Data------
    function WindowDataEvent(driver, frontpassenger, behinddriver, behindpassenger) {
        this.driver = driver;
        this.frontpassenger = frontpassenger;
        this.behinddriver = behinddriver;
        this.behindpassenger = behindpassenger;
     }
  
    //------Wiper Data------
    function WiperDataEvent(status) {
        this.status = status;
     }

    //------Engine Oil Data------
    function EngineOilDataEvent(level) {
        this.level = level;
     }

     //------Interfaces Data------
    function InterfacesDataEvent(fuel, hybrid, steeringwheel, vehicletransmission) {
        this.fuel = fuel;
        this.hybrid = hybrid;
        this.steeringwheel = steeringwheel;
        this.vehicletransmission = vehicletransmission;
     }

    //------seat Data------
    function SeatDriverDataEvent(seatdriver) {
        this.seatdriver = seatdriver;
     }
    
    function SeatFrontPassengerDataEvent(seatfrontpassenger) {
        this.seatfrontpassenger = seatfrontpassenger;
     }

    function SeatBehindDriverDataEvent(seatbehinddriver) {
        this.seatbehinddriver = seatdriver;
     }

    function SeatBehindPassengerDataEvent(seatbehindpassenger) {
        this.seatbehindpassenger = seatbehindpassenger;
     }

    //------Tire Pressure Data------
    function TirePressureDataEvent(frontleft, frontright, rearleft, rearright) {
        this.frontleft = frontleft;
        this.frontright = frontright;
        this.rearleft = rearleft;
        this.rearright = rearright;
     }

    //------Climate Data------
    function ClimateAllDataEvent(calltemp, callac, callvl, callvm) {
        this.calltemp = calltemp;
        this.callac = callac;
        this.callvl = callvl;
        this.callvm = callvm;
     }    

    function ClimateDriverDataEvent(cdtemp, cdac, cdvl, cdvm) {
        this.cdtemp = cdtemp;
        this.cdac = cdac;
        this.cdvl = cdvl;
        this.cdvm = cdvm;
     }
    
    function ClimateFrontPassengerDataEvent(cfptemp, cfpac, cfpvl, cfpvm) {
        this.cfptemp = cfptemp;
        this.cfpac = cfpac;
        this.cfpvl = cfpvl;
        this.cfpvm = cfpvm;
     }

    function ClimateBehindDriverDataEvent(cbdtemp, cbdac, cbdvl, cbdvm) {
        this.cbdtemp = cbdtemp;
        this.cbdac = cbdac;
        this.cbdvl = cbdvl;
        this.cbdvm = cbdvm;
     }

    function ClimateBehindPassengerDataEvent(cbptemp, cbpac, cbpvl, cbpvm) {
        this.cbptemp = cbptemp;
        this.cbpac = cbpac;
        this.cbpvl = cbpvl;
        this.cbpvm = cbpvm;
     }
    
    //Navigation Event - Destination Reached, Destination Changed, Destination Cancelled
    function NavigationEvent(type, address) {
        this.type = type;
        this.address = address;
    }

    function Address(contry, region, county, city, street, streetNumber, premises, addtionalInformation, postalCode) {
        this.country = country;
        this.region = region;
        this.county = county;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
        this.premises = premises;
        this.additionalInformation = additionalInformation;
        this.postalCode = postalCode;
    }

    function ParkSensorEvent(position, outLeft, left, midLeft, midRight, right, outRight) {
        this.position = position;
        this.left = left;
        this.midLeft = midLeft;
        this.midRight = midRight;
        this.right = right;
        this.outRight = outRight;
        this.outLeft = outLeft;
    }

    /*function ClimateControlEvent(zone, desiredTemperature, acstatus, ventLevel, ventMode) {
        this.zone = zone;
        this.desiredTemperature = desiredTemperature;
        this.acstatus = acstatus;
        this.ventLevel = ventLevel;
        this.ventMode = ventMode;
    }

    function ControlEvent(controlId, active) {
        this.controlId = controlId;
        this.active = active;
    }*/

    function VehicleError(message) {
        this.message = message;
    }

    function get(vehicleDataId, vehicleDataHandler, errorCB) {
        switch (vehicleDataId[0]) {
            case "gear":
                vehicleDataHandler(vs.get('gear'));
                break;
            case "tripcomputer":
                vehicleDataHandler(vs.get('tripcomputer'));
                break;
            case "parksensors-front":
                vehicleDataHandler(vs.get('parksensors-front'));
                break;
            case "parksensors-rear":
                vehicleDataHandler(vs.get('parksensors-rear'));
                break;
            case "tirepressure":
                vehicleDataHandler(vs.get('tirepressure'));
                break;
            case "climateall":
                vehicleDataHandler(vs.get('climateall'));
                break;
            case "climatedriver":
                vehicleDataHandler(vs.get('climatedriver'));
                break;
            case "climatefrontpassenger":
                vehicleDataHandler(vs.get('climatefrontpassenger'));
                break;
            case "climatebehinddriver":
                vehicleDataHandler(vs.get('climatebehinddriver'));
                break;
            case "climatebehindpassenger":
                vehicleDataHandler(vs.get('climatebehindpassenger'));
                break;
            case "lights-fog-front":
                vehicleDataHandler(vs.get(vehicleDataId[0]));
                break;
            case "lights-fog-rear":
                vehicleDataHandler(vs.get(vehicleDataId[0]));
                break;
            case "lights-signal-left":
                vehicleDataHandler(vs.get(vehicleDataId[0]));
                break;
            case "lights-signal-right":
                vehicleDataHandler(vs.get(vehicleDataId[0]));
                break;
            case "lights-signal-warn":
                vehicleDataHandler(vs.get(vehicleDataId[0]));
                break;
            case "lights-parking":
                vehicleDataHandler(vs.get(vehicleDataId[0]));
                break;
            case "lights-hibeam":
                vehicleDataHandler(vs.get(vehicleDataId[0]));
                break;
            case "lights-head":
                vehicleDataHandler(vs.get(vehicleDataId[0]));
                break;
            case "wiper":
                vehicleDataHandler(vs.get('wiper'));
                break;
            case "door":
                vehicleDataHandler(vs.get('door'));
                break;
            case "window":
                vehicleDataHandler(vs.get('window'));
                break;
            case "engineoil":
                vehicleDataHandler(vs.get('engineoil'));
                break;
            case "interfaces":
                vehicleDataHandler(vs.get('interfaces'));
                break;
            case "seatdriver":
                vehicleDataHandler(vs.get('seatdriver'));
                break;
            case "seatfrontpassenger":
                vehicleDataHandler(vs.get('seatfrontpassenger'));
                break;
            case "seatbehinddriver":
                vehicleDataHandler(vs.get('seatbehinddriver'));
                break;
            case "seatbehindpassenger":
                vehicleDataHandler(vs.get('seatbehindpassenger'));
                break;
            default:
                errorCB(new VehicleError(vehicleDataId[0] + ' not supported on this service implementation.'));
        }
    }

    //Objects references for handling EventListeners
    var objectRefs = new Array();
    var listeners = [];

    //BOOLs for handling listeners (are there active listeners)
    var listeningToGear = false;
    var listeningToTripComputer = false;
    var listeningToDoorData = false;
    var listeningToParkSensorsFront = false;
    var listeningToParkSensorsRear = false;
    var listeningToDestinationReached = false;
    var listeningToDestinationChanged = false;
    var listeningToDestinationCancelled = false;
    var listeningToTirePressure = false;
    var listeningToClimateAllData = false;
    var listeningToClimateDriverData = false;
    var listeningToClimateFrontPassengerData = false;
    var listeningToClimateBehindDriverData = false;
    var listeningToClimateBehindPassengerData = false;

    var listeningToLightsFogFront = false;
    var listeningToLightsFogRear = false;
    var listeningToLightsSignalLeft = false;
    var listeningToLightsSignalRight = false;
    var listeningToLightsSignalWarn = false;
    var listeningToLightsParking = false;
    var listeningToLightsHibeam = false;
    var listeningToLightsHead = false;

    var listeningToWiperData = false;
   // var listeningToDoor = false;
    var listeningToWindowData = false;
    var listeningToEngineOilData = false;
    var listeningToInterfacesData = false;
    var listeningToSeatDriverData = false;
    var listeningToSeatFrontPassengerData = false;
    var listeningToSeatBehindDriverData = false;
    var listeningToSeatBehindPassengerData = false;

    /*AddEventListener*/
    addEventListener = function (vehicleDataId, successHandler, errorHandler, objectRef) {
        var supported = false;
        switch (vehicleDataId) {
            case "gear":
                supported = true;
                if (!listeningToGear) { //Listener for gears not yet registered
                    listeningToGear = true;
                    console.log('now listening');
                }
                break;
            case "tripcomputer":
                supported = true;
                if (!listeningToTripComputer) {
                    listeningToTripComputer = true;
                }
                break;
            case "tirepressure":
                supported = true;
                if (!listeningToTirePressure) {
                    listeningToTirePressure = true;
                }
                break;
            case "door":
                supported = true;
                if (!listeningToDoorData) {
                    listeningToDoorData = true;
                }
                break;
            case "window":
                supported = true;
                if (!listeningToWindowData) {
                    listeningToWindowData = true;
                }
                break;
            case "parksensors-front":
                supported = true;
                if (!listeningToParkSensorsFront) {
                    listeningToParkSensorsFront = true;
                }
                break;
            case "parksensors-rear":
                supported = true;
                if (!listeningToParkSensorsRear) {
                    listeningToParkSensorsRear = true;
                }
                break;
            case "destination-reached":
                supported = false;
                break;
            case "destination-changed":
                supported = false;
                break;
            case "destination-cancelled":
                supported = false;
                break;
            case "climateall":
                supported = true;
                if (!listeningToClimateAllData) {
                    listeningToClimateAllData = true;
                }
                break;
            case "climatedriver":
                 supported = true;
                if (!listeningToClimateDriverData) {
                    listeningToClimateDriverData = true;
                }
                break;
            case "climatefrontpassenger":
                 supported = true;
                if (!listeningToClimateFrontPassengerData) {
                    listeningToClimateFrontPassengerData = true;
                }
                break;
            case "climatebehinddriver":
                 supported = true;
                if (!listeningToClimateBehindDriverData) {
                    listeningToClimateBehindDriverData = true;
                }
                break;
            case "climatebehindpassenger":
                 supported = true;
                if (!listeningToBehindPassengerData) {
                    listeningToBehindPassengerData = true;
                }
                break;
            case "lights-fog-front":
                supported = false;
                break;
            case "lights-fog-rear":
                supported = false;
                break;
            case "lights-signal-left":
                supported = false;
                break;
            case "lights-signal-right":
                supported = false;
                break;
            case "lights-signal-warn":
                supported = false;
                break;
            case "lights-parking":
                supported = false;
                break;
            case "lights-hibeam":
                supported = false;
                break;
            case "lights-head":
                supported = false;
                break;
            case "wiper":
                supported = true;
                if (!listeningToWiperData) {
                    listeningToWiperData = true;
                }
                break;
            case "engineoil":
                supported = true;
                if (!listeningToEngineOilData) {
                    listeningToEngineOilData = true;
                }
                break;
            case "interfaces":
                supported = true;
                if (!listeningToInterfacesData) {
                    listeningToInterfacesData = true;
                }
                break;
            case "seatdriver":
                supported = true;
                if (!listeningToSeatDriverData) {
                    listeningToSeatDriverData = true;
                }
                break;
            case "seatfrontpassenger":
                supported = true;
                if (!listeningToSeatFrontPassengerData) {
                    listeningToSeatFrontPassengerData = true;
                }
                break;
            case "seatbehinddriver":
                supported = true;
                if (!listeningToSeatBehindDriverData) {
                    listeningToSeatBehindDriverData = true;
                }
                break;
            case "seatbehindpassenger":
                supported = true;
                if (!listeningToSeatBehindPassengerData) {
                    listeningToSeatBehindPassengerData = true;
                }
                break;
            default:
                supported = false;
        }
        if (supported) {
            listeners.push([successHandler, errorHandler, objectRef, vehicleDataId]);
        } else {
            errorHandler(new VehicleError('Listener on ' + vehicleDataId + ' not supported.'));
        }
    }


    /*RemoveEventListener*/
    removeEventListener = function (arguments) {

        // arguments[0] = objectReference, arguments[1] = vehicleDataId
        /*
         * this is inside a listener array:
         * [0]successHandler, [1]errorHandler, [2]objectRef, [3]vehicleDataId
         */
        var registeredListeners = 0;
        for (i = 0; i < listeners.length; i++) {
            if (listeners[i][2][0] == arguments[1]) {
                registeredListeners++;
            }
            if (listeners[i][0] == arguments[0]) {
                listeners.splice(i, 1);
                console.log('object# ' + arguments[1] + " removed.");
            }
        }

        if (registeredListeners <= 1) {
            console.log('disabling listening to ' + arguments[1] + " Events");
            switch (arguments[1]) {
                case "gear":
                    listeningToGear = false;
                    break;
                case "tripcomputer":
                    listeningToTripComputer = false;
                    break;
                case "parksensors-front":
                    listeningToParkSensorsFront = false;
                    break;
                case "parksensors-rear":
                    listeningToParkSensorsFront = false;
                    break;
                case "destination-reached":
                    listeningToDestinationReached = false;
                    break;
                case "destination-changed":
                    listeningToDestinationChanged = false;
                    break;
                case "destination-cancelled":
                    listeningToDestinationCancelled = false;
                    break;
                case "tirepressure":
                    listeningToTirePressure = false;
                    break;
                case "climateall":
                    listeningToClimateAllData = false;
                    break;
                case "climatedriver":
                    listeningToClimateDriverData = false;
                    break;
                case "climatefrontpassenger":
                    listeningToClimateFrontPassengerData = false;
                    break;
                case "climatebehinddriver":
                    listeningToClimateBehindDriverData = false;
                    break;
                case "climatebehindpassenger":
                    listeningToClimateBehindPassenger = false;
                    break;
                case "lights-fog-front":
                    listeningToLightsFogFront = false;
                    break;
                case "lights-fog-rear":
                    listeningToLightsFogRear = false;
                    break;
                case "lights-signal-left":
                    listeningToLightsSignalLeft = false;
                    break;
                case "lights-signal-right":
                    listeningToLightsSignalRight = false;
                    break;
                case "lights-signal-warn":
                    listeningToLightsSignalWarn = false;
                    break;
                case "lights-parking":
                    listeningToLightsParking = false;
                    break;
                case "lights-hibeam":
                    listeningToLightsHibeam = false;
                    break;
                case "lights-head":
                    listeningToLightsHead = false;
                    break;
                case "wiper":
                    listeningToWiperData = false;
                    break;
                case "door":
                    listeningToDoorData = false;
                    break;
                case "window":
                    listeningToWindowData = false;
                    break;
                case "engineoil":
                    listeningToEngineOilData = false;
                    break;
                case "interfaces":
                    listeningToInterfacesData = false;
                    break;
                case "seatdriver":
                    listeningToSeatDriverData = false;
                    break;
                case "seatfrontpassenger":
                    listeningToSeatPassengerData = false;
                    break;
                case "seatbehinddriver":
                    listeningToSeatBehindDriverData = false;
                    break;
                case "seatbehindpassenger":
                    listeningToSeatBehindPassengerData = false;
                    break;
                default:
                    console.log("nothing found");

            }
        }
    }

    /*handlegearEvents*/
    function handleGearEvents(gearE) {
        if (listeningToGear) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'gear') {
                    returnData(gearE, function (gearE) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', gearE);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
            }
        }
    }

    function returnData(data, successCB, errorCB) {
        if (data === undefined) {
            errorCB('Position could not be retrieved');
        } else {
            successCB(data);
        }
    }

    /*handleTripComputerEvents*/
    function handleTripComputerEvents(data) {
        if (listeningToTripComputer) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'tripcomputer') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
            }
        }
    }

    /*handleDoorDataEvents*/
    function handleDoorDataEvents(data) {
        if (listeningToDoorData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'door') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
    }
 
    /*handleWindowDataEvents*/
    function handleWindowDataEvents(data) {
        if (listeningToWindowData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'window') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
    }

    /*handleWiperDataEvents*/
    function handleWiperDataEvents(data) {
        if (listeningToWiperData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'wiper') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
    }

    /*handleEngineOilDataEvents*/
    function handleEngineOilDataEvents(data) {
        if (listeningToEngineOilData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'engineoil') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
    }

    /*handleInterfacesDataEvents*/
    function handleInterfacesDataEvents(data) {
        if (listeningToInterfacesData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'interfaces') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
    }

    /*handleSeatDriverDataEvents*/
    function handleSeatDriverDataEvents(data) {
        if (listeningToSeatDriverData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'seatdriver') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
    }

    /*handleSeatFrontPassengerDataEvents*/
    function handleSeatFrontPassengerDataEvents(data) {
        if (listeningToSeatFrontPassengerData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'seatfrontpassenger') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
     }
   
    /*handleSeatBehindDriverDataEvents*/
    function handleSeatBehindDriverDataEvents(data) {
        if (listeningToSeatBehindDriverData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'seatbehinddriver') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
     }

    /*handleSeatBehindPassengerDataEvents*/
    function handleSeatBehindPassengerDataEvents(data) {
        if (listeningToSeatBehindPassengerData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'seatbehindpassenger') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
     }    

    /*handleTirePressureDataEvents*/
    function handleTirePressureDataEvents(data) {
        if (listeningToTirePressure) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'tirepressure') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
    }    

    /*handleClimateAllDataEvents*/
    function handleClimateAllDataEvents(data) {
        if (listeningToClimateAllData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'climateall') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
    }

    /*handleClimateDriverDataEvents*/
    function handleClimateDriverDataEvents(data) {
        if (listeningToClimateDriverData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'climatedriver') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
    }

    /*handleClimateFrontPassengerDataEvents*/
    function handleClimateFrontPassengerDataEvents(data) {
        if (listeningToClimateFrontPassengerData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'climatefrontpassenger') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
     }
   
    /*handleClimateBehindDriverDataEvents*/
    function handleClimateBehindDriverDataEvents(data) {
        if (listeningToClimateBehindDriverData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'climatebehinddriver') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
     }

    /*handleClimateBehindPassengerDataEvents*/
    function handleClimateBehindPassengerDataEvents(data) {
        if (listeningToClimateBehindPassengerData) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'climatebehindpassenger') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
              }
        }
     }    
     
    /*handleParkSensorsEvent*/
    function handleParkSensorsEvents(data) {
        console.log('handle ps data');
        if (listeningToParkSensorsFront || listeningToParkSensorsRear) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i][3] == 'parksensors-front') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
                if (listeners[i][3] == 'parksensors-rear') {
                    returnData(data, function (data) {
                        var rpc = rpcHandler.createRPC(listeners[i][2], 'onEvent', data);
                        rpcHandler.executeRPC(rpc);
                    }, listeners[i][1], listeners[i][2]);
                }
            }
        }
    }


    function setRPCHandler(rpcHdlr) {
        rpcHandler = rpcHdlr;
    }

    function setRequired(obj) {
        vs = obj;
        vs.addListener('gear', handleGearEvents);
        vs.addListener('tripcomputer', handleTripComputerEvents);
        vs.addListener('parksensors-rear', handleParkSensorsEvents);
        vs.addListener('parksensors-front', handleParkSensorsEvents);
        vs.addListener('door', handleDoorDataEvents);
        vs.addListener('window', handleWindowDataEvents);
        vs.addListener('wiper', handleWiperDataEvents);
        vs.addListener('engineoil', handleEngineOilDataEvents);
        vs.addListener('interfaces', handleInterfacesDataEvents);
        vs.addListener('seatdriver', handleSeatDriverDataEvents);
        vs.addListener('seatfrontpassenger', handleSeatFrontPassengerDataEvents);
        vs.addListener('seatbehinddriver', handleSeatBehindDriverDataEvents);
        vs.addListener('seatbehindpassenger', handleSeatBehindPassengerDataEvents);
        vs.addListener('tirepressure', handleTirePressureDataEvents);
        vs.addListener('climateall', handleClimateAllDataEvents);
        vs.addListener('climatedriver', handleClimateDriverDataEvents);
        vs.addListener('climatefrontpassenger', handleClimateFrontPassengerDataEvents);
        vs.addListener('climatebehinddriver', handleClimateBehindDriverDataEvents);
        vs.addListener('climatebehindpassenger', handleClimateBehindPassengerDataEvents);
    }


    exports.addEventListener = addEventListener;
    exports.removeEventListener = removeEventListener;
    exports.get = get;

    exports.setRPCHandler = setRPCHandler;
    exports.setRequired = setRequired;

    exports.serviceDesc = {
        api: 'http://webinos.org/api/vehicle',
        displayName: 'Vehicle API (Simulator)',
        description: 'Provides data from the vehicle simulator.'
    };

})(module.exports);

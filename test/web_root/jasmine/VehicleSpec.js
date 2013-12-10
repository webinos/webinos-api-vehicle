/*******************************************************************************
 *  Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2012 BMW AG
 * Copyright 2012 TU Munich
 ******************************************************************************/

describe("Vehicle API", function() {
    var vehicleService;
    var boundVehicleService;
    
    webinos.discovery.findServices(new ServiceType("http://webinos.org/api/vehicle"), {
        onFound: function (service) {
            vehicleService = service;
            vehicleService.bindService({onBind: function(service) {
                boundVehicleService = service;
            }});
        }
    });

    beforeEach(function() {
        waitsFor(function() {
            return !!vehicleService;
        }, "The discovery didn't find a Vehicle service", 5000);
        
        waitsFor(function() {
            return !!boundVehicleService;
        }, "The found Vehicle service couldn't be bound", 5000);
    });

    it("should be available from the discovery", function() {
        expect(vehicleService).toBeDefined();
    });

    it("has the necessary properties as service object", function() {
        expect(vehicleService.state).toBeDefined();
        expect(vehicleService.api).toEqual(jasmine.any(String));
        expect(vehicleService.id).toEqual(jasmine.any(String));
        expect(vehicleService.displayName).toEqual(jasmine.any(String));
        expect(vehicleService.description).toEqual(jasmine.any(String));
        expect(vehicleService.icon).toEqual(jasmine.any(String));
        expect(vehicleService.bindService).toEqual(jasmine.any(Function));
    });

    it("can be bound", function() {
        var bound = false;

        vehicleService.bindService({onBind: function(service) {
            vehicleService = service;
            bound = true;
        }});

        waitsFor(function() {
            return bound;
        }, "The service couldn't be bound", 500);

        runs(function() {
            expect(bound).toEqual(true);
        });
    });

    it("has the necessary properties and functions as Vehicle API service", function() {
        expect(boundVehicleService.addEventListener).toEqual(jasmine.any(Function));
        expect(boundVehicleService.removeEventListener).toEqual(jasmine.any(Function));
        expect(boundVehicleService.get).toEqual(jasmine.any(Function));
        
        //currently not implemented functions
     /*   expect(boundVehicleService.brand).toEqual(jasmine.any(String));
        expect(boundVehicleService.model).toEqual(jasmine.any(String));
        expect(boundVehicleService.year).toEqual(jasmine.any(String));
        expect(boundVehicleService.fuel).toEqual(jasmine.any(String));
        expect(boundVehicleService.transmission).toEqual(jasmine.any(String));*/
    });


    
    it("can register and get gear data", function() {
        var shiftEvent = null;
        
        boundVehicleService.get('shift', function(event){ shiftEvent=event;});
        waitsFor(function() {
            return shiftEvent;
        }, "successCallback to be called.", 3000);

        runs(function() {
            expect(shiftEvent).toEqual(jasmine.any(Object));
            expect(shiftEvent.type).toEqual('gear');
            expect(shiftEvent.gear).toEqual(jasmine.any(String));
            expect(shiftEvent.timestamp).toEqual(jasmine.any(Number));
        });
    });
    
    it("can resgister and get trip computer data", function() {
        var evObj = null;
        boundVehicleService.get('tripcomputer', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called.", 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('tripcomputer');
            expect(parseFloat(evObj.averageSpeed1)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.averageSpeed2)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.averageConsumption1)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.averageConsumption2)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.mileage)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.range)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.tripDistance)).toEqual(jasmine.any(Number));
        });
    });


    it("can register and get parksensor data", function() {
        var evObj = null;
        boundVehicleService.get('parksensors-front', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called.", 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('parksensor');
            expect(evObj.position).toEqual('parksensors-front');
            expect(parseFloat(evObj.outLeft)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.left)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.midLeft)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.midRight)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.right)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.outRight)).toEqual(jasmine.any(Number));
            expect(evObj.timestamp).toEqual(jasmine.any(Number));
        });
    });
    
    //not implemented for simulator
    /*it("can get control data (e.g. lights)", function() {
        var evObj = null;
        boundVehicleService.get('lights-fog-front', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)", 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.controlId).toEqual('lights-fog-front');
            expect(evObj.active).toEqual(jasmine.any(Boolean));
        });
    });*/

    //Implemented for simulator
    it("can register and get climate Driver data", function() {
        var evObj = null;
        boundVehicleService.get('climatedriver', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatedriver');
            expect(evObj.cdtemp).toEqual(jasmine.any(Number));
            expect(evObj.cdac).toEqual(jasmine.any(String));
            expect(evObj.cdvl).toEqual(jasmine.any(Number));
            expect(evObj.cdvm).toEqual(jasmine.any(String));
        });
    });


    it("can register and get climate All data", function() {
        var evObj = null;
        boundVehicleService.get('climateall', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climateall');
            expect(evObj.calltemp).toEqual(jasmine.any(Number));
            expect(evObj.callac).toEqual(jasmine.any(String));
            expect(evObj.callvl).toEqual(jasmine.any(Number));
            expect(evObj.callvm).toEqual(jasmine.any(String));
        });
    });  

     it("can register and get climate FrontPassenger data", function() {
        var evObj = null;
        boundVehicleService.get('climatefrontpassenger', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatefrontpassenger');
            expect(evObj.cfptemp).toEqual(jasmine.any(Number));
            expect(evObj.cfpac).toEqual(jasmine.any(String));
            expect(evObj.cfpvl).toEqual(jasmine.any(Number));
            expect(evObj.cfpvm).toEqual(jasmine.any(String));
        });
    });  


     it("can register and get climate BehindDriver data", function() {
        var evObj = null;
        boundVehicleService.get('climatebehinddriver', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatebehinddriver');
            expect(evObj.cbdtemp).toEqual(jasmine.any(Number));
            expect(evObj.cbdac).toEqual(jasmine.any(String));
            expect(evObj.cbdvl).toEqual(jasmine.any(Number));
            expect(evObj.cbdvm).toEqual(jasmine.any(String));
        });
    }); 

     it("can register and get climate BehindPassenger data", function() {
        var evObj = null;
        boundVehicleService.get('climatebehindpassenger', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatebehindpassenger');
            expect(evObj.cbptemp).toEqual(jasmine.any(Number));
            expect(evObj.cbpac).toEqual(jasmine.any(String));
            expect(evObj.cbpvl).toEqual(jasmine.any(Number));
            expect(evObj.cbpvm).toEqual(jasmine.any(String));
        });
    });
    

    it("can register and get Door data", function() {
        var evObj = null;
        boundVehicleService.get('door', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('door');
            expect(evObj.driver).toEqual(jasmine.any(String));
            expect(evObj.frontpassenger).toEqual(jasmine.any(String));
            expect(evObj.behinddriver).toEqual(jasmine.any(String));
            expect(evObj.behindpassenger).toEqual(jasmine.any(String)); 
            expect(evObj.trunkdeck).toEqual(jasmine.any(String)); 
        });
    }); 

    //Implemented for simulator
    it("can register and get Window data", function() {
        var evObj = null;
        boundVehicleService.get('window', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('window');
            expect(evObj.driver).toEqual(jasmine.any(Number));
            expect(evObj.frontpassenger).toEqual(jasmine.any(Number));
            expect(evObj.behinddriver).toEqual(jasmine.any(Number));
            expect(evObj.behindpassenger).toEqual(jasmine.any(Number));  
        });
    });

    //Implemented for simulator
    it("can register and get Tirepressure data", function() {
        var evObj = null;
        boundVehicleService.get('tirepressure', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('tirepressure');
            expect(evObj.frontleft).toEqual(jasmine.any(Number));
            expect(evObj.frontright).toEqual(jasmine.any(Number));
            expect(evObj.rearleft).toEqual(jasmine.any(Number));
            expect(evObj.rearright).toEqual(jasmine.any(Number));
        });
    });

    //Implemented for simulator
    it("can register and get Wiper data", function() {
        var evObj = null;
        boundVehicleService.get('wiper', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('wiper');
            expect(evObj.status).toEqual(jasmine.any(String));
        });
    });

    //Implemented for simulator
    it("can register and get Engine Oil data", function() {
        var evObj = null;
        boundVehicleService.get('engineoil', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('engineoil');
            expect(evObj.level).toEqual(jasmine.any(String));
        });
    });

     //Implemented for simulator
    it("can register and get Interfaces data", function() {
        var evObj = null;
        boundVehicleService.get('interfaces', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('interfaces');
            expect(evObj.fuel).toEqual(jasmine.any(String));
            expect(evObj.hybrid).toEqual(jasmine.any(String));
            expect(evObj.steeringwheel).toEqual(jasmine.any(String));
            expect(evObj.vehicletransmission).toEqual(jasmine.any(String));
        });
    });

     it("can register and get Seat Driver data", function() {
        var evObj = null;
        boundVehicleService.get('seatdriver', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatdriver');
            expect(evObj.seatdriver).toEqual(jasmine.any(String));
        });
    });

    it("can register and get Seat FrontPassenger data", function() {
        var evObj = null;
        boundVehicleService.get('seatfrontpassenger', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatfrontpassenger');
            expect(evObj.seatfrontpassenger).toEqual(jasmine.any(String));
        });
    });

     it("can register and get Seat BehindDriver data", function() {
        var evObj = null;
        boundVehicleService.get('seatbehinddriver', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatbehinddriver');
            expect(evObj.seatbehinddriver).toEqual(jasmine.any(String));
        });
    });

    it("can register and get Seat BehindPassenger data", function() {
        var evObj = null;
        boundVehicleService.get('seatbehindpassenger', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatbehindpassenger');
            expect(evObj.seatbehindpassenger).toEqual(jasmine.any(String));
        });
    });
  
    
    //Adding AddEvent Listeners and Remove Listeners - For Vehicle Data Ids 
    //Works with Simulator and the Testbed, Passes Travis Tests, but Failing with the Jasmine Tests - Maybe due Timeouts

    it("AddListener on climate Driver data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('climatedriver', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatedriver');
            expect(evObj.cdtemp).toEqual(jasmine.any(Number));
            expect(evObj.cdac).toEqual(jasmine.any(String));
            expect(evObj.cdvl).toEqual(jasmine.any(Number));
            expect(evObj.cdvm).toEqual(jasmine.any(String));
        });
    });

     it("RemoveListener on climate Driver data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('climatedriver', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatedriver');
            expect(evObj.cdtemp).toEqual(jasmine.any(Number));
            expect(evObj.cdac).toEqual(jasmine.any(String));
            expect(evObj.cdvl).toEqual(jasmine.any(Number));
            expect(evObj.cdvm).toEqual(jasmine.any(String));
        });
    });


    it("Add Listener on climate All data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('climateall', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climateall');
            expect(evObj.calltemp).toEqual(jasmine.any(Number));
            expect(evObj.callac).toEqual(jasmine.any(String));
            expect(evObj.callvl).toEqual(jasmine.any(Number));
            expect(evObj.callvm).toEqual(jasmine.any(String));
        });
    });  

     it("Remove Listener on climate All data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('climateall', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climateall');
            expect(evObj.calltemp).toEqual(jasmine.any(Number));
            expect(evObj.callac).toEqual(jasmine.any(String));
            expect(evObj.callvl).toEqual(jasmine.any(Number));
            expect(evObj.callvm).toEqual(jasmine.any(String));
        });
    });  

     it("Add Listener on climate FrontPassenger data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('climatefrontpassenger', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatefrontpassenger');
            expect(evObj.cfptemp).toEqual(jasmine.any(Number));
            expect(evObj.cfpac).toEqual(jasmine.any(String));
            expect(evObj.cfpvl).toEqual(jasmine.any(Number));
            expect(evObj.cfpvm).toEqual(jasmine.any(String));
        });
    });  
 
     it("Remove Listener on climate FrontPassenger data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('climatefrontpassenger', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatefrontpassenger');
            expect(evObj.cfptemp).toEqual(jasmine.any(Number));
            expect(evObj.cfpac).toEqual(jasmine.any(String));
            expect(evObj.cfpvl).toEqual(jasmine.any(Number));
            expect(evObj.cfpvm).toEqual(jasmine.any(String));
        });
    });  


     it("Add Listener on climate BehindDriver data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('climatebehinddriver', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatebehinddriver');
            expect(evObj.cbdtemp).toEqual(jasmine.any(Number));
            expect(evObj.cbdac).toEqual(jasmine.any(String));
            expect(evObj.cbdvl).toEqual(jasmine.any(Number));
            expect(evObj.cbdvm).toEqual(jasmine.any(String));
        });
    }); 

      it("Remove Listener on climate BehindDriver data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('climatebehinddriver', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatebehinddriver');
            expect(evObj.cbdtemp).toEqual(jasmine.any(Number));
            expect(evObj.cbdac).toEqual(jasmine.any(String));
            expect(evObj.cbdvl).toEqual(jasmine.any(Number));
            expect(evObj.cbdvm).toEqual(jasmine.any(String));
        });
    }); 

     it("Add Listener on climate BehindPassenger data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('climatebehindpassenger', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatebehindpassenger');
            expect(evObj.cbptemp).toEqual(jasmine.any(Number));
            expect(evObj.cbpac).toEqual(jasmine.any(String));
            expect(evObj.cbpvl).toEqual(jasmine.any(Number));
            expect(evObj.cbpvm).toEqual(jasmine.any(String));
        });
    });

      it("Remove Listener on climate BehindPassenger data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('climatebehindpassenger', function(event){ evObj=event;});
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called. (not implemented)" , 3000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('climatebehindpassenger');
            expect(evObj.cbptemp).toEqual(jasmine.any(Number));
            expect(evObj.cbpac).toEqual(jasmine.any(String));
            expect(evObj.cbpvl).toEqual(jasmine.any(Number));
            expect(evObj.cbpvm).toEqual(jasmine.any(String));
        });
    });
    
      it("Add Listener on Door data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('door', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('door');
            expect(evObj.driver).toEqual(jasmine.any(Boolean));
            expect(evObj.frontpassenger).toEqual(jasmine.any(Boolean));
            expect(evObj.behinddriver).toEqual(jasmine.any(Boolean));
            expect(evObj.behindpassenger).toEqual(jasmine.any(Boolean)); 
            expect(evObj.trunkdeck).toEqual(jasmine.any(Boolean)); 
        });
    }); 
     
      it("Remove Listener on Door data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('door', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('door');
            expect(evObj.driver).toEqual(jasmine.any(Boolean));
            expect(evObj.frontpassenger).toEqual(jasmine.any(Boolean));
            expect(evObj.behinddriver).toEqual(jasmine.any(Boolean));
            expect(evObj.behindpassenger).toEqual(jasmine.any(Boolean)); 
            expect(evObj.trunkdeck).toEqual(jasmine.any(Boolean)); 
        });
    }); 

      it("Add Listener on Window data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('window', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 50000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('window');
            expect(evObj.driver).toEqual(jasmine.any(Number));
            expect(evObj.frontpassenger).toEqual(jasmine.any(Number));
            expect(evObj.behinddriver).toEqual(jasmine.any(Number));
            expect(evObj.behindpassenger).toEqual(jasmine.any(Number));  
        });
    });

      it("Remove Listener on Window data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('window', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 50000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('window');
            expect(evObj.driver).toEqual(jasmine.any(Number));
            expect(evObj.frontpassenger).toEqual(jasmine.any(Number));
            expect(evObj.behinddriver).toEqual(jasmine.any(Number));
            expect(evObj.behindpassenger).toEqual(jasmine.any(Number));  
        });
    });

      it("Add Listener on Tirepressure data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('tirepressure', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('tirepressure');
            expect(evObj.frontleft).toEqual(jasmine.any(Number));
            expect(evObj.frontright).toEqual(jasmine.any(Number));
            expect(evObj.rearleft).toEqual(jasmine.any(Number));
            expect(evObj.rearright).toEqual(jasmine.any(Number));
        });
    });

     it("Remove Listener on Tirepressure data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('tirepressure', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('tirepressure');
            expect(evObj.frontleft).toEqual(jasmine.any(Number));
            expect(evObj.frontright).toEqual(jasmine.any(Number));
            expect(evObj.rearleft).toEqual(jasmine.any(Number));
            expect(evObj.rearright).toEqual(jasmine.any(Number));
        });
    });

    //Implemented for simulator
     it("Add Listener on Wiper data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('wiper', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('wiper');
            expect(evObj.status).toEqual(jasmine.any(String));
        });
    });

     it("Remove Listener on Wiper data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('wiper', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('wiper');
            expect(evObj.status).toEqual(jasmine.any(String));
        });
    });

    //Implemented for simulator
     it("Add Listener on Engine Oil data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('engineoil', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('engineoil');
            expect(evObj.level).toEqual(jasmine.any(String));
        });
    });

      it("Remove Listener on Engine Oil data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('engineoil', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('engineoil');
            expect(evObj.level).toEqual(jasmine.any(String));
        });
    });

     it("Add Listener on Interfaces data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('interfaces', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('interfaces');
            expect(evObj.fuel).toEqual(jasmine.any(String));
            expect(evObj.hybrid).toEqual(jasmine.any(String));
            expect(evObj.steeringwheel).toEqual(jasmine.any(String));
            expect(evObj.vehicletransmission).toEqual(jasmine.any(String));
        });
    });

     it("Remove Listener on Interfaces data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('interfaces', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('interfaces');
            expect(evObj.fuel).toEqual(jasmine.any(String));
            expect(evObj.hybrid).toEqual(jasmine.any(String));
            expect(evObj.steeringwheel).toEqual(jasmine.any(String));
            expect(evObj.vehicletransmission).toEqual(jasmine.any(String));
        });
    });


     it("Add Listener on Seat Driver data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('seatdriver', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatdriver');
            expect(evObj.seatdriver).toEqual(jasmine.any(String));
        });
    });

     it("Remove Listener on Seat Driver data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('seatdriver', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatdriver');
            expect(evObj.seatdriver).toEqual(jasmine.any(String));
        });
    });


    it("Add Listener on Seat FrontPassenger data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('seatfrontpassenger', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatfrontpassenger');
            expect(evObj.seatfrontpassenger).toEqual(jasmine.any(String));
        });
    });

     it("Remove Listener on Seat FrontPassenger data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('seatfrontpassenger', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatfrontpassenger');
            expect(evObj.seatfrontpassenger).toEqual(jasmine.any(String));
        });
    });

     it("Add Listener on Seat BehindDriver data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('seatbehinddriver', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatbehinddriver');
            expect(evObj.seatbehinddriver).toEqual(jasmine.any(String));
        });
    }); 

     it("Remove Listener on Seat BehindDriver data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('seatbehinddriver', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatbehinddriver');
            expect(evObj.seatbehinddriver).toEqual(jasmine.any(String));
        });
    }); 
       
     it("Add Listener on Seat BehindPassenger data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('seatbehindpassenger', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatbehindpassenger');
            expect(evObj.seatbehindpassenger).toEqual(jasmine.any(String));
        });
    });

      it("Remove Listener on Seat BehindPassenger data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('seatbehindpassenger', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('seatbehindpassenger');
            expect(evObj.seatbehindpassenger).toEqual(jasmine.any(String));
        });
    });


      it("Add Listener on gear data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('shift', function(event){evObj = event;}, false);
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (Use simulator to generate data)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('gear');
            expect(evObj.gear).toEqual(jasmine.any(String));
            expect(evObj.timestamp).toEqual(jasmine.any(Number));
        });     
    }); 

     it("Remove Listener on gear data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('shift', function(event){evObj = event;}, false);
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (Use simulator to generate data)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('gear');
            expect(evObj.gear).toEqual(jasmine.any(String));
            expect(evObj.timestamp).toEqual(jasmine.any(Number));
        });     
    }); 
    
    it("Add Listener on trip computer data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('tripcomputer', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called.", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(parseFloat(evObj.averageSpeed1)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.averageSpeed2)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.averageConsumption1)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.averageConsumption2)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.mileage)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.range)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.tripDistance)).toEqual(jasmine.any(Number));
        });
    });
    
    it("Remove Listener on trip computer data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('tripcomputer', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onDelivery callback to be called.", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(parseFloat(evObj.averageSpeed1)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.averageSpeed2)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.averageConsumption1)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.averageConsumption2)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.mileage)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.range)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.tripDistance)).toEqual(jasmine.any(Number));
        });
    });
    

    it("Add Listener on parksensor data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('parksensors-front', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (Use simulator to generate data)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('parksensor');
            expect(evObj.position).toEqual('parksensors-front');
            expect(parseFloat(evObj.outLeft)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.left)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.midLeft)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.midRight)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.right)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.outRight)).toEqual(jasmine.any(Number));
            expect(evObj.timestamp).toEqual(jasmine.any(Number));
        });
    }); 

    it("Remove Listener on parksensor data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('parksensors-front', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (Use simulator to generate data)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.type).toEqual('parksensor');
            expect(evObj.position).toEqual('parksensors-front');
            expect(parseFloat(evObj.outLeft)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.left)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.midLeft)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.midRight)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.right)).toEqual(jasmine.any(Number));
            expect(parseFloat(evObj.outRight)).toEqual(jasmine.any(Number));
            expect(evObj.timestamp).toEqual(jasmine.any(Number));
        });
    }); 

    //not implemented for simulator
   it("Add Listener on control data", function() {
        var evObj = null;
        boundVehicleService.addEventListener('lights-fog-front', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.controlId).toEqual('lights-fog-front');
            expect(evObj.active).toEqual(jasmine.any(Boolean));     
        });
    }); 

    it("Remove Listener on control data", function() {
        var evObj = null;
        boundVehicleService.removeEventListener('lights-fog-front', function(event){evObj = event;}, false);
        
        waitsFor(function() {
            return evObj;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj).toEqual(jasmine.any(Object));
            expect(evObj.controlId).toEqual('lights-fog-front');
            expect(evObj.active).toEqual(jasmine.any(Boolean));     
        });
    }); 



    //Currently not implemented
   /* it("can find a POI", function() {
        var results = null;
        boundVehicleService.findDestionation(function(data){results = data;}, function(err){}, 'Test');
        
        waitsFor(function() {
            return results;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(results).toEqual(jasmine.any(Array));
        });
    });*/
    
    //Currently not implemented
   /* it("can request guidance to a POI", function() {
        var destinationSet = false;
        boundVehicleService.requestGuidance(function(){destinationSet=true;}, function(err){destinationSet=false;}, 'Test');
        
        waitsFor(function() {
            return destinationSet;
        }, "onEvent callback to be called. (not implemented)", 10000);

        runs(function() {
            expect(destinationSet).toEqual(true);
        });
    });*/

});

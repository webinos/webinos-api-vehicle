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
* Copyright 2013 John Lyle, University of Oxford
*******************************************************************************/

var Browser = require("zombie");
var assert = require("assert");
var util = require('util');
//var process = require('process');

Browser.debug = false;

browser = new Browser()

var totalPath = "http://localhost:8080/webinos-api-vehicle/test/web_root/jasmine/AutomatedSpec.html";

console.log("Visiting: " + totalPath);

browser.visit(totalPath).
  then(function () {
      //assert.ok(browser.success);
      var document = browser.document;
      var results = document.querySelector(".symbolSummary");
      var failed = results.querySelector(".failed");
      var succeeded = results.querySelector(".passed");
      if (failed !== null) {
        console.log("Failed some tests");
        console.log(browser.html(".results"));
        return onFailure("Tests failed");
      }
      if (succeeded !== null) {
        console.log("Successfully passed some tests");
      } 
      onSuccess(browser);
  }).
  fail(onFailure);

function onSuccess(browser) {
  browser.close();
  console.log("Successfully completed tests");
  process.exit(0);
}

function onFailure(error) {
  console.log("Test failed: " + error);
  process.exit(-1);
}

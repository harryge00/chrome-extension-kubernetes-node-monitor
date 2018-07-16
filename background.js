// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  var alarmInfo = {
    periodInMinutes: 4
  };
  chrome.alarms.create("checkHealth", alarmInfo)
});


var nodes = [
"sample.nodes"
];

function httpGet(theUrl)
{
    console.log(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function checkHealth() {
  for(var i = 0; i < nodes.length; i++) {
    var url = "http://" + nodes[i] + ":10255/healthz";
    var ok = httpGet(url);
    console.log(url, ok);
    if(ok != "ok") {
      alert(nodes[i] + " down!");
    }
  }
};

chrome.alarms.onAlarm.addListener(checkHealth);
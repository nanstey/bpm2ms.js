var durations = ["Whole", "Half", "Quarter", "Eighth", "16th", "32th", "64th", "128th", "256th", "512th", "1024th"];

window.onload = function(){
  // Init
  document.getElementById("bpm").value = 120;
  triggerUpdate();
}

document.getElementById("update").addEventListener("click", triggerUpdate);
document.getElementById("plus").addEventListener("click", triggerUpdate);
document.getElementById("minus").addEventListener("click", triggerUpdate);

function triggerUpdate(){
  var bpm = document.getElementById("bpm").value;
  bpm2ms(bpm);
}

function bpm2ms(bpm){

  var ms = 240000 / bpm;
  var obj = [];

  for (var i in durations){

    var tmpobj = {};

    tmpobj['duration'] = durations[i];
    tmpobj['straight'] = round2dp( ms );
    tmpobj['dotted'] = round2dp( ms * 1.5 );
    tmpobj['triplet'] = round2dp( ms * 2 / 3 );

    obj[i] = tmpobj;

    ms = ms / 2;
  }

  var sTable = buildTable(obj, "straight");
  var dTable = buildTable(obj, "dotted");
  var tTable = buildTable(obj, "triplet");

  var straight = document.getElementById("straight");
  document.querySelector("#straight>table").remove();
  straight.appendChild(sTable);

  var dotted = document.getElementById("dotted");
  document.querySelector("#dotted>table").remove();
  dotted.appendChild(dTable);

  var triplet = document.getElementById("triplet");
  document.querySelector("#triplet>table").remove();
  triplet.appendChild(tTable);

};

function buildTable(arr, key){
  var table = document.createElement("table");
  var tbody = document.createElement("tbody");
  for (var i in arr){
    var tr = document.createElement("tr");
    var name = document.createElement("td");
    var text = document.createTextNode( arr[i]["duration"]);
    name.appendChild( text );
    tr.appendChild(name);

    var time = document.createElement("td");
    text = document.createTextNode( arr[i][key] + 'ms' );
    time.appendChild( text );
    time.className = "right";
    tr.appendChild(time);

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return table;
}

function round2dp(num){
  return (Math.round(num*100)/100).toFixed(2);
}

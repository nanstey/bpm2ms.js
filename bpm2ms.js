var durations = ["Whole", "Half", "Quarter", "Eighth", "16th", "32th", "64th", "128th", "256th", "512th", "1024th"];

window.onload = function(){
  // Init
  document.getElementById("bpm").value = 120;
  bpm2ms(120);
}

document.getElementById("update").addEventListener("click", function(){
  var bpm = document.getElementById("bpm").value;
  bpm2ms(bpm);
});

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

  // document.getElementById("straight").removeChild().appendChild(straight);
  // document.getElementById("dotted").innerHTML = dotted;
  // document.getElementById("triplet").innerHTML = triplet;

  // document.getElementById("demo").innerHTML = JSON.stringify(straight);
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



    // console.log(arr[i]["duration"], arr[i][key]);

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  // console.log(JSON.stringify(table));
  return table;
}

function round2dp(num){
  return (Math.round(num*100)/100).toFixed(2);
}

// var open = false;
// document.getElementById("learn-more").addEventListener("click", function(){
//   if (open){
//     document.getElementById("info").setAttribute("display", "none");
//     open = false;
//   } else {
//     document.getElementById("info").setAttribute("display", "visible");
//     open = true;
//   }
// });


function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block'){
      e.style.display = 'none';
      document.getElementById('triangle').className = 'glyphicon glyphicon-triangle-right';
   } else{
      e.style.display = 'block';
      document.getElementById('triangle').className = 'glyphicon glyphicon-triangle-bottom';
   }
}
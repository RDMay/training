document.title = "TMNF Timer Troubleshooting 2"

var originalLineSize = "1px";
var highlightedWidth = "2px";
var selectedLead = "red";

var deviceType = "not mobile";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  deviceType="mobile"
}

xhr = new XMLHttpRequest();
xhr.open("GET","../../SVG Meter.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var meters = document.getElementById("meterDiv").appendChild(xhr.responseXML.documentElement);

xhr = new XMLHttpRequest();
xhr.open("GET","schematic.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);

var neutralPointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'neutralPoints'){
    for(a=0; a<mainSvg.childNodes[i].childNodes.length; a++){
      neutralPointsLayer = mainSvg.childNodes[i];
      neutralPointsLayer.style.display = 'inline';
      mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
      mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
      mainSvg.childNodes[i].childNodes[a].style.stroke = "black";
      mainSvg.childNodes[i].childNodes[a].style.strokeWidth = 1;
      mainSvg.childNodes[i].childNodes[a].style.fill = "yellow";
      mainSvg.childNodes[i].childNodes[a].id = "neutral_" + a;
    }
  }
}

var l1PointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'l1Points'){
    for(a=0; a<mainSvg.childNodes[i].childNodes.length; a++){
      l1PointsLayer = mainSvg.childNodes[i];
      l1PointsLayer.style.display = 'inline';
      mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
      mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
      mainSvg.childNodes[i].childNodes[a].style.stroke = "black";
      mainSvg.childNodes[i].childNodes[a].style.strokeWidth = 1;
      mainSvg.childNodes[i].childNodes[a].style.fill = "yellow";
      mainSvg.childNodes[i].childNodes[a].id = "l1_" + a;
    }
  }
}

var l2PointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'l2Points'){
    for(a=0; a<mainSvg.childNodes[i].childNodes.length; a++){
      l2PointsLayer = mainSvg.childNodes[i];
      l2PointsLayer.style.display = 'inline';
      mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
      mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
      mainSvg.childNodes[i].childNodes[a].style.stroke = "black";
      mainSvg.childNodes[i].childNodes[a].style.strokeWidth = 1;
      mainSvg.childNodes[i].childNodes[a].style.fill = "yellow";
      mainSvg.childNodes[i].childNodes[a].id = "l2_" + a;
    }
  }
}

var layers = schematic.childNodes;
for(i=0; i<layers.length; i++){
  try{
    layers[i].id = layers[i].getAttribute('inkscape:label')
  }catch(e){};
}

var neutralArray = document.getElementById("neutralPoints").childNodes;
var l1Array = document.getElementById("l1Points").childNodes;
var tpArray = [];
for(i=0; i<neutralArray.length; i++){
  tpArray.push(neutralArray[i]);
}
for(i=0; i<l1Array.length; i++){
  tpArray.push(l1Array[i]);
}

var redLeadPot;
var blackLeadPot;
var selectedRedLead;

function testPointClicked(){
  if(redLead.style.opacity == 1){
    console.log(event.target.id);
    selectedRedLead = event.target.id;
    for(i=0; i<tpArray.length; i++){
      if(tpArray[i].style.stroke != "black"){
        tpArray[i].style.stroke = "black";
        tpArray[i].style.fill = "yellow";
        tpArray[i].style.strokeWidth = 1;
      }
    }
    redLeadPot = event.target.id.split("_");
    redLeadPot = redLeadPot[0];
    event.target.style.stroke = "red";
    event.target.style.fill = "red";
    event.target.style.strokeWidth = 5;
  }

  if(redLead.style.opacity == 0){
    console.log(event.target.id)
    selectedBlackLead = event.target.id;
    for(i=0; i<tpArray.length; i++){
      if(tpArray[i].style.stroke != "red"){
        tpArray[i].style.stroke = "black";
        tpArray[i].style.fill = "yellow";
        tpArray[i].style.strokeWidth = 1;
      }
    }
    blackLeadPot = event.target.id.split("_");
    blackLeadPot = blackLeadPot[0];
    event.target.style.stroke = "black";
    event.target.style.fill = "black";
    event.target.style.strokeWidth = 5;
  }
  readMeter();
}

function readMeter(){
  switch(redLeadPot + blackLeadPot) {
    case "l1neutral":
      showReading('1_2_0_0_c_VAC');
      meterVoltagePrefix.textContent = "";
    break;
    case "neutrall1":
    showReading('1_2_0_0_c_VAC');
    meterVoltagePrefix.textContent = "";
    break;
    case "neutralneutral":
    showReading('0_0_0_0_c_VAC');
    meterVoltagePrefix.textContent = "m";
    break;
    case "l1l1":
    showReading('0_0_0_0_c_VAC');
    meterVoltagePrefix.textContent = "m";
    break;
  }
}

function submitClicked(){
  console.log(selectedRedLead+selectedBlackLead)
  if(selectedRedLead+selectedBlackLead == "l1_10neutral_13" || selectedRedLead+selectedBlackLead == "neutral_13l1_10"){
    alert('Correct!');
  }else{
    alert('Incorrect, try again!');
  }
}


TweenMax.to([evapFanBlade], 1.5, {rotation:360, transformOrigin: "50% 50%", ease: Power0.easeNone, repeat:-1});
// TweenMax.to([conFanBlade], 1.5, {rotation:360, transformOrigin: "50% 50%", ease: Power0.easeNone, repeat:-1});
// TweenMax.to([piston], .25, {y:10, transformOrigin: "50% 50%", ease: Power0.easeNone, repeat:-1, yoyo:true});

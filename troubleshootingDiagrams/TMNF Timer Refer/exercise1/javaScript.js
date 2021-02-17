document.title = "Exercise 1"
// complaintField.innerHTML = "Timer set to timed dry, 30 minutes. Motor wont start when start button is pressed."

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

//Set Path Codes
var diagram1Paths = document.getElementById("diagram1").getElementsByTagName("path");
var diagram1PathsLength = diagram1Paths.length;

for(i=0; i<diagram1PathsLength; i++){
  pathType = diagram1Paths[i].id;
  pathType = pathType.split("path");
  if(pathType.length == 2){
  diagram1Paths[i].style['stroke-linecap']="round";
  diagram1Paths[i].style.stroke = "Black";
  diagram1Paths[i].style.strokeWidth = originalLineSize;
  diagram1Paths[i].id = "wire_" + [i];
}
var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('stroke','blue');
path.setAttribute('fill','none');
path.setAttribute('opacity',0);
path.setAttribute('id',diagram1Paths[i].id + 'copy');

if(deviceType == "mobile"){
  path.setAttribute('onclick','wireClicked(this);');
  path.setAttribute('ontouchstart','wireClicked(this);');
  path.setAttribute('ontouchend','wireClicked(this);');
  path.setAttribute('onmouseover','wireClicked(this);');
  }else{
    path.setAttribute('onclick','wireClicked(this);');
    path.setAttribute('onmouseover','this.style.cursor = "default";');
  }
  path.style['stroke-linecap']="round";
  path.setAttribute("d", diagram1Paths[i].getAttribute("d"));
  diagram1.appendChild(path);
  path.style["stroke-width"]= 12;
}

//Set Path Codes
var diagram1Paths = document.getElementById("diagram1").getElementsByTagName("path");
var diagram1PathsLength = diagram1Paths.length;

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

function colorPickerChange(e){
  var highlightColor = document.getElementById("colorPicker").value;
}

var answer = "";
function wireClicked(wire){
  answer = event.target.id;
  answer = answer.split("copy")
  answer = answer[0];
  // console.clear();
  // console.log(answer)

  for(i=0; i<diagram1Paths.length; i++){
    part = diagram1Paths[i].id;
    part = part.split("copy")

    if(part.length === 1){
    diagram1Paths[i].style['stroke-linecap']="round";
    diagram1Paths[i].style.stroke = "#000000";
    diagram1Paths[i].style["stroke-width"]= originalLineSize;
    }
  }
  nameSplit = wire.id.split("copy");
  wire2 = document.getElementById(nameSplit[0]);
  if(wire2.style["stroke-width"] == 1 || wire2.style["stroke-width"] == '1px'){
    wire2.style["stroke-width"]= highlightedWidth;
    wire2.style["stroke"]= 'red';
    selectedPart = wire2.id;
  }else{
    wire2.style["stroke-width"]= originalLineSize;
    wire2.style["stroke"]= "rgb(0, 0, 0)";
  }
  if(answer == "Timer_BC"){
    failedComponent.innerHTML = "Correct! Code = " + answer
  }else{
    failedComponent.innerHTML = "Incorrect, try again!"
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
    console.log(event.target.id)
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
  if(selectedRedLead+selectedBlackLead == "neutral_4l1_20" || selectedRedLead+selectedBlackLead == "l1_20neutral_4"){
    alert('Correct!');
  }else{
    alert('Incorrect, try again!');
  }
}




// TweenMax.to(evapFanBlade, 3, {rotation:360,transformOrigin: "50% 50%", ease:"none", repeat:-1});
// TweenMax.to([evapFanBlade], 1.5, {rotation:360, transformOrigin: "50% 50%", ease: Power0.easeNone, repeat:-1});
TweenMax.to([conFanBlade], 1.5, {rotation:360, transformOrigin: "50% 50%", ease: Power0.easeNone, repeat:-1});
TweenMax.to([piston], .25, {y:10, transformOrigin: "50% 50%", ease: Power0.easeNone, repeat:-1, yoyo:true});

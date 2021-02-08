document.title = "Exercise 5"
complaintField.innerHTML = "Timer wont advance in auto cycle. Dryer is running and temperatures are too hot."

var originalLineSize = "1px";
var highlightedWidth = "2px";

var deviceType = "not mobile";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  deviceType="mobile"
}

xhr = new XMLHttpRequest();
xhr.open("GET","../schematic.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");

var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);
// var schematic = document.getElementById("mainSvg");

schematic.setAttribute("width", screen.width);
schematic.setAttribute("height", screen.height);

//Resize Window
var svgWindow = document.getElementById("mainWindow");
var svg = d3.select(schematic);
function myredraw(){
  var width = svgWindow.clientWidth;
  var height = svgWindow.clientHeight;
  svg
  .attr("width", width)
  .attr("height", height);
}
myredraw();
window.addEventListener("resize", myredraw);

document.addEventListener('keydown', logKey);
function logKey(e) {
  console.log(e.keyCode)
  if(e.keyCode == 77){
    if(ac.checked == true){
      dc.checked = true;
    }else{
      console.log(ac.checked)
      ac.checked = true;
    }
  }
  if(e.keyCode == 32){
    if(redLead.checked == true){
      blackLead.checked = true;
    }else{
      console.log(ac.checked)
      redLead.checked = true;
    }
  }
}

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
  console.clear();
  console.log(answer)

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
  if(answer == "Drum_Outlet"){
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
var l2Array = document.getElementById("l2Points").childNodes;
var tpArray = [];
for(i=0; i<neutralArray.length; i++){
  tpArray.push(neutralArray[i]);
}
for(i=0; i<l1Array.length; i++){
  tpArray.push(l1Array[i]);
}
for(i=0; i<l2Array.length; i++){
  tpArray.push(l2Array[i]);
}

var redLeadPot;
var blackLeadPot;
var readingType;
function testPointClicked(){
  console.log(event.target.id)
  if(ac.checked == true){
    readingType = "VAC"
  }else{
    readingType = "VDC"
  }

  if(redLead.checked == true){
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

  if(redLead.checked == false){
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
  if(ac.checked == true){
    readingType = "VAC"
  }else{
    readingType = "VDC"
  }

  switch(redLeadPot + blackLeadPot) {
    case "l1neutral":
    if(readingType == "VAC"){
      meterReading.innerHTML = "120.0 " + readingType;
    }else{
      meterReading.innerHTML = "0.000 " + readingType;
    }
    break;

    case "neutrall1":
    if(readingType == "VAC"){
      meterReading.innerHTML = "120.0 " + readingType;
    }else{
      meterReading.innerHTML = "0.000 " + readingType;
    }
    break;

    case "l2neutral":
    if(readingType == "VAC"){
      meterReading.innerHTML = "120.0 " + readingType;
    }else{
      meterReading.innerHTML = "0.000 " + readingType;
    }
    break;

    case "neutrall2":
    if(readingType == "VAC"){
      meterReading.innerHTML = "120.0 " + readingType;
    }else{
      meterReading.innerHTML = "0.000 " + readingType;
    }
    break;

    case "l1l2":
    if(readingType == "VAC"){
      meterReading.innerHTML = "240.0 " + readingType;
    }else{
      meterReading.innerHTML = "0.000 " + readingType;
    }
    break;

    case "l2l1":
    if(readingType == "VAC"){
      meterReading.innerHTML = "240.0 " + readingType;
    }else{
      meterReading.innerHTML = "0.000 " + readingType;
    }
    break;

    default:
    if(readingType == "VAC"){
      meterReading.innerHTML = "0.000 " + readingType;
    }else{
      meterReading.innerHTML = "0.000 " + readingType;
    }

  }
}

function checkAnswer(){
  if(answer == 'path9368copy'){
    alert('Correct!');
  }else{
    alert('Incorrect, try again!');
  }
}

function toggleTestPoints(){
  if(neutralPointsLayer.style.display == "inline"){
    neutralPointsLayer.style.display = "none"
  }else{
    neutralPointsLayer.style.display = "inline"
  }

  if(l1PointsLayer.style.display == "inline"){
    l1PointsLayer.style.display = "none"
  }else{
    l1PointsLayer.style.display = "inline"
  }

  if(l2PointsLayer.style.display == "inline"){
    l2PointsLayer.style.display = "none"
  }else{
    l2PointsLayer.style.display = "inline"
  }
}

redLead.checked = true;
ac.checked = true;

l1_24.id = "l2_24c";
l1_23.id = "l2_23c";
l1_26.id = "l2_26c";
l1_22.id = "l2_22c";
l1_21.id = "l2_21c";
l1_20.id = "l2_20c";

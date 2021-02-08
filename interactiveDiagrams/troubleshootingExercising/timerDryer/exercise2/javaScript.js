document.title = "Exercise 1"

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
  diagram1Paths[i].style['stroke-linecap']="round";
  diagram1Paths[i].style.stroke = "Black";
  diagram1Paths[i].style.strokeWidth = originalLineSize;
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
      mainSvg.childNodes[i].childNodes[a].style.stroke = "green";
      mainSvg.childNodes[i].childNodes[a].style.fill = "green";
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
      mainSvg.childNodes[i].childNodes[a].style.stroke = "green";
      mainSvg.childNodes[i].childNodes[a].style.fill = "green";
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
      mainSvg.childNodes[i].childNodes[a].style.stroke = "green";
      mainSvg.childNodes[i].childNodes[a].style.fill = "green";
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
  console.log(event.target.id)
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
  console.clear()
  console.log(event.target.id)
  if(ac.checked == true){
    readingType = "VAC"
  }else{
    readingType = "VDC"
  }

  if(redLead.checked == true){
    for(i=0; i<tpArray.length; i++){
      if(tpArray[i].style.stroke != "black"){
        tpArray[i].style.stroke = "green";
        tpArray[i].style.fill = "green";
      }
    }
    redLeadPot = event.target.id.split("_");
    redLeadPot = redLeadPot[0];
    event.target.style.stroke = "red";
    event.target.style.fill = "red";
  }

  if(redLead.checked == false){
    for(i=0; i<tpArray.length; i++){
      if(tpArray[i].style.stroke != "red"){
        tpArray[i].style.stroke = "green";
        tpArray[i].style.fill = "green";
      }
    }
    blackLeadPot = event.target.id.split("_");
    blackLeadPot = blackLeadPot[0];
    event.target.style.stroke = "black";
    event.target.style.fill = "black";
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
      meterReading.innerHTML = "Meter Reading: 120" + readingType;
    }else{
      meterReading.innerHTML = "Meter Reading: 0.000" + readingType;
    }
    break;

    case "neutrall1":
    if(readingType == "VAC"){
      meterReading.innerHTML = "Meter Reading: 120" + readingType;
    }else{
      meterReading.innerHTML = "Meter Reading: 0.000" + readingType;
    }
    break;

    case "l2neutral":
    if(readingType == "VAC"){
      meterReading.innerHTML = "Meter Reading: 120" + readingType;
    }else{
      meterReading.innerHTML = "Meter Reading: 0.000" + readingType;
    }
    break;

    case "neutrall2":
    if(readingType == "VAC"){
      meterReading.innerHTML = "Meter Reading: 120" + readingType;
    }else{
      meterReading.innerHTML = "Meter Reading: 0.000" + readingType;
    }
    break;

    case "l1l2":
    if(readingType == "VAC"){
      meterReading.innerHTML = "Meter Reading: 240.0" + readingType;
    }else{
      meterReading.innerHTML = "Meter Reading: 0.000" + readingType;
    }
    break;

    case "l2l1":
    if(readingType == "VAC"){
      meterReading.innerHTML = "Meter Reading: 240.0" + readingType;
    }else{
      meterReading.innerHTML = "Meter Reading: 0.000" + readingType;
    }
    break;

    default:
    if(readingType == "VAC"){
      meterReading.innerHTML = "Meter Reading: 0" + readingType;
    }else{
      meterReading.innerHTML = "Meter Reading: 0" + readingType;
    }

}
}


//Change DropDown when component is clicked on diagram.
function changeDropDown(e){
  newDropDownValue = e.split("_")[0];
  for(i=0; i<componentSelect.length; i++){
    if(newDropDownValue == componentSelect[i].value){
      componentSelect.value = newDropDownValue;
      componentChange();
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
tpOn.checked = true;

l1_2.id = 'neutral_2c';
l1_3.id = 'neutral_3c';
l1_6.id = 'neutral_6c';
l1_4.id = 'neutral_4c';
l1_5.id = 'neutral_5c';
l1_7.id = 'neutral_7c';
l1_8.id = 'neutral_8c';
l1_9.id = 'neutral_9c';
l1_10.id = 'neutral_10c';
l1_11.id = 'neutral_11c';
l1_12.id = 'neutral_12c';
l1_13.id = 'neutral_13c';
l1_27.id = 'neutral_27c';
neutral_4.id = 'l1_4c';

l2_2.id = 'l1_2c'
l2_3.id = 'l1_3c'

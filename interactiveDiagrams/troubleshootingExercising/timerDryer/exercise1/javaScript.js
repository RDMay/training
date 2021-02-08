document.title = "Exercise 1"

var originalLineSize = "0.25px";
var highlightedWidth = "1px";

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

var commPointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'commPoints'){
    for(a=0; a<mainSvg.childNodes[i].childNodes.length; a++){
      commPointsLayer = mainSvg.childNodes[i];
      commPointsLayer.style.display = 'inline';
      mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
      mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
      mainSvg.childNodes[i].childNodes[a].style.stroke = "green";
      mainSvg.childNodes[i].childNodes[a].style.fill = "green";
      mainSvg.childNodes[i].childNodes[a].id = "comm_" + a;
    }
  }
}

var dcMinusPointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'dcMinusPoints'){
    for(a=0; a<mainSvg.childNodes[i].childNodes.length; a++){
      dcMinusPointsLayer = mainSvg.childNodes[i];
      dcMinusPointsLayer.style.display = 'inline';
      mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
      mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
      mainSvg.childNodes[i].childNodes[a].style.stroke = "green";
      mainSvg.childNodes[i].childNodes[a].style.fill = "green";
      mainSvg.childNodes[i].childNodes[a].id = "dcMinus_" + a;
    }
  }
}

var dcPulsePointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'dcPulsePoints'){
    for(a=0; a<mainSvg.childNodes[i].childNodes.length; a++){
      dcPulsePointsLayer = mainSvg.childNodes[i];
      dcPulsePointsLayer.style.display = 'inline';
      mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
      mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
      mainSvg.childNodes[i].childNodes[a].style.stroke = "green";
      mainSvg.childNodes[i].childNodes[a].style.fill = "green";
      mainSvg.childNodes[i].childNodes[a].id = "dcPulse_" + a;
    }
  }
}

function colorPickerChange(e){
  var highlightColor = document.getElementById("colorPicker").value;
}

function wireClicked(wire){
  nameSplit = wire.id.split("copy");
  wire2 = document.getElementById(nameSplit[0]);
  if(wire2.style["stroke-width"] == .25 || wire2.style["stroke-width"] == '0.25px'){
    wire2.style["stroke-width"]= highlightedWidth;
    wire2.style["stroke"]= document.getElementById("colorPicker").value;
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



function getColors(){

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

  if(dcMinusPointsLayer.style.display == "inline"){
    dcMinusPointsLayer.style.display = "none"
  }else{
    dcMinusPointsLayer.style.display = "inline"
  }

  if(commPointsLayer.style.display == "inline"){
    commPointsLayer.style.display = "none"
  }else{
    commPointsLayer.style.display = "inline"
  }

  if(dcPulsePointsLayer.style.display == "inline"){
    dcPulsePointsLayer.style.display = "none"
  }else{
    dcPulsePointsLayer.style.display = "inline"
  }
}

redLead.checked = true;
ac.checked = true;

l2_3.id = 'l1_3c';
l2_2.id = 'l1_2c';
l1_11.id = 'n_11c';
neutral_1.id = 'l1_1c';
neutral_4.id = 'l1_4c';

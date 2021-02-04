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
window.addEventListener("resize", myredraw)

//Set Path Codes
var diagram1Paths = document.getElementById("diagram1").getElementsByTagName("path");
var diagram1PathsLength = diagram1Paths.length;

var neutralPointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'neutralPoints'){
    neutralPointsLayer = mainSvg.childNodes[i];
    neutralPointsLayer.style.display = 'inline';
    mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
    mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
    console.log(mainSvg.childNodes[i].getAttribute("stroke"));
    console.log(mainSvg.childNodes[i].getAttribute("fill"));
    mainSvg.childNodes[i].setAttribute('stroke','red');
    mainSvg.childNodes[i].setAttribute('fill','red');
  }
}

var l1PointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'l1Points'){
    l1PointsLayer = mainSvg.childNodes[i];
    l1PointsLayer.style.display = 'inline';
    mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
    mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
  }
}

var dcPlusPointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'dcPlusPoints'){
    dcPlusPointsLayer = mainSvg.childNodes[i];
    dcPlusPointsLayer.style.display = 'inline';
    mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
    mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
  }
}

var commPointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'commPoints'){
    commPointsLayer = mainSvg.childNodes[i];
    commPointsLayer.style.display = 'inline';
    mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
    mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
  }
}

var dcPulsePointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'dcPulsePoints'){
    dcPulsePointsLayer = mainSvg.childNodes[i];
    dcPulsePointsLayer.style.display = 'inline';
    mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
    mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
  }
}

var dcMinusPointsLayer;
for(i=0; i<mainSvg.childNodes.length; i++){
  var myLabel = $(mainSvg.childNodes[i]).attr('inkscape:label');
  if(myLabel == 'dcMinusPoints'){
    dcMinusPointsLayer = mainSvg.childNodes[i];
    dcMinusPointsLayer.style.display = 'inline';
    mainSvg.childNodes[i].setAttribute('onclick','testPointClicked();');
    mainSvg.childNodes[i].setAttribute('onmouseover','this.style.cursor = "default";');
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

function testPointClicked(){
  console.log("tpClicked " + event.target.id)
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

function clearHighlights(){
  for(i=0; i<diagram1Paths.length; i++){
    part = diagram1Paths[i].id;
    part = part.split("copy")

    if(part.length === 1){
    diagram1Paths[i].style['stroke-linecap']="round";
    diagram1Paths[i].style.stroke = "#000000";
    diagram1Paths[i].style["stroke-width"]= originalLineSize;
    }
  }
}

clearHighlights();

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

  if(dcPlusPointsLayer.style.display == "inline"){
    dcPlusPointsLayer.style.display = "none"
  }else{
    dcPlusPointsLayer.style.display = "inline"
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



























// for(i=0; i<diagram1PathsLength; i++){
//   diagram1Paths[i].style['stroke-linecap']="round";
//   diagram1Paths[i].style.stroke = "Black";
//   var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
//   path.setAttribute('stroke','blue');
//   path.setAttribute('fill','none');
//   path.setAttribute('opacity', 0);
//   path.setAttribute('id',diagram1Paths[i].id + 'copy');
//
//   if(deviceType == "mobile"){
//     path.setAttribute('onclick','wireClicked(this);');
//     path.setAttribute('ontouchstart','wireClicked(this);');
//     path.setAttribute('ontouchend','wireClicked(this);');
//     path.setAttribute('onmouseover','wireClicked(this);');
//     }else{
//       path.setAttribute('onclick','wireClicked(this);');
//       path.setAttribute('onmouseover','this.style.cursor = "default";');
//     }
//     path.style['stroke-linecap']="round";
//     path.setAttribute("d", diagram1Paths[i].getAttribute("d"));
//     diagram1.appendChild(path);
//     path.style["stroke-width"]= 3;
// }



// l1ArrayKey = [];
// neutralArrayKey = [];
// energizedLoadArrayKey = ['evapFanMotor_btn'];
// dcPlusArrayKey = ['path7469','path7474','path46258','path300','path3512'];
// dcMinusArrayKey = ['path3538','path318'];
// rpmFeedBackArrayKey = ['path312'];
// speedControlArrayKey = ['path306'];
// unkArrayKey = [];
//
// function checkAnswer(){
//   getColors();
//   var answerArray = [];
//   for(a=0; a<l1ArrayKey.length; a++){
//     if(l1ArrayKey.includes(l1Array[a]) == false || l1Array.length != l1ArrayKey.length){
//       answerArray.push("false")
//     }
//   }
//   for(a=0; a<neutralArrayKey.length; a++){
//     if(neutralArrayKey.includes(neutralArray[a]) == false || neutralArray.length != neutralArrayKey.length){
//       answerArray.push("false")
//     }
//   }
//   for(a=0; a<dcPlusArrayKey.length; a++){
//     if(dcPlusArrayKey.includes(dcPlusArray[a]) == false || dcPlusArray.length != dcPlusArrayKey.length){
//       answerArray.push("false")
//     }
//   }
//   for(a=0; a<dcMinusArrayKey.length; a++){
//     if(dcMinusArrayKey.includes(dcMinusArray[a]) == false || dcMinusArray.length != dcMinusArrayKey.length){
//       answerArray.push("false")
//     }
//   }
//   for(a=0; a<rpmFeedBackArrayKey.length; a++){
//     if(rpmFeedBackArrayKey.includes(rpmFeedBackArray[a]) == false || rpmFeedBackArray.length != rpmFeedBackArrayKey.length){
//       answerArray.push("false")
//     }
//   }
//   for(a=0; a<speedControlArrayKey.length; a++){
//     if(speedControlArrayKey.includes(speedControlArray[a]) == false || speedControlArray.length != speedControlArrayKey.length){
//       answerArray.push("false")
//     }
//   }
//   for(a=0; a<unkArrayKey.length; a++){
//     if(unkArrayKey.includes(unkArray[a]) == false || unkArray.length != unkArrayKey.length){
//       answerArray.push("false")
//     }
//   }
//   for(a=0; a<energizedLoadArrayKey.length; a++){
//     if(energizedLoadArrayKey.includes(energizedLoadArray[a]) == false || energizedLoadArray.length != energizedLoadArrayKey.length){
//       answerArray.push("false")
//     }
//   }
//
//   // if(ccSwitchRotated === true){
//   //   answerArray.push("false")
//   // }
//
//   if(answerArray.includes('false')){
//     alert("Incorrect, please try again.")
//   }else{
//     alert("3196")
//   }
// }
//
// var highLimitSwitchRotated=false;
// highLimitSwitch.setAttribute('onclick','changeHighLimitSwitch();');
// highLimitSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');
//
// function changeHighLimitSwitch(){
// 	if(highLimitSwitchRotated === false){
// 		TweenMax.to(path3549,1,{rotation:33})
// 		TweenMax.to(path3549copy,1,{rotation:33})
// 		highLimitSwitchRotated=true;
// 	}else{
// 		TweenMax.to(path3549,1,{rotation:0})
// 		TweenMax.to(path3549copy,1,{rotation:0})
// 		highLimitSwitchRotated=false;
// 	}
// }
//
// var highLimit2SwitchRotated=false;
// highLimitSwitch2.setAttribute('onclick','changeHighLimitSwitch2();');
// highLimitSwitch2.setAttribute('onmouseover','this.style.cursor = "pointer";');
//
// function changeHighLimitSwitch2(){
// 	if(highLimit2SwitchRotated === false){
// 		TweenMax.to(path3768,1,{rotation:33})
// 		TweenMax.to(path3768copy,1,{rotation:33})
// 		highLimit2SwitchRotated=true;
// 	}else{
// 		TweenMax.to(path3768,1,{rotation:0})
// 		TweenMax.to(path3768copy,1,{rotation:0})
// 		highLimit2SwitchRotated=false;
// 	}
// }
//
// var ffDoorSwitchRotated=false;
// ffDoorSwitch.setAttribute('onclick','changeffDoorSwitch();');
// ffDoorSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');
//
// function changeffDoorSwitch(){
// 	if(ffDoorSwitchRotated === false){
// 		TweenMax.to(path3551,1,{rotation:-33})
// 		TweenMax.to(path3551copy,1,{rotation:-33})
// 		ffDoorSwitchRotated=true;
// 	}else{
// 		TweenMax.to(path3551,1,{rotation:0})
// 		TweenMax.to(path3551copy,1,{rotation:0})
// 		ffDoorSwitchRotated=false;
// 	}
// }
//
// var fzDoorSwitchRotated=false;
// fzDoorSwitch.setAttribute('onclick','changeFzDoorSwitch();');
// fzDoorSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');
//
// function changeFzDoorSwitch(){
// 	if(fzDoorSwitchRotated === false){
// 		TweenMax.to(path3348,1,{rotation:55, transformOrigin: '0% 100%'})
// 		TweenMax.to(path3348copy,1,{rotation:55, transformOrigin: '0% 100%'})
// 		fzDoorSwitchRotated=true;
// 	}else{
// 		TweenMax.to(path3348,1,{rotation:0})
// 		TweenMax.to(path3348copy,1,{rotation:0})
// 		fzDoorSwitchRotated=false;
// 	}
// }
//
// //Compressor Relay
// var compressorRelayRotated=false;
// compressorRelay.setAttribute('onclick','changecompressorRelay();');
// compressorRelay.setAttribute('onmouseover','this.style.cursor = "pointer";');
//
// function changecompressorRelay(){
// 	if(compressorRelayRotated === false){
// 		TweenMax.to(path2239,1,{rotation:33, transformOrigin: '100% 0%'})
// 		TweenMax.to(path2239copy,1,{rotation:33, transformOrigin: '100% 0%'})
// 		compressorRelayRotated=true;
// 	}else{
// 		TweenMax.to(path2239,1,{rotation:0})
// 		TweenMax.to(path2239copy,1,{rotation:0})
// 		compressorRelayRotated=false;
// 	}
// }
//
// //Compressor Relay
// var compressorRelayRotated=false;
// compressorRelay.setAttribute('onclick','changecompressorRelay();');
// compressorRelay.setAttribute('onmouseover','this.style.cursor = "pointer";');
//
// function changecompressorRelay(){
// 	if(compressorRelayRotated === false){
// 		TweenMax.to(path2239,1,{rotation:33, transformOrigin: '100% 0%'})
// 		TweenMax.to(path2239copy,1,{rotation:33, transformOrigin: '100% 0%'})
// 		compressorRelayRotated=true;
// 	}else{
// 		TweenMax.to(path2239,1,{rotation:0})
// 		TweenMax.to(path2239copy,1,{rotation:0})
// 		compressorRelayRotated=false;
// 	}
// }
//
// //Heater Relay
// var heaterRelayRotated=false;
// heaterRelay.setAttribute('onclick','changeheaterRelay();');
// heaterRelay.setAttribute('onmouseover','this.style.cursor = "pointer";');
//
// function changeheaterRelay(){
// 	if(heaterRelayRotated === false){
// 		TweenMax.to(path2243,1,{rotation:33, transformOrigin: '0% 0%'})
// 		TweenMax.to(path2243copy,1,{rotation:33, transformOrigin: '0% 0%'})
// 		heaterRelayRotated=true;
// 	}else{
// 		TweenMax.to(path2243,1,{rotation:0})
// 		TweenMax.to(path2243copy,1,{rotation:0})
// 		heaterRelayRotated=false;
// 	}
// }
//
// //Cube Relay
// var cubeRelayRotated=false;
// cubeRelay.setAttribute('onclick','changecubeRelay();');
// cubeRelay.setAttribute('onmouseover','this.style.cursor = "pointer";');
//
// function changecubeRelay(){
// 	if(cubeRelayRotated === false){
// 		TweenMax.to(path2130,1,{rotation:-33, transformOrigin: '0% 0%'})
// 		TweenMax.to(path2130copy,1,{rotation:-31, transformOrigin: '0% 0%'})
// 		cubeRelayRotated=true;
// 	}else{
// 		TweenMax.to(path2130,1,{rotation:0})
// 		TweenMax.to(path2130copy,1,{rotation:0})
// 		cubeRelayRotated=false;
// 	}
// }
//
// //Cube Relay
// var augerRelayRotated=false;
// augerRelay.setAttribute('onclick','changeaugerRelay();');
// augerRelay.setAttribute('onmouseover','this.style.cursor = "pointer";');
//
// function changeaugerRelay(){
// 	if(augerRelayRotated === false){
// 		TweenMax.to(path2132,1,{rotation:-30, transformOrigin: '0% 0%'})
// 		TweenMax.to(path2132copy,1,{rotation:-30, transformOrigin: '0% 0%'})
// 		augerRelayRotated=true;
// 	}else{
// 		TweenMax.to(path2132,1,{rotation:0})
// 		TweenMax.to(path2132copy,1,{rotation:0})
// 		augerRelayRotated=false;
// 	}
// }

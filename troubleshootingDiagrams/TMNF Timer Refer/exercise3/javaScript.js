document.title = "TMNF Timer Troubleshooting 3"

var originalLineSize = "1px";
var highlightedWidth = "2px";
var selectedLead = "red";

var deviceType = "not mobile";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  deviceType="mobile"
}

xhr = new XMLHttpRequest();
xhr.open("GET","../../../SVG Meter.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var meters = document.getElementById("meterDiv").appendChild(xhr.responseXML.documentElement);

xhr = new XMLHttpRequest();
xhr.open("GET","schematic.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);

function closeMenu(){
  uiDiv.setAttribute('class', 'uiHiddenClass')
}

function openMenu(){
  uiDiv.setAttribute('class', 'uiClass')
}

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

function submitClicked(){
  console.log(selectedRedLead+selectedBlackLead)
  if(selectedRedLead+selectedBlackLead == "neutral_6l1_11" || selectedRedLead+selectedBlackLead == "l1_11neutral_6"){
    alert('Correct! Code:2850');
  }else{
    alert('Incorrect, try again!');
  }
}

// TweenMax.to(evapFanBlade, 3, {rotation:360,transformOrigin: "50% 50%", ease:"none", repeat:-1});
// TweenMax.to([evapFanBlade], 1.5, {rotation:360, transformOrigin: "50% 50%", ease: Power0.easeNone, repeat:-1});
// TweenMax.to([conFanBlade], 1.5, {rotation:360, transformOrigin: "50% 50%", ease: Power0.easeNone, repeat:-1});
// TweenMax.to([piston], .25, {y:10, transformOrigin: "50% 50%", ease: Power0.easeNone, repeat:-1, yoyo:true});

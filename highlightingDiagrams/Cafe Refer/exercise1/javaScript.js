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

for(i=0; i<diagram1PathsLength; i++){
  diagram1Paths[i].style['stroke-linecap']="round";
  diagram1Paths[i].style.stroke = "Black";
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke','blue');
  path.setAttribute('fill','none');
  path.setAttribute('opacity', 0);
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
    path.style["stroke-width"]= 3;
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

var l1Array = []; var grayArray = []; var neutralArray = []; var darkGrayArray = []; var aquamarineArray = []; var dcMinusArray = []; var rpmFeedBackArray = []; var violetArray = []; var pinkArray = []; var yellowGreenArray = []; var speedControlArray = []; var energizedLoadArray = []; var dcPlusArray = [];
var unkArray = [];

function getColors(){
  l1Array = []; grayArray = []; neutralArray = []; darkGrayArray = []; aquamarineArray = []; dcMinusArray = []; rpmFeedBackArray = []; violetArray = []; pinkArray = []; yellowGreenArray = []; speedControlArray = []; energizedLoadArray = []; dcPlusArray = []; unkArray = [];
    for(i=0; i<diagram1PathsLength; i++){
      if(diagram1Paths[i].style["stroke-width"] != originalLineSize) {
        switch(diagram1Paths[i].style.stroke) {
        case "rgb(51, 0, 0)":
          l1Array.push(diagram1Paths[i].id);
        break;
        case "rgb(205, 205, 205)":
          neutralArray.push(diagram1Paths[i].id);
        break;
        case "rgb(255, 165, 0)":
          energizedLoadArray.push(diagram1Paths[i].id);
        break;
        case "rgb(255, 0, 0)":
          dcPlusArray.push(diagram1Paths[i].id);
        break;
        case "rgb(0, 0, 0)":
          dcMinusArray.push(diagram1Paths[i].id);
        break;
        case "rgb(0, 0, 255)":
          rpmFeedBackArray.push(diagram1Paths[i].id);
        break;
        case "rgb(255, 255, 0)":
          speedControlArray.push(diagram1Paths[i].id);
        break;
        case "rgb(128, 0, 128)":
          unkArray.push(diagram1Paths[i].id);
            break;
        }
      }
    }
    console.log("l1ArrayKey = [" + l1Array + "];" + "\n" + "neutralArrayKey = [" + neutralArray + "];" + "\n" + "energizedLoadArrayKey = ["  + energizedLoadArray + "];" + "\n" + "dcPlusArrayKey = [" + dcPlusArray + "];" + "\n" + "dcMinusArrayKey = [" + dcMinusArray + "];" + "\n" + "rpmFeedBackArrayKey = [" + rpmFeedBackArray + "];" + "\n" + "speedControlArrayKey = [" + speedControlArray + "];" + "\n"  + "unkArrayKey = [" + unkArray + "];");
}


l1ArrayKey = [];
neutralArrayKey = [];
energizedLoadArrayKey = ['evapFanMotor_btn'];
dcPlusArrayKey = ['path7469','path7474','path46258','path300','path3512'];
dcMinusArrayKey = ['path3538','path318'];
rpmFeedBackArrayKey = ['path312'];
speedControlArrayKey = ['path306'];
unkArrayKey = [];

function checkAnswer(){
  getColors();
  var answerArray = [];
  for(a=0; a<l1ArrayKey.length; a++){
    if(l1ArrayKey.includes(l1Array[a]) == false || l1Array.length != l1ArrayKey.length){
      answerArray.push("false")
    }
  }
  for(a=0; a<neutralArrayKey.length; a++){
    if(neutralArrayKey.includes(neutralArray[a]) == false || neutralArray.length != neutralArrayKey.length){
      answerArray.push("false")
    }
  }
  for(a=0; a<dcPlusArrayKey.length; a++){
    if(dcPlusArrayKey.includes(dcPlusArray[a]) == false || dcPlusArray.length != dcPlusArrayKey.length){
      answerArray.push("false")
    }
  }
  for(a=0; a<dcMinusArrayKey.length; a++){
    if(dcMinusArrayKey.includes(dcMinusArray[a]) == false || dcMinusArray.length != dcMinusArrayKey.length){
      answerArray.push("false")
    }
  }
  for(a=0; a<rpmFeedBackArrayKey.length; a++){
    if(rpmFeedBackArrayKey.includes(rpmFeedBackArray[a]) == false || rpmFeedBackArray.length != rpmFeedBackArrayKey.length){
      answerArray.push("false")
    }
  }
  for(a=0; a<speedControlArrayKey.length; a++){
    if(speedControlArrayKey.includes(speedControlArray[a]) == false || speedControlArray.length != speedControlArrayKey.length){
      answerArray.push("false")
    }
  }
  for(a=0; a<unkArrayKey.length; a++){
    if(unkArrayKey.includes(unkArray[a]) == false || unkArray.length != unkArrayKey.length){
      answerArray.push("false")
    }
  }
  for(a=0; a<energizedLoadArrayKey.length; a++){
    if(energizedLoadArrayKey.includes(energizedLoadArray[a]) == false || energizedLoadArray.length != energizedLoadArrayKey.length){
      answerArray.push("false")
    }
  }

  // if(ccSwitchRotated === true){
  //   answerArray.push("false")
  // }

  if(answerArray.includes('false')){
    alert("Incorrect, please try again.")
  }else{
    alert("3196")
  }
}

var leftDoorSwitchRotated=false;
leftDoorSwitch.setAttribute('onclick','changeTimerSwitch();');
leftDoorSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changeTimerSwitch(){
	if(leftDoorSwitchRotated === false){
		TweenMax.to(path8166,1,{rotation:28, transformOrigin: "100% 0%"});
		TweenMax.to(path8166copy,1,{rotation:28, transformOrigin: "100% 0%"});
		leftDoorSwitchRotated=true;
	}else{
		TweenMax.to(path8166,1,{rotation:0});
		TweenMax.to(path8166copy,1,{rotation:0});
		leftDoorSwitchRotated=false;
	}
}

var rightDoorSwitchRotated=false;
rightDoorSwitch.setAttribute('onclick','changerightDoorSwitch();');
rightDoorSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changerightDoorSwitch(){
	if(rightDoorSwitchRotated === false){
		TweenMax.to(path10622,1,{rotation:-25, transformOrigin: "0% 0%"});
		TweenMax.to(path10622copy,1,{rotation:-25, transformOrigin: "0% 0%"});
		rightDoorSwitchRotated=true;
	}else{
		TweenMax.to(path10622,1,{rotation:0});
		TweenMax.to(path10622copy,1,{rotation:0});
		rightDoorSwitchRotated=false;
	}
}

var ffBimetalRotated=false;
ffBimetal.setAttribute('onclick','changeffBimetal();');
ffBimetal.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changeffBimetal(){
	if(ffBimetalRotated === false){
		TweenMax.to(path9510,1,{rotation:25, transformOrigin: "0% 0%"});
		TweenMax.to(path9510copy,1,{rotation:25, transformOrigin: "0% 0%"});
		ffBimetalRotated=true;
	}else{
		TweenMax.to(path9510,1,{rotation:0});
		TweenMax.to(path9510copy,1,{rotation:0});
		ffBimetalRotated=false;
	}
}

var fzBimetalRotated=false;
fzBimetal.setAttribute('onclick','changefzBimetal();');
fzBimetal.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changefzBimetal(){
	if(fzBimetalRotated === false){
		TweenMax.to(path9430,1,{rotation:25, transformOrigin: "0% 0%"});
		TweenMax.to(path9430copy,1,{rotation:25, transformOrigin: "0% 0%"});
		fzBimetalRotated=true;
	}else{
		TweenMax.to(path9430,1,{rotation:0});
		TweenMax.to(path9430copy,1,{rotation:0});
		fzBimetalRotated=false;
	}
}

var fzDoorSwitchRotated=false;
fzDoorSwitch.setAttribute('onclick','changefzDoorSwitch();');
fzDoorSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changefzDoorSwitch(){
	if(fzDoorSwitchRotated === false){
		TweenMax.to(path10626,1,{rotation:25, transformOrigin: "0% 0%"});
		TweenMax.to(path10626copy,1,{rotation:25, transformOrigin: "0% 0%"});
		fzDoorSwitchRotated=true;
	}else{
		TweenMax.to(path10626,1,{rotation:0});
		TweenMax.to(path10626copy,1,{rotation:0});
		fzDoorSwitchRotated=false;
	}
}

var cupSwitchRotated=false;
cupSwitch.setAttribute('onclick','changecupSwitch();');
cupSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changecupSwitch(){
	if(cupSwitchRotated === false){
		TweenMax.to(path11098,1,{rotation:-25, transformOrigin: "0% 0%"});
		TweenMax.to(path11098copy,1,{rotation:-25, transformOrigin: "0% 0%"});
		cupSwitchRotated=true;
	}else{
		TweenMax.to(path11098,1,{rotation:0});
		TweenMax.to(path11098copy,1,{rotation:0});
		cupSwitchRotated=false;
	}
}

var fzImBimetalRotated=false;
fzImBimetal.setAttribute('onclick','changefzImBimetal();');
fzImBimetal.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changefzImBimetal(){
	if(fzImBimetalRotated === false){
		TweenMax.to(path5397,1,{rotation:25, transformOrigin: "0% 0%"});
		TweenMax.to(path5397copy,1,{rotation:25, transformOrigin: "0% 0%"});
		fzImBimetalRotated=true;
	}else{
		TweenMax.to(path5397,1,{rotation:0});
		TweenMax.to(path5397copy,1,{rotation:0});
		fzImBimetalRotated=false;
	}
}

var brewModPresentRotated=false;
brewModPresent.setAttribute('onclick','changebrewModPresent();');
brewModPresent.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changebrewModPresent(){
	if(brewModPresentRotated === false){
		TweenMax.to(path5403,1,{rotation:-25, transformOrigin: "100% 0%"});
		TweenMax.to(path5403copy,1,{rotation:-25, transformOrigin: "100% 0%"});
		brewModPresentRotated=true;
	}else{
		TweenMax.to(path5403,1,{rotation:0});
		TweenMax.to(path5403copy,1,{rotation:0});
		brewModPresentRotated=false;
	}
}

var nozzlePosSwitchRotated=false;
nozzlePosSwitch.setAttribute('onclick','changenozzlePosSwitch();');
nozzlePosSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changenozzlePosSwitch(){
	if(nozzlePosSwitchRotated === false){
		TweenMax.to(path5409,1,{rotation:23, transformOrigin: "100% 0%"});
		TweenMax.to(path5409copy,1,{rotation:23, transformOrigin: "100% 0%"});
		nozzlePosSwitchRotated=true;
	}else{
		TweenMax.to(path5409,1,{rotation:0});
		TweenMax.to(path5409copy,1,{rotation:0});
		nozzlePosSwitchRotated=false;
	}
}

var pladdleSwitchRotated=false;
pladdleSwitch.setAttribute('onclick','changepladdleSwitch();');
pladdleSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changepladdleSwitch(){
	if(pladdleSwitchRotated === false){
		TweenMax.to(path67358,1,{rotation:80, transformOrigin: "100% 0%"});
		TweenMax.to(path67358copy,1,{rotation:80, transformOrigin: "100% 0%"});
		pladdleSwitchRotated=true;
	}else{
		TweenMax.to(path67358,1,{rotation:0});
		TweenMax.to(path67358copy,1,{rotation:0});
		pladdleSwitchRotated=false;
	}
}

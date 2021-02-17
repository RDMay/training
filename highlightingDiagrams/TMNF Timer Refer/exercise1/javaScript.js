document.title = "TMNF Highlight Exercise 1"

var originalLineSize = "1px";
var highlightedWidth = "3px";


var deviceType = "not mobile";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  deviceType="mobile"
}

xhr = new XMLHttpRequest();
xhr.open("GET","schematic.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);

//Set Path Codes
var diagram1Paths = document.getElementById("diagram1").getElementsByTagName("path");
var diagram1PathsLength = diagram1Paths.length;

for(i=0; i<diagram1PathsLength; i++){
  diagram1Paths[i].style['stroke-linecap']="round";
  diagram1Paths[i].style.stroke = "Black";
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke','blue');
  path.setAttribute('fill','none');
  path.setAttribute('opacity',0);
  path.setAttribute('id',diagram1Paths[i].id + 'copy');

  if(deviceType == "mobile"){
    path.setAttribute('onclick','wireClicked(this);');
    // path.setAttribute('ontouchstart','wireClicked(this);');
    // path.setAttribute('ontouchend','wireClicked(this);');
    // path.setAttribute('onmouseover','wireClicked(this);');
    }else{
      path.setAttribute('onclick','wireClicked(this);');
      path.setAttribute('onmouseover','this.style.cursor = "default";');
    }
    path.style['stroke-linecap']="round";
    path.setAttribute("d", diagram1Paths[i].getAttribute("d"));
    diagram1.appendChild(path);
    path.style["stroke-width"]= 8;
}

function colorPickerChange(e){
  var highlightColor = document.getElementById("colorPicker").value;
}

function wireClicked(wire){
  nameSplit = wire.id.split("copy");
  wire2 = document.getElementById(nameSplit[0]);
  if(wire2.style["stroke-width"] == 1 || wire2.style["stroke-width"] == '1px'){
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

var l1Array = []; var l2Array = []; var grayArray = []; var neutralArray = []; var darkGrayArray = []; var aquamarineArray = []; var dcMinusArray = []; var rpmFeedBackArray = []; var violetArray = []; var pinkArray = []; var yellowGreenArray = []; var speedControlArray = []; var energizedLoadArray = []; var dcPlusArray = []; var commArray = [];

function getColors(){
  l1Array = []; grayArray = []; neutralArray = []; darkGrayArray = []; aquamarineArray = []; dcMinusArray = []; rpmFeedBackArray = []; violetArray = []; pinkArray = []; yellowGreenArray = []; speedControlArray = []; energizedLoadArray = []; dcPlusArray = []; unkArray = [];
    for(i=0; i<diagram1PathsLength; i++){
      if(diagram1Paths[i].style["stroke-width"] != originalLineSize) {
        switch(diagram1Paths[i].style.stroke) {
        case "rgb(255, 0, 0)":
          l1Array.push(diagram1Paths[i].id);
        break;
        case "#ff0000":
          l1Array.push(diagram1Paths[i].id);
        break;
        case "rgb(72, 72, 72)":
          l2Array.push(diagram1Paths[i].id);
        break;
        case "#484848":
          l2Array.push(diagram1Paths[i].id);
        break;
        case "rgb(255, 165, 0)":
          neutralArray.push(diagram1Paths[i].id);
        break;
        case "#ffa500 ":
          neutralArray.push(diagram1Paths[i].id);
        break;


        case "rgb(249, 231, 159)":
          energizedLoadArray.push(diagram1Paths[i].id);
        break;
        case "#f9e79f":
          energizedLoadArray.push(diagram1Paths[i].id);
        break;
        case "rgb(255, 102, 102)":
          dcPlusArray.push(diagram1Paths[i].id);
        break;
        case "rgb(0, 0, 0)":
          dcMinusArray.push(diagram1Paths[i].id);
        break;
        case "rgb(65, 105, 225)":
          rpmFeedBackArray.push(diagram1Paths[i].id);
        break;
        case "rgb(0, 0, 255)":
          speedControlArray.push(diagram1Paths[i].id);
        break;
        case "rgb(0, 0, 255)":
          speedControlArray.push(diagram1Paths[i].id);
        break;
        case "rgb(30, 144, 255)":
          commArray.push(diagram1Paths[i].id);
        break;
        }
      }
    }
    console.log("l1ArrayKey = [" + l1Array + "];" + "\n" + "l2ArrayKey = [" + l2Array + "];" + "\n" + "neutralArrayKey = [" + neutralArray + "];" + "\n" + "energizedLoadArrayKey = ["  + energizedLoadArray + "];" + "\n" + "dcPlusArrayKey = [" + dcPlusArray + "];" + "\n" + "dcMinusArrayKey = [" + dcMinusArray + "];" + "\n" + "rpmFeedBackArrayKey = [" + rpmFeedBackArray + "];" + "\n" + "speedControlArrayKey = [" + speedControlArray + "];" + "\n"  + "commArrayKey = [" + commArray + "];" + "\n");
}

l1ArrayKey = ['path1583-6','path2783','path1077','path2691','path178-2','path2775','path162-5','defrostControlWiper','tcBlade'];
neutralArrayKey = ['path1587','path294','path1116','path1099','path1101','path1103'];
energizedLoadArrayKey = ['evapFanMotor'];
dcPlusArrayKey = [];
dcMinusArrayKey = [];
rpmFeedBackArrayKey = [];
speedControlArrayKey = [];

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
  // for(a=0; a<dcPlusArrayKey.length; a++){
  //   if(dcPlusArrayKey.includes(dcPlusArray[a]) == false || dcPlusArray.length != dcPlusArrayKey.length){
  //     answerArray.push("false")
  //   }
  // }
  // for(a=0; a<dcMinusArrayKey.length; a++){
  //   if(dcMinusArrayKey.includes(dcMinusArray[a]) == false || dcMinusArray.length != dcMinusArrayKey.length){
  //     answerArray.push("false")
  //   }
  // }
  // for(a=0; a<rpmFeedBackArrayKey.length; a++){
  //   if(rpmFeedBackArrayKey.includes(rpmFeedBackArray[a]) == false || rpmFeedBackArray.length != rpmFeedBackArrayKey.length){
  //     answerArray.push("false")
  //   }
  // }
  // for(a=0; a<speedControlArrayKey.length; a++){
  //   if(speedControlArrayKey.includes(speedControlArray[a]) == false || speedControlArray.length != speedControlArrayKey.length){
  //     answerArray.push("false")
  //   }
  // }
  for(a=0; a<energizedLoadArrayKey.length; a++){
    if(energizedLoadArrayKey.includes(energizedLoadArray[a]) == false || energizedLoadArray.length != energizedLoadArrayKey.length){
      answerArray.push("false")
    }
  }

  // if(ccSwitchRotated === true){
  //   answerArray.push("false")
  // }
  //
  // if(timerSwitchRotated === true){
  //   answerArray.push("false")
  // }

  if(answerArray.includes('false')){
    // console.log(answerArray)
    alert("Incorrect, please try again.")
  }else{
    alert("8359")
  }
}

function closeMenu(){
  menuSpan.setAttribute('class', 'uiHiddenClass')
}

function openMenu(){
  menuSpan.setAttribute('class', 'uiClass')
}

//Switch Codesvar ccSwitchRotated=false;
var ccSwitchRotated=false;
ccSwitch.setAttribute('onclick','changeccSwitch();');
ccSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeccSwitch(){
	if(ccSwitchRotated === false){
		TweenMax.to(tcBlade,1,{rotation:-30});
		TweenMax.to(tcBladecopy,1,{rotation:-30});
		ccSwitchRotated=true;
	}else{
		TweenMax.to(tcBlade,1,{rotation:0});
		TweenMax.to(tcBladecopy,1,{rotation:0});
		ccSwitchRotated=false;
	}
}

var timerSwitchRotated=false;
timerSwitch.setAttribute('onclick','changeTimerSwitch();');
timerSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changeTimerSwitch(){
	if(timerSwitchRotated === false){
		TweenMax.to(defrostControlWiper,1,{rotation:-33});
		TweenMax.to(defrostControlWipercopy,1,{rotation:-33});
		timerSwitchRotated=true;
	}else{
		TweenMax.to(defrostControlWiper,1,{rotation:0});
		TweenMax.to(defrostControlWipercopy,1,{rotation:0});
		timerSwitchRotated=false;
	}
}

var doorSwitchRotated=false;
doorSwitch.setAttribute('onclick','changeDoorSwitch();');
doorSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changeDoorSwitch(){
	if(doorSwitchRotated === false){
		TweenMax.to(path200,1,{rotation:-26});
		TweenMax.to(path200copy,1,{rotation:-26});
		doorSwitchRotated=true;
	}else{
		TweenMax.to(path200,1,{rotation:0});
		TweenMax.to(path200copy,1,{rotation:0});
		doorSwitchRotated=false;
	}
}

var defrostThermostatRotated=false;
defrostThermostat.setAttribute('onclick','changeDefrostThermostatSwitch();');
defrostThermostat.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeDefrostThermostatSwitch(){
	if(defrostThermostatRotated === false){
		TweenMax.to(path334,1,{rotation:30});
		TweenMax.to(path334copy,1,{rotation:30});
		defrostThermostatRotated=true;
	}else{
		TweenMax.to(path334,1,{rotation:0});
		TweenMax.to(path334copy,1,{rotation:0});
		defrostThermostatRotated=false;
	}
}

var waterValveSwitchRotated=false;
waterValveSwitch.setAttribute('onclick','changeIMSwitch();');
waterValveSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeIMSwitch(){
	if(waterValveSwitchRotated === false){
		TweenMax.to(IMSwitch,1,{rotation:-28});
		TweenMax.to(IMSwitchcopy,1,{rotation:-28});
		waterValveSwitchRotated=true;
	}else{
		TweenMax.to(IMSwitch,1,{rotation:0});
		TweenMax.to(IMSwitchcopy,1,{rotation:0});
		waterValveSwitchRotated=false;
	}
}

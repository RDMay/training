document.title = "TMNF Electronic Highlight Exercise 1"

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
        case "rgb(72, 72, 72)":
          l2Array.push(diagram1Paths[i].id);
        break;
        case "rgb(255, 165, 0)":
          neutralArray.push(diagram1Paths[i].id);
        break;
        case "rgb(249, 231, 159)":
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

l1ArrayKey = ['path6367','path106','path1154'];
neutralArrayKey = ['path6357','path6361','path7069','path7071','path7073','path7075','path7077','path7079'];
energizedLoadArrayKey = [];
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
  for(a=0; a<energizedLoadArrayKey.length; a++){
    if(energizedLoadArrayKey.includes(energizedLoadArray[a]) == false || energizedLoadArray.length != energizedLoadArrayKey.length){
      answerArray.push("false")
    }
  }

  if(answerArray.includes('false')){
    alert("Incorrect, please try again.")
  }else{
    alert("3068")
  }
}

function closeMenu(){
  console.log(instructionDiv.getAttribute('class'))
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
timerSwitch_btn.setAttribute('onclick','changeTimerSwitch();');
timerSwitch_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changeTimerSwitch(){
	if(timerSwitchRotated === false){
		TweenMax.to(defrostControlWiper,1,{rotation:-60});
		TweenMax.to(defrostControlWipercopy,1,{rotation:-60});
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
		TweenMax.to(doorSwitchBlade,1,{rotation:-26});
		TweenMax.to(doorSwitchBladecopy,1,{rotation:-26});
		doorSwitchRotated=true;
	}else{
		TweenMax.to(doorSwitchBlade,1,{rotation:0});
		TweenMax.to(doorSwitchBladecopy,1,{rotation:0});
		doorSwitchRotated=false;
	}
}

var defrostThermostatRotated=false;
defrostThermostat_btn.setAttribute('onclick','changeDefrostThermostatSwitch();');
defrostThermostat_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeDefrostThermostatSwitch(){
	if(defrostThermostatRotated === false){
		TweenMax.to(defrostThermostat1Blade,1,{rotation:30});
		TweenMax.to(defrostThermostat1Bladecopy,1,{rotation:30});
		TweenMax.to(path324,1,{y:3});
		defrostThermostatRotated=true;
	}else{
		TweenMax.to(defrostThermostat1Blade,1,{rotation:0});
		TweenMax.to(defrostThermostat1Bladecopy,1,{rotation:0});
		TweenMax.to(path324,1,{y:0});
		defrostThermostatRotated=false;
	}
}

var defrostThermostat2Rotated=false;
defrostThermostat2_btn.setAttribute('onclick','changeDefrostThermostat2Switch();');
defrostThermostat2_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeDefrostThermostat2Switch(){
	if(defrostThermostat2Rotated === false){
		TweenMax.to(defrostThermostat2Blade,1,{rotation:30});
		TweenMax.to(defrostThermostat2Bladecopy,1,{rotation:30});
		TweenMax.to(path324,1,{y:3});
		defrostThermostat2Rotated=true;
	}else{
		TweenMax.to(defrostThermostat2Blade,1,{rotation:0});
		TweenMax.to(defrostThermostat2Bladecopy,1,{rotation:0});
		TweenMax.to(path324,1,{y:0});
		defrostThermostat2Rotated=false;
	}
}

var waterValveSwitchRotated=false;
waterValveSwitch_btn.setAttribute('onclick','changeIMSwitch();');
waterValveSwitch_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeIMSwitch(){
	if(waterValveSwitchRotated === false){
		TweenMax.to(waterValveSwitch,1,{rotation:-28});
		TweenMax.to(waterValveSwitchcopy,1,{rotation:-28});
		waterValveSwitchRotated=true;
	}else{
		TweenMax.to(waterValveSwitch,1,{rotation:0});
		TweenMax.to(waterValveSwitchcopy,1,{rotation:0});
		waterValveSwitchRotated=false;
	}
}

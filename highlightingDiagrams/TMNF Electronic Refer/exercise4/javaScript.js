document.title = "TMNF Electronic Highlight Exercise 4"

var originalLineSize = "1px";
var highlightedWidth = "3px";

var deviceType = "not mobile";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  deviceType="mobile"
}

xhr = new XMLHttpRequest();
xhr.open("GET","../schematic.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);

l1ArrayKey = ['path6367','path106','path1154','path7109','timerSwitch'];
neutralArrayKey = ['path6357','path328','path1118','path1120','path7069','path7071','path7073','path7075','path7077','defrostThermostat','defrostThermostat2','path1470'];
energizedLoadArrayKey = ['path6996'];
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

  if(timerSwitchRotated === false){
    answerArray.push("false")
  }

  if(defrostThermostatRotated === true){
    answerArray.push("false")
  }

  if(defrostThermostat2Rotated === true){
    answerArray.push("false")
  }

  if(answerArray.includes('false')){
    // console.log(answerArray)
    alert("Incorrect, please try again.")
  }else{
    alert("8359")
  }
}

//Switch Codesvar ccSwitchRotated=false;
var ccSwitchRotated=false;
ccSwitch_btn.setAttribute('onclick','changeccSwitch();');
ccSwitch_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeccSwitch(){
	if(ccSwitchRotated === false){
		TweenMax.to(ccSwitch,1,{rotation:-30});
		TweenMax.to(ccSwitchcopy,1,{rotation:-30});
		ccSwitchRotated=true;
	}else{
		TweenMax.to(ccSwitch,1,{rotation:0});
		TweenMax.to(ccSwitchcopy,1,{rotation:0});
		ccSwitchRotated=false;
	}
}

var timerSwitchRotated=false;
timerSwitch_btn.setAttribute('onclick','changeTimerSwitch();');
timerSwitch_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changeTimerSwitch(){
	if(timerSwitchRotated === false){
		TweenMax.to(timerSwitch,1,{rotation:-62});
		TweenMax.to(timerSwitchcopy,1,{rotation:-62});
		timerSwitchRotated=true;
	}else{
		TweenMax.to(timerSwitch,1,{rotation:0});
		TweenMax.to(timerSwitchcopy,1,{rotation:0});
		timerSwitchRotated=false;
	}
}

var doorSwitchRotated=false;
doorSwitch_btn.setAttribute('onclick','changeDoorSwitch();');
doorSwitch_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');

function changeDoorSwitch(){
	if(doorSwitchRotated === false){
		TweenMax.to(doorSwitch,1,{rotation:-26});
		TweenMax.to(doorSwitchcopy,1,{rotation:-26});
		doorSwitchRotated=true;
	}else{
		TweenMax.to(doorSwitch,1,{rotation:0});
		TweenMax.to(doorSwitchcopy,1,{rotation:0});
		doorSwitchRotated=false;
	}
}

var defrostThermostatRotated=false;
defrostThermostat_btn.setAttribute('onclick','changeDefrostThermostatSwitch();');
defrostThermostat_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeDefrostThermostatSwitch(){
	if(defrostThermostatRotated === false){
		TweenMax.to(defrostThermostat,1,{rotation:30});
		TweenMax.to(defrostThermostatcopy,1,{rotation:30});
		defrostThermostatRotated=true;
	}else{
		TweenMax.to(defrostThermostat,1,{rotation:0});
		TweenMax.to(defrostThermostatcopy,1,{rotation:0});
		defrostThermostatRotated=false;
	}
}

var defrostThermostat2Rotated=false;
defrostThermostat2_btn.setAttribute('onclick','changeDefrostThermostat2Switch();');
defrostThermostat2_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeDefrostThermostat2Switch(){
	if(defrostThermostat2Rotated === false){
		TweenMax.to(defrostThermostat2,1,{rotation:30});
		TweenMax.to(defrostThermostat2copy,1,{rotation:30});
		defrostThermostat2Rotated=true;
	}else{
		TweenMax.to(defrostThermostat2,1,{rotation:0});
		TweenMax.to(defrostThermostat2copy,1,{rotation:0});
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

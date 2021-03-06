document.title = "SXS Electronic Highlight Exercise 4"

var originalLineSize = .5;
var highlightedWidth = 1.25;

var deviceType = "not mobile";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  deviceType="mobile"
}

xhr = new XMLHttpRequest();
xhr.open("GET","../schematic.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);

l1ArrayKey = ['path410','path46206','path4785','path4797','path2235','path2237','path2371','path2387','compressorRelay'];
neutralArrayKey = ['path3352','path392'];
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
  // for(a=0; a<energizedLoadArrayKey.length; a++){
  //   if(energizedLoadArrayKey.includes(energizedLoadArray[a]) == false || energizedLoadArray.length != energizedLoadArrayKey.length){
  //     answerArray.push("false")
  //   }
  // }
  //
  if(compressorRelayRotated === false){
    answerArray.push("false")
  }

  if(answerArray.includes('false')){
    alert("Incorrect, please try again.")
  }else{
    alert("Correct! Code:5799")
  }
}


var ffDoorSwitchRotated=false;
ffDoorSwitch_btn.setAttribute('onclick','changeffDoorSwitch();');
ffDoorSwitch_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeffDoorSwitch(){
	if(ffDoorSwitchRotated === false){
		TweenMax.to(ffDoorSwitch,1,{rotation:-30});
		TweenMax.to(ffDoorSwitchcopy,1,{rotation:-30});
		ffDoorSwitchRotated=true;
	}else{
		TweenMax.to(ffDoorSwitch,1,{rotation:0});
		TweenMax.to(ffDoorSwitchcopy,1,{rotation:0});
		ffDoorSwitchRotated=false;
	}
}

var fzDoorSwitchRotated=false;
fzDoorSwitch_btn.setAttribute('onclick','changefzDoorSwitch();');
fzDoorSwitch_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changefzDoorSwitch(){
	if(fzDoorSwitchRotated === false){
		TweenMax.to(fzDoorSwitch,1,{rotation:-60});
		TweenMax.to(fzDoorSwitchcopy,1,{rotation:-60});
		fzDoorSwitchRotated=true;
	}else{
		TweenMax.to(fzDoorSwitch,1,{rotation:0});
		TweenMax.to(fzDoorSwitchcopy,1,{rotation:0});
		fzDoorSwitchRotated=false;
	}
}

var highLimitSwitchRotated=false;
highLimitSwitch_btn.setAttribute('onclick','changehighLimitSwitch();');
highLimitSwitch_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changehighLimitSwitch(){
	if(highLimitSwitchRotated === false){
		TweenMax.to(highLimitSwitch,1,{rotation:30});
		TweenMax.to(highLimitSwitchcopy,1,{rotation:30});
		highLimitSwitchRotated=true;
	}else{
		TweenMax.to(highLimitSwitch,1,{rotation:0});
		TweenMax.to(highLimitSwitchcopy,1,{rotation:0});
		highLimitSwitchRotated=false;
	}
}

var highLimitSwitch2Rotated=false;
highLimitSwitch2_btn.setAttribute('onclick','changehighLimitSwitch2();');
highLimitSwitch2_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changehighLimitSwitch2(){
	if(highLimitSwitch2Rotated === false){
		TweenMax.to(highLimitSwitch2,1,{rotation:30});
		TweenMax.to(highLimitSwitch2copy,1,{rotation:30});
		highLimitSwitch2Rotated=true;
	}else{
		TweenMax.to(highLimitSwitch2,1,{rotation:0});
		TweenMax.to(highLimitSwitch2copy,1,{rotation:0});
		highLimitSwitch2Rotated=false;
	}
}

var augerRelayRotated=false;
augerRelay_btn.setAttribute('onclick','changeaugerRelay();');
augerRelay_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeaugerRelay(){
	if(augerRelayRotated === false){
		TweenMax.to(augerRelay,1,{rotation:-27});
		TweenMax.to(augerRelaycopy,1,{rotation:-27});
		augerRelayRotated=true;
	}else{
		TweenMax.to(augerRelay,1,{rotation:0});
		TweenMax.to(augerRelaycopy,1,{rotation:0});
		augerRelayRotated=false;
	}
}

var cubeRelayRotated=false;
cubeRelay_btn.setAttribute('onclick','changecubeRelay();');
cubeRelay_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changecubeRelay(){
	if(cubeRelayRotated === false){
		TweenMax.to(cubeRelay,1,{rotation:-27});
		TweenMax.to(cubeRelaycopy,1,{rotation:-27});
		cubeRelayRotated=true;
	}else{
		TweenMax.to(cubeRelay,1,{rotation:0});
		TweenMax.to(cubeRelaycopy,1,{rotation:0});
		cubeRelayRotated=false;
	}
}

var heaterRelayRotated=false;
heaterRelay_btn.setAttribute('onclick','changeheaterRelay();');
heaterRelay_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changeheaterRelay(){
	if(heaterRelayRotated === false){
		TweenMax.to(heaterRelay,1,{rotation:32});
		TweenMax.to(heaterRelaycopy,1,{rotation:32});
		heaterRelayRotated=true;
	}else{
		TweenMax.to(heaterRelay,1,{rotation:0});
		TweenMax.to(heaterRelaycopy,1,{rotation:0});
		heaterRelayRotated=false;
	}
}

var compressorRelayRotated=false;
compressorRelay_btn.setAttribute('onclick','changecompressorRelay();');
compressorRelay_btn.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changecompressorRelay(){
	if(compressorRelayRotated === false){
		TweenMax.to(compressorRelay,1,{rotation:-28});
		TweenMax.to(compressorRelaycopy,1,{rotation:-28});
		compressorRelayRotated=true;
	}else{
		TweenMax.to(compressorRelay,1,{rotation:0});
		TweenMax.to(compressorRelaycopy,1,{rotation:0});
		compressorRelayRotated=false;
	}
}

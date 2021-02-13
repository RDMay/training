var positionAndScale = "";

var instant = .1;

var off1=-55;
var Vdc=-35;
var Vac=-18;
var ohms=55;
var diode=67;
var cap=90;
var degreesF=115;
var degreesC=138;
var hz=162;
var microAmps=185;
var milliAmps=200;
var amps=215;
var off2=235;
var readingType;

blackLead.addEventListener('click', blackLeadClicked);
function blackLeadClicked(){
  blackLead.style.opacity = 1;
  redLead.style.opacity = 0;
}

redLead.addEventListener('click', redLeadClicked);
function redLeadClicked(){
  blackLead.style.opacity = 0;
  redLead.style.opacity = 1;
}

off_btn.style.cursor = 'pointer';
off_btn.addEventListener('click', off_btnClicked);
function off_btnClicked(){
  TweenMax.to(meterKnob, instant, {rotation:off1,transformOrigin: "50% 50%"});
	changeMeterFunction(off)
}

vdc_btn.style.cursor = 'pointer';
vdc_btn.addEventListener('click', vdc_btnClicked);
function vdc_btnClicked(){
  TweenMax.to(meterKnob, instant, {rotation:Vdc,transformOrigin: "50% 50%"});
	changeMeterFunction('Vdc')
}

vac_btn.style.cursor = 'pointer';
vac_btn.addEventListener('click', vac_btnClicked);
function vac_btnClicked(){
  TweenMax.to(meterKnob, instant, {rotation:Vac,transformOrigin: "50% 50%"});
	changeMeterFunction('Vac');
}



TweenMax.to(meterKnob, .001, {rotation:off1,transformOrigin: "50% 50%", onComplete:changeMeterFunction, onCompleteParams:["off"]})

function changeMeterFunction(meterSetting){
	TweenMax.to([meterPolarity], .001, {autoAlpha:0})
	TweenMax.to([meterHoldIndicator], .001, {autoAlpha:0})
	TweenMax.to([meterAutoIndicator], .001, {autoAlpha:0})
	TweenMax.to([meterDCIndicator], .001, {autoAlpha:0})
	TweenMax.to([meterACIndicator], .001, {autoAlpha:0})
	TweenMax.to([meterText], .001, {autoAlpha:0})
	TweenMax.to([ohmsSymbol], .001, {autoAlpha:0});
	TweenMax.to([voltSymbol], .001, {autoAlpha:0});
	meterVoltagePrefix.textContent = "";
	ohmsPrefix.textContent = "";

	switch(meterSetting) {
	   case "Vdc":
		 readingType = "VDC";
				TweenMax.to([meterText], .001, {autoAlpha:1});
	    	TweenMax.to([meterDCIndicator], .001, {autoAlpha:1});
				TweenMax.to([meterAutoIndicator], .001, {autoAlpha:1});
				TweenMax.to([voltSymbol], .001, {autoAlpha:1});
      break;
      case "Vac":
				readingType = "VAC";
				TweenMax.to([meterText], .001, {autoAlpha:1});
				TweenMax.to([meterACIndicator], .001, {autoAlpha:1});
				TweenMax.to([meterAutoIndicator], .001, {autoAlpha:1});
				TweenMax.to([voltSymbol], .001, {autoAlpha:1});
      break;
		}
		readMeter();
}

function showReading(meterReading){
	meterReading = meterReading.split("_");
	if(meterReading[4] == "a"){
		dot1.style.opacity = 1;
		dot2.style.opacity = 0;
		dot3.style.opacity = 0;
	}
	if(meterReading[4] == "b"){
		dot1.style.opacity = 0;
		dot2.style.opacity = 1;
		dot3.style.opacity = 0;
	}
	if(meterReading[4] == "c"){
		dot1.style.opacity = 0;
		dot2.style.opacity = 0;
		dot3.style.opacity = 1;
	}
	for(i=0; i<meterReading.length; i++){
		switch(meterReading[i]) {
		   case "1":
			 if(i==0){
				 thousandsA.style.opacity = 0;
				 thousandsB.style.opacity = 1;
				 thousandsC.style.opacity = 1;
				 thousandsD.style.opacity = 0;
				 thousandsE.style.opacity = 0;
				 thousandsF.style.opacity = 0;
				 thousandsG.style.opacity = 0;
			 }
			 if(i==1){
				 hundredsA.style.opacity = 0;
				 hundredsB.style.opacity = 1;
				 hundredsC.style.opacity = 1;
				 hundredsD.style.opacity = 0;
				 hundredsE.style.opacity = 0;
				 hundredsF.style.opacity = 0;
				 hundredsG.style.opacity = 0;
			 }
			 if(i==2){
				 tensA.style.opacity = 0;
				 tensB.style.opacity = 1;
				 tensC.style.opacity = 1;
				 tensD.style.opacity = 0;
				 tensE.style.opacity = 0;
				 tensF.style.opacity = 0;
				 tensG.style.opacity = 0;
			 }
			 if(i==3){
				 onesA.style.opacity = 0;
				 onesB.style.opacity = 1;
				 onesC.style.opacity = 1;
				 onesD.style.opacity = 0;
				 onesE.style.opacity = 0;
				 onesF.style.opacity = 0;
				 onesG.style.opacity = 0;
			 }
			 break;
			 case "2":
			 if(i==0){
				 thousandsA.style.opacity = 1;
				 thousandsB.style.opacity = 1;
				 thousandsC.style.opacity = 0;
				 thousandsD.style.opacity = 1;
				 thousandsE.style.opacity = 1;
				 thousandsF.style.opacity = 0;
				 thousandsG.style.opacity = 1;
			 }
			 if(i==1){
				 hundredsA.style.opacity = 1;
				 hundredsB.style.opacity = 1;
				 hundredsC.style.opacity = 0;
				 hundredsD.style.opacity = 1;
				 hundredsE.style.opacity = 1;
				 hundredsF.style.opacity = 0;
				 hundredsG.style.opacity = 1;
			 }
			 if(i==2){
				 tensA.style.opacity = 1;
				 tensB.style.opacity = 1;
				 tensC.style.opacity = 0;
				 tensD.style.opacity = 1;
				 tensE.style.opacity = 1;
				 tensF.style.opacity = 0;
				 tensG.style.opacity = 1;
			 }
			 if(i==3){
				 onesA.style.opacity = 1;
				 onesB.style.opacity = 1;
				 onesC.style.opacity = 0;
				 onesD.style.opacity = 1;
				 onesE.style.opacity = 1;
				 onesF.style.opacity = 0;
				 onesG.style.opacity = 1;
			 }
			 break;
			 case "3":
			 if(i==0){
				 thousandsA.style.opacity = 1;
				 thousandsB.style.opacity = 1;
				 thousandsC.style.opacity = 1;
				 thousandsD.style.opacity = 1;
				 thousandsE.style.opacity = 0;
				 thousandsF.style.opacity = 0;
				 thousandsG.style.opacity = 1;
			 }
			 if(i==1){
				 hundredsA.style.opacity = 1;
				 hundredsB.style.opacity = 1;
				 hundredsC.style.opacity = 1;
				 hundredsD.style.opacity = 1;
				 hundredsE.style.opacity = 0;
				 hundredsF.style.opacity = 0;
				 hundredsG.style.opacity = 1;
			 }
			 if(i==2){
				 tensA.style.opacity = 1;
				 tensB.style.opacity = 1;
				 tensC.style.opacity = 1;
				 tensD.style.opacity = 1;
				 tensE.style.opacity = 0;
				 tensF.style.opacity = 0;
				 tensG.style.opacity = 1;
			 }
			 if(i==3){
				 onesA.style.opacity = 1;
				 onesB.style.opacity = 1;
				 onesC.style.opacity = 1;
				 onesD.style.opacity = 1;
				 onesE.style.opacity = 0;
				 onesF.style.opacity = 0;
				 onesG.style.opacity = 1;
			 }
			 break;
			 case "4":
			 if(i==0){
				 thousandsA.style.opacity = 0;
				 thousandsB.style.opacity = 1;
				 thousandsC.style.opacity = 1;
				 thousandsD.style.opacity = 0;
				 thousandsE.style.opacity = 0;
				 thousandsF.style.opacity = 1;
				 thousandsG.style.opacity = 1;
			 }
			 if(i==1){
				 hundredsA.style.opacity = 0;
				 hundredsB.style.opacity = 1;
				 hundredsC.style.opacity = 1;
				 hundredsD.style.opacity = 0;
				 hundredsE.style.opacity = 0;
				 hundredsF.style.opacity = 1;
				 hundredsG.style.opacity = 1;
			 }
			 if(i==2){
				 tensA.style.opacity = 0;
				 tensB.style.opacity = 1;
				 tensC.style.opacity = 1;
				 tensD.style.opacity = 0;
				 tensE.style.opacity = 0;
				 tensF.style.opacity = 1;
				 tensG.style.opacity = 1;
			 }
			 if(i==3){
				 onesA.style.opacity = 0;
				 onesB.style.opacity = 1;
				 onesC.style.opacity = 1;
				 onesD.style.opacity = 0;
				 onesE.style.opacity = 0;
				 onesF.style.opacity = 1;
				 onesG.style.opacity = 1;
			 }
			 break;
			 case "5":
			 if(i==0){
				 thousandsA.style.opacity = 1;
				 thousandsB.style.opacity = 0;
				 thousandsC.style.opacity = 1;
				 thousandsD.style.opacity = 1;
				 thousandsE.style.opacity = 0;
				 thousandsF.style.opacity = 1;
				 thousandsG.style.opacity = 1;
			 }
			 if(i==1){
				 hundredsA.style.opacity = 1;
				 hundredsB.style.opacity = 0;
				 hundredsC.style.opacity = 1;
				 hundredsD.style.opacity = 1;
				 hundredsE.style.opacity = 0;
				 hundredsF.style.opacity = 1;
				 hundredsG.style.opacity = 1;
			 }
			 if(i==2){
				 tensA.style.opacity = 1;
				 tensB.style.opacity = 0;
				 tensC.style.opacity = 1;
				 tensD.style.opacity = 1;
				 tensE.style.opacity = 0;
				 tensF.style.opacity = 1;
				 tensG.style.opacity = 1;
			 }
			 if(i==3){
				 onesA.style.opacity = 1;
				 onesB.style.opacity = 0;
				 onesC.style.opacity = 1;
				 onesD.style.opacity = 1;
				 onesE.style.opacity = 0;
				 onesF.style.opacity = 1;
				 onesG.style.opacity = 1;
			 }
			 break;
			 case "6":
			 if(i==0){
				 thousandsA.style.opacity = 1;
				 thousandsB.style.opacity = 0;
				 thousandsC.style.opacity = 1;
				 thousandsD.style.opacity = 1;
				 thousandsE.style.opacity = 1;
				 thousandsF.style.opacity = 1;
				 thousandsG.style.opacity = 1;
			 }
			 if(i==1){
				 hundredsA.style.opacity = 1;
				 hundredsB.style.opacity = 0;
				 hundredsC.style.opacity = 1;
				 hundredsD.style.opacity = 1;
				 hundredsE.style.opacity = 1;
				 hundredsF.style.opacity = 1;
				 hundredsG.style.opacity = 1;
			 }
			 if(i==2){
				 tensA.style.opacity = 1;
				 tensB.style.opacity = 0;
				 tensC.style.opacity = 1;
				 tensD.style.opacity = 1;
				 tensE.style.opacity = 1;
				 tensF.style.opacity = 1;
				 tensG.style.opacity = 1;
			 }
			 if(i==3){
				 onesA.style.opacity = 1;
				 onesB.style.opacity = 0;
				 onesC.style.opacity = 1;
				 onesD.style.opacity = 1;
				 onesE.style.opacity = 1;
				 onesF.style.opacity = 1;
				 onesG.style.opacity = 1;
			 }
			 break;
			 case "7":
			 if(i==0){
				 thousandsA.style.opacity = 1;
				 thousandsB.style.opacity = 1;
				 thousandsC.style.opacity = 1;
				 thousandsD.style.opacity = 0;
				 thousandsE.style.opacity = 0;
				 thousandsF.style.opacity = 0;
				 thousandsG.style.opacity = 0;
			 }
			 if(i==1){
				 hundredsA.style.opacity = 1;
				 hundredsB.style.opacity = 1;
				 hundredsC.style.opacity = 1;
				 hundredsD.style.opacity = 0;
				 hundredsE.style.opacity = 0;
				 hundredsF.style.opacity = 0;
				 hundredsG.style.opacity = 0;
			 }
			 if(i==2){
				 tensA.style.opacity = 1;
				 tensB.style.opacity = 1;
				 tensC.style.opacity = 1;
				 tensD.style.opacity = 0;
				 tensE.style.opacity = 0;
				 tensF.style.opacity = 0;
				 tensG.style.opacity = 0;
			 }
			 if(i==3){
				 onesA.style.opacity = 1;
				 onesB.style.opacity = 1;
				 onesC.style.opacity = 1;
				 onesD.style.opacity = 0;
				 onesE.style.opacity = 0;
				 onesF.style.opacity = 0;
				 onesG.style.opacity = 0;
			 }
			 break;
			 case "8":
			 if(i==0){
				 thousandsA.style.opacity = 1;
				 thousandsB.style.opacity = 1;
				 thousandsC.style.opacity = 1;
				 thousandsD.style.opacity = 1;
				 thousandsE.style.opacity = 1;
				 thousandsF.style.opacity = 1;
				 thousandsG.style.opacity = 1;
			 }
			 if(i==1){
				 hundredsA.style.opacity = 1;
				 hundredsB.style.opacity = 1;
				 hundredsC.style.opacity = 1;
				 hundredsD.style.opacity = 1;
				 hundredsE.style.opacity = 1;
				 hundredsF.style.opacity = 1;
				 hundredsG.style.opacity = 1;
			 }
			 if(i==2){
				 tensA.style.opacity = 1;
				 tensB.style.opacity = 1;
				 tensC.style.opacity = 1;
				 tensD.style.opacity = 1;
				 tensE.style.opacity = 1;
				 tensF.style.opacity = 1;
				 tensG.style.opacity = 1;
			 }
			 if(i==3){
				 onesA.style.opacity = 1;
				 onesB.style.opacity = 1;
				 onesC.style.opacity = 1;
				 onesD.style.opacity = 1;
				 onesE.style.opacity = 1;
				 onesF.style.opacity = 1;
				 onesG.style.opacity = 1;
			 }
			 break;
			 case "9":
			 if(i==0){
				 thousandsA.style.opacity = 1;
				 thousandsB.style.opacity = 1;
				 thousandsC.style.opacity = 1;
				 thousandsD.style.opacity = 0;
				 thousandsE.style.opacity = 0;
				 thousandsF.style.opacity = 1;
				 thousandsG.style.opacity = 1;
			 }
			 if(i==1){
				 hundredsA.style.opacity = 1;
				 hundredsB.style.opacity = 1;
				 hundredsC.style.opacity = 1;
				 hundredsD.style.opacity = 0;
				 hundredsE.style.opacity = 0;
				 hundredsF.style.opacity = 1;
				 hundredsG.style.opacity = 1;
			 }
			 if(i==2){
				 tensA.style.opacity = 1;
				 tensB.style.opacity = 1;
				 tensC.style.opacity = 1;
				 tensD.style.opacity = 0;
				 tensE.style.opacity = 0;
				 tensF.style.opacity = 1;
				 tensG.style.opacity = 1;
			 }
			 if(i==3){
				 onesA.style.opacity = 1;
				 onesB.style.opacity = 1;
				 onesC.style.opacity = 1;
				 onesD.style.opacity = 1;
				 onesE.style.opacity = 1;
				 onesF.style.opacity = 1;
				 onesG.style.opacity = 0;
			 }
			 break;
			 case "0":
			 if(i==0 || meterReading[5] != readingType){
				 thousandsA.style.opacity = 1;
				 thousandsB.style.opacity = 1;
				 thousandsC.style.opacity = 1;
				 thousandsD.style.opacity = 1;
				 thousandsE.style.opacity = 1;
				 thousandsF.style.opacity = 1;
				 thousandsG.style.opacity = 0;
			 }
			 if(i==1 || meterReading[5] != readingType){
				 hundredsA.style.opacity = 1;
				 hundredsB.style.opacity = 1;
				 hundredsC.style.opacity = 1;
				 hundredsD.style.opacity = 1;
				 hundredsE.style.opacity = 1;
				 hundredsF.style.opacity = 1;
				 hundredsG.style.opacity = 0;
			 }
			 if(i==2 || meterReading[5] != readingType){
				 tensA.style.opacity = 1;
				 tensB.style.opacity = 1;
				 tensC.style.opacity = 1;
				 tensD.style.opacity = 1;
				 tensE.style.opacity = 1;
				 tensF.style.opacity = 1;
				 tensG.style.opacity = 0;
			 }
			 if(i==3 || meterReading[5] != readingType){
				 onesA.style.opacity = 1;
				 onesB.style.opacity = 1;
				 onesC.style.opacity = 1;
				 onesD.style.opacity = 1;
				 onesE.style.opacity = 1;
				 onesF.style.opacity = 1;
				 onesG.style.opacity = 0;
			 }
			 break;
			}
	}
}

thousandsA.style.opacity = 1;
thousandsB.style.opacity = 1;
thousandsC.style.opacity = 1;
thousandsD.style.opacity = 1;
thousandsE.style.opacity = 1;
thousandsF.style.opacity = 1;
thousandsG.style.opacity = 0;
hundredsA.style.opacity = 1;
hundredsB.style.opacity = 1;
hundredsC.style.opacity = 1;
hundredsD.style.opacity = 1;
hundredsE.style.opacity = 1;
hundredsF.style.opacity = 1;
hundredsG.style.opacity = 0;
tensA.style.opacity = 1;
tensB.style.opacity = 1;
tensC.style.opacity = 1;
tensD.style.opacity = 1;
tensE.style.opacity = 1;
tensF.style.opacity = 1;
tensG.style.opacity = 0;
onesA.style.opacity = 1;
onesB.style.opacity = 1;
onesC.style.opacity = 1;
onesD.style.opacity = 1;
onesE.style.opacity = 1;
onesF.style.opacity = 1;
onesG.style.opacity = 0;

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
  TweenMax.to(meterKnob, instant, {rotation:off1,transformOrigin: "50% 50%"})
}


vdc_btn.style.cursor = 'pointer';
vdc_btn.addEventListener('click', vdc_btnClicked);
function vdc_btnClicked(){
  TweenMax.to(meterKnob, instant, {rotation:Vdc,transformOrigin: "50% 50%"})
}

vac_btn.style.cursor = 'pointer';
vac_btn.addEventListener('click', vac_btnClicked);
function vac_btnClicked(){
  TweenMax.to(meterKnob, instant, {rotation:Vac,transformOrigin: "50% 50%"})
}


// TweenMax.to(meterKnob, instant, {rotation:Vdc,transformOrigin: "50% 50%"})
TweenMax.to(meterKnob, .001, {rotation:off1,transformOrigin: "50% 50%", onComplete:changeMeterFunction, onCompleteParams:["off"]})
function changeMeterFunction(setting){
	TweenMax.to([meterPolarity], .001, {autoAlpha:0})
		TweenMax.to([meterHoldIndicator], .001, {autoAlpha:0})
		TweenMax.to([meterAutoIndicator], .001, {autoAlpha:0})
		TweenMax.to([meterDCIndicator], .001, {autoAlpha:0})
		TweenMax.to([meterACIndicator], .001, {autoAlpha:0})
		meterVoltagePrefix.textContent = "";
		ohmsPrefix.textContent = "";
		TweenMax.to([meterText], .001, {autoAlpha:0})
		// TweenMax.to([off,offTwo,vac], instant, {fill:"black"});
		switch(setting) {
		case "off":
		// TweenMax.to([off], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
		// TweenMax.to([off], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
		// TweenMax.to([off], instant, {fill:"black"})
		break;
		case "offTwo":
		TweenMax.to([offTwo], instant, {fill:"red"})
		TweenMax.to([offTwo], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
		TweenMax.to([offTwo], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
		TweenMax.to([offTwo], instant, {fill:"black"})
		break;
	    case "Vdc":
	    TweenMax.to([display], .001, {autoAlpha:1})
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    TweenMax.to([meterAutoIndicator], .001, {autoAlpha:1})
		TweenMax.to([meterDCIndicator], .001, {autoAlpha:1})
		TweenMax.to([meterPolarity], .001, {autoAlpha:1})
		meterVoltagePrefix.textContent = "V";
        break;
        case "Vac":
        TweenMax.to([display], .001, {autoAlpha:1})
        TweenMax.to([meterPolarity], .001, {autoAlpha:0})
        TweenMax.to([meterText], .001, {autoAlpha:1})
		TweenMax.to([meterACIndicator], .001, {autoAlpha:1})
		TweenMax.to([meterAutoIndicator], .001, {autoAlpha:1})
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterVoltagePrefix.textContent = "V";
	    meterText.textContent = "000.0";
	    TweenMax.to([vac], instant, {fill:"red"})
	    TweenMax.to([vac], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([vac], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([vac], instant, {fill:"red"})
        break;
        case "ohms":
        TweenMax.to([display], .001, {autoAlpha:1})
		TweenMax.to([meterAutoIndicator], .001, {autoAlpha:1})
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterText.textContent = "O.L";
	    ohmsPrefix.textContent = "MΩ";
	    // TweenMax.to([ohms2], instant, {stroke:"red"})
	    // TweenMax.to([ohms2], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    // TweenMax.to([ohms2], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    // TweenMax.to([ohms2], instant, {stroke:"black", onComplete: updateLineNumber, onCompleteParams:[2, new Error().lineNumber]},'-=0')
        break;

        case "cap":
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterText.textContent = "0.000";
	    TweenMax.to([diode], instant, {stroke:"red"})
	    TweenMax.to([diode], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([diode], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([diode], instant, {stroke:"black"})
        break;
        case "degreesC":
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterText.textContent = "OL";
	    TweenMax.to([degreesC1], instant, {stroke:"red"})
	    TweenMax.to([degreesC1], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesC1], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesC1], instant, {stroke:"black"})
        break;
        case "degreesF":
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterText.textContent = "OL";
	    TweenMax.to([degreesF1], instant, {stroke:"red"})
	    TweenMax.to([degreesF1], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesF1], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesF1], instant, {stroke:"black"})
        break;
        case "hz":
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterText.textContent = "000.0";
	    TweenMax.to([degreesF1], instant, {stroke:"red"})
	    TweenMax.to([degreesF1], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesF1], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesF1], instant, {stroke:"black"})
        break;
}
}

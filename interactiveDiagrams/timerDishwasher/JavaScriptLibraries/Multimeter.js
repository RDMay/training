var positionAndScale = "";

var multmeterDrag = Draggable.create(multimeterGroup, {zIndexBoost:false});
multimeterGroup.addEventListener("DOMMouseScroll", function(e){zoomMeter(e)}, false)
multimeterGroup.onmouseover = function(){
	this.style.cursor="grab";
	showWindow.removeEventListener ("DOMMouseScroll", zoomHandler, false)
	scaleUp = this._gsTransform.scaleX;
};
multimeterGroup.onmousedown = function(){showWindowDrag[0].disable();};
multimeterGroup.onmouseup = function(){
	showWindowDrag[0].enable();
	codeText.innerHTML = this.id;
};
multimeterGroup.onmouseout = function(){showWindow.addEventListener ("DOMMouseScroll", zoomHandler, false);};

function zoomMeter(e){
	e.preventDefault();
	switch(e.detail>0) {
		case true:
		if(scaleUp > .5 ){
			scaleUp = scaleUp - .01;
			TweenMax.to(multimeterGroup, .5, {scaleX:scaleUp, scaleY:scaleUp, transformOrigin: "50% 50%", ease: Power0.easeNone});
		}
		break;
		case false:
		scaleUp = scaleUp + .01;
    	TweenMax.to(multimeterGroup, .5, {scaleX:scaleUp, scaleY:scaleUp, transformOrigin: "50% 50%", ease: Power0.easeNone});
        break;
    }
}


var blueDotDrag = Draggable.create([blueDot]);
var blueDotXPos = blueDot.getBBox().x + blueDot.getBBox().width/2;
var blueDotYPos = blueDot.getBBox().y + blueDot.getBBox().height/2;
blueDot.onmousedown = function(){showWindowDrag[0].disable(); multmeterDrag[0].disable();this.style.cursor="default"};
blueDot.onmouseup = function(){showWindowDrag[0].enable(); multmeterDrag[0].enable(); console.log(blueDotXPos + blueDot._gsTransform.x); console.log(blueDotYPos + blueDot._gsTransform.y)};

var off1=0;
var Vdc=18;
var Vac=35;
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

TweenMax.to(meterKnob, .001, {rotation:off1,transformOrigin: "100% 50%", onComplete:changeMeterFunction, onCompleteParams:["off"]})
function changeMeterFunction(setting){
	TweenMax.to([meterPolarity], .001, {autoAlpha:0}) 
		TweenMax.to([meterHoldIndicator], .001, {autoAlpha:0}) 
		TweenMax.to([meterAutoIndicator], .001, {autoAlpha:0}) 
		TweenMax.to([meterDCIndicator], .001, {autoAlpha:0}) 
		TweenMax.to([meterACIndicator], .001, {autoAlpha:0})
		TweenMax.to([displayDiodeSymbol], .001, {autoAlpha:0}) 
		meterVoltagePrefix.textContent = "";
		meterCapPrefix.textContent = "";
		ohmsPrefix.textContent = "";
		meterCapPrefix.textContent="";
		TweenMax.to([meterText], .001, {autoAlpha:0})
		TweenMax.to([off,offTwo,vdc,vac], instant, {fill:"black"});
		switch(setting) {
		case "off":
		TweenMax.to([off], instant, {fill:"red"})
		TweenMax.to([off], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
		TweenMax.to([off], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
		TweenMax.to([off], instant, {fill:"black"})
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
	    TweenMax.to([vdc], instant, {fill:"red"})
	    TweenMax.to([vdc], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([vdc], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([vdc], instant, {fill:"red"})
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
        case "diode":
        TweenMax.to([displayDiodeSymbol], .001, {autoAlpha:1}) 
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterText.textContent = "O.L";
	    ohmsPrefix.textContent = "";
	    TweenMax.to([diode], instant, {stroke:"red"})
	    TweenMax.to([diode], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([diode], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([diode], instant, {stroke:"black"})
        break;
        case "cap":
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterText.textContent = "0.000";
	    meterCapPrefix.textContent="nF";
	    TweenMax.to([diode], instant, {stroke:"red"})
	    TweenMax.to([diode], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([diode], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([diode], instant, {stroke:"black"})
        break;
        case "degreesC":
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterText.textContent = "OL";
	    meterCapPrefix.textContent="";
	    TweenMax.to([degreesC1], instant, {stroke:"red"})
	    TweenMax.to([degreesC1], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesC1], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesC1], instant, {stroke:"black"})
        break;
        case "degreesF":
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterText.textContent = "OL";
	    meterCapPrefix.textContent="";
	    TweenMax.to([degreesF1], instant, {stroke:"red"})
	    TweenMax.to([degreesF1], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesF1], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesF1], instant, {stroke:"black"})
        break;
        case "hz":
	    TweenMax.to([meterText], .001, {autoAlpha:1})
	    meterText.textContent = "000.0";
	    meterCapPrefix.textContent="";
	    TweenMax.to([degreesF1], instant, {stroke:"red"})
	    TweenMax.to([degreesF1], .25, {scaleX:1.5, scaleY:1.5, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesF1], .25, {scaleX:1, scaleY:1, transformOrigin: '50% 50%', ease: Back. easeOut.config( 1.7)})
	    TweenMax.to([degreesF1], instant, {stroke:"black"})
        break;
} 
}	



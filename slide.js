slide = new XMLHttpRequest();
slide.open("GET","slide.svg",false);
slide.overrideMimeType("image/svg+xml");
slide.send("");
var slide= document.getElementById("main").appendChild(slide.responseXML.documentElement);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var slideTl = new TimelineMax({onUpdate:updateSlider, paused:true});

//Player Controls
var audioKnob=Draggable.create(sliderKnob, {
	type: "x",
	bounds: sliderClickZone,
	onClick: function(){
		slideAudio.pause();
		slideTl.pause();
	},
	onDrag: function() {
		slideAudio.pause();
		slideTl.pause();
		slideTl.progress((sliderKnob._gsTransform.x/sliderLine.getBBox().width));
		TweenMax.to(pauseIcon, 0, {autoAlpha:1})
		TweenMax.to(playIcon, 0, {autoAlpha:0})
    	},
	onDragEnd: function() {
		slideAudio.currentTime = slideTl.time();
		slideTl.play();
		slideAudio.play();
		TweenMax.to(pauseIcon, 0, {autoAlpha:1})
		TweenMax.to(playIcon, 0, {autoAlpha:0})
  	}

});

function updateSlider(){
	sliderPos = sliderLine.getBBox().width*slideTl.progress();
	console.log(slideTl.progress())
	TweenMax.to(sliderKnob, 0, {x:sliderPos})
}

sliderClickZone.onclick = function sliderLineDown(e){
	var offSet = sliderLine.getBoundingClientRect().x;
	var newx = e.clientX - offSet;
	TweenMax.to(sliderKnob, 0, {x:newx})
	slideTl.progress(sliderKnob._gsTransform.x/sliderClickZone.getBBox().width);
	slideAudio.currentTime = slideTl.time();
	slideAudio.play();
	slideTl.play();
}

TweenMax.to(pauseIcon, 0, {autoAlpha:0})
isPlaying = false;
function pausePlayHandler(){
	if(isPlaying == false){
		slideTl.play();
		slideAudio.play();
		TweenMax.to(pauseIcon, 0, {autoAlpha:1})
		TweenMax.to(playIcon, 0, {autoAlpha:0})
		isPlaying = true;
	}else{
		slideTl.pause();
		slideAudio.pause();
		TweenMax.to(pauseIcon, 0, {autoAlpha:0})
		TweenMax.to(playIcon, 0, {autoAlpha:1})
		isPlaying = false;
	}
	
}
//End Player Controls


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Hide Code
var gArray = document.getElementsByTagName("g");
var tArray = document.getElementsByTagName("text");
var imageArray = document.getElementsByTagName("image");
var pathArray = document.getElementsByTagName("path");
var rectArray = document.getElementsByTagName("rect");
var objectArray=[];

for (i=0; i<gArray.length; i++) {
	objectArray.push(gArray[i]);
}
for (i=0; i<tArray.length; i++) {
	objectArray.push(tArray[i]);
}
for (i=0; i<imageArray.length; i++) {
	objectArray.push(imageArray[i]);
}
for (i=0; i<pathArray.length; i++) {
	objectArray.push(pathArray[i]);
}
for (i=0; i<rectArray.length; i++) {
	objectArray.push(rectArray[i]);
}
for (i=0; i<objectArray.length; i++) {
	objectArray[i].style.display="inline";
	groupNameSplit = objectArray[i].id.split("_");
	switch(groupNameSplit[1]) {
		case "hide":
		TweenMax.to(objectArray[i], .01, {autoAlpha:0})
		break;
		case "current":
		TweenMax.to(objectArray[i], .01, {autoAlpha:0})
		break;
	}
}
//End Hide Code

var boxArray = [];
var boxArrayIdsArray = [];
//Code for each diagram with current and highlights
var Diag1 = document.getElementById("Diag1_hide").getElementsByTagName("path");
var Diag1Length=Diag1.length;
var linesWithCurrentArray=[];
var traceArray = [];

for(i=0; i<Diag1Length; i++){
	//Make all lines same size, stroke, line-cap
	Diag1[i].setAttribute('stroke','black');
	Diag1[i].setAttribute('fill','none');
	Diag1[i].style['stroke-width']=1;
	// window[Diag1[i].id+"Pot"] = 120;
	pathCurrentLastName = Diag1[i].id.split("_")
	//Start current copies.
	var pathCurrent = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	pathCurrent.setAttribute('stroke','black');
	pathCurrent.setAttribute('fill','none');
	pathCurrent.setAttribute('id',Diag1[i].id + 'Current');
	pathCurrent.style['stroke-width']=2.5;
	pathCurrent.style['stroke-linecap']="round";
	pathCurrent.setAttribute("d", Diag1[i].getAttribute("d"));
	TweenMax.to(pathCurrent,0,{autoAlpha:0});
	Diag1_hide.appendChild(pathCurrent);
	if(pathCurrentLastName[1] != "noCurrent"){
		linesWithCurrentArray.push(pathCurrent)
	}
	//Start trace copies.
	var pathTrace = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	pathTrace.setAttribute('stroke','red');
	pathTrace.setAttribute('fill','none');
	pathTrace.setAttribute('id',Diag1[i].id + 'Trace');
	pathTrace.style['stroke-width']=3;
	pathTrace.style['stroke-linecap']="round";
	pathTrace.setAttribute("d", Diag1[i].getAttribute("d"));
	Diag1_hide.appendChild(pathTrace);
	TweenMax.to(pathTrace, 0, {drawSVG:'0% 0%'});
	traceArray.push(pathTrace);
	//BBox
	var pathPot = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	pathPot.setAttribute('id',Diag1[i].id + 'Box');
	pathPot.style['stroke-width']=0;
	pathPot.style['stroke-linecap']="round";
	pathPot.setAttribute('fill','green');
	pathPot.setAttribute('opacity', 0);
	pathPotX = Diag1[i].getBBox().x-5;
	pathPotY = Diag1[i].getBBox().y-5;
	pathPotWidth = Diag1[i].getBBox().width + 10;
	pathPotHeight = Diag1[i].getBBox().height + 10;
	data = `m${pathPotX} ${pathPotY} l${pathPotWidth} ${0} v${pathPotHeight} ${0}  l${-(pathPotWidth)} ${0} v${-(pathPotHeight)} ${0}` ;
	pathPot.setAttribute("d", data);
	Diag1_hide.appendChild(pathPot);
	if(Diag1[i].id != "Slide2ParallelR2CO_hide" && Diag1[i].id !="Slide2ParallelR1CO_hide" && Diag1[i].id !="Slide2ParallelR3CO_hide" && Diag1[i].id !="Diag1V1_noCurrent" && Diag1[i].id !="Diag1R1" && Diag1[i].id !="Diag1R2" && Diag1[i].id !="Diag1R3" && Diag1[i].id !="r1Short_hide" && Diag1[i].id !="r2Short_hide" && Diag1[i].id !="r3Short_hide" && Diag1[i].id !="Diag1R3MultiColor"){
		boxArray.push(pathPot.getBoundingClientRect())
		boxArrayIdsArray.push(pathPot.id)
	}
	
}

//Append items to Diag1
Diag1_hide.appendChild(CurrentMeasure1_hide);
Diag1_hide.appendChild(CurrentMeasure2_hide);
Diag1_hide.appendChild(CurrentMeasure3_hide);
Diag1_hide.appendChild(Diag1R3MultiColor);

//PreStart Set Up
TweenMax.to(mainBackground,0,{fill:"white"})
TweenMax.to([Diag1_hide], 0, {transformOrigin:"0 0"})
TweenMax.to([meterKnob], 0, {transformOrigin:"0 0"})
TweenMax.to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:30, transformOrigin:"0 20"})
TweenMax.to([Diag1S2,Diag1S2Current,Diag1S2Trace], 0, {transformOrigin:"0 0"})
TweenMax.to([Diag1S3,Diag1S3Current,Diag1S3Trace], 0, {transformOrigin:"0 0"})
TweenMax.to(Diag1R3MultiColor, 0, {autoAlpha:0})
TweenMax.to(Diag1R3MultiColor, 0, {strokeWidth:4});

// Start Meter Numbers
var onesArray=[oneA_hide,oneB_hide,oneC_hide,oneD_hide,oneE_hide,oneF_hide,oneG_hide];
var tensArray=[tenA_hide,tenB_hide,tenC_hide,tenD_hide,tenE_hide,tenF_hide,tenG_hide];
var hunsArray=[hunA_hide,hunB_hide,hunC_hide,hunD_hide,hunE_hide,hunF_hide,hunG_hide];
var thousArray=[thouA_hide,thouB_hide,thouC_hide,thouD_hide,thouE_hide,thouF_hide,thouG_hide];

var ones0Array=[oneA_hide,oneB_hide,oneC_hide,oneD_hide,oneE_hide,oneF_hide];
var ones1Array=[oneB_hide,oneC_hide];
var ones2Array=[oneA_hide,oneB_hide,oneD_hide,oneE_hide,oneG_hide];
var ones3Array=[oneA_hide,oneB_hide,oneC_hide,oneD_hide,oneG_hide];
var ones4Array=[oneB_hide,oneC_hide,oneF_hide,oneG_hide];
var ones5Array=[oneA_hide,oneC_hide,oneD_hide,oneF_hide,oneG_hide];
var ones6Array=[oneA_hide,oneC_hide,oneD_hide,oneE_hide,oneF_hide,oneG_hide];
var ones7Array=[oneA_hide,oneB_hide,oneC_hide];
var ones8Array=[oneA_hide,oneB_hide,oneC_hide,oneD_hide,oneE_hide,oneF_hide,oneG_hide];
var ones9Array=[oneA_hide,oneB_hide,oneC_hide,oneD_hide,oneF_hide,oneG_hide];

var tens0Array=[tenA_hide,tenB_hide,tenC_hide,tenD_hide,tenE_hide,tenF_hide];
var tens1Array=[tenB_hide,tenC_hide];
var tens2Array=[tenA_hide,tenB_hide,tenD_hide,tenE_hide,tenG_hide];
var tens3Array=[tenA_hide,tenB_hide,tenC_hide,tenD_hide,tenG_hide];
var tens4Array=[tenB_hide,tenC_hide,tenF_hide,tenG_hide];
var tens5Array=[tenA_hide,tenC_hide,tenD_hide,tenF_hide,tenG_hide];
var tens6Array=[tenA_hide,tenC_hide,tenD_hide,tenE_hide,tenF_hide,tenG_hide];
var tens7Array=[tenA_hide,tenB_hide,tenC_hide];
var tens8Array=[tenA_hide,tenB_hide,tenC_hide,tenD_hide,tenE_hide,tenF_hide,tenG_hide];
var tens9Array=[tenA_hide,tenB_hide,tenC_hide,tenD_hide,tenF_hide,tenG_hide];

var huns0Array=[hunA_hide,hunB_hide,hunC_hide,hunD_hide,hunE_hide,hunF_hide];
var huns1Array=[hunB_hide,hunC_hide];
var huns2Array=[hunA_hide,hunB_hide,hunD_hide,hunE_hide,hunG_hide];
var huns3Array=[hunA_hide,hunB_hide,hunC_hide,hunD_hide,hunG_hide];
var huns4Array=[hunB_hide,hunC_hide,hunF_hide,hunG_hide];
var huns5Array=[hunA_hide,hunC_hide,hunD_hide,hunF_hide,hunG_hide];
var huns6Array=[hunA_hide,hunC_hide,hunD_hide,hunE_hide,hunF_hide,hunG_hide];
var huns7Array=[hunA_hide,hunB_hide,hunC_hide];
var huns8Array=[hunA_hide,hunB_hide,hunC_hide,hunD_hide,hunE_hide,hunF_hide,hunG_hide];
var huns9Array=[hunA_hide,hunB_hide,hunC_hide,hunD_hide,hunF_hide,hunG_hide];

var thous0Array=[thouA_hide,thouB_hide,thouC_hide,thouD_hide,thouE_hide,thouF_hide];
var thous1Array=[thouB_hide,thouC_hide];
var thous2Array=[thouA_hide,thouB_hide,thouD_hide,thouE_hide,thouG_hide];
var thous3Array=[thouA_hide,thouB_hide,thouC_hide,thouD_hide,thouG_hide];
var thous4Array=[thouB_hide,thouC_hide,thouF_hide,thouG_hide];
var thous5Array=[thouA_hide,thouC_hide,thouD_hide,thouF_hide,thouG_hide];
var thous6Array=[thouA_hide,thouC_hide,thouD_hide,thouE_hide,thouF_hide,thouG_hide];
var thous7Array=[thouA_hide,thouB_hide,thouC_hide];
var thous8Array=[thouA_hide,thouB_hide,thouC_hide,thouD_hide,thouE_hide,thouF_hide,thouG_hide];
var thous9Array=[thouA_hide,thouB_hide,thouC_hide,thouD_hide,thouF_hide,thouG_hide];
//End Meter Numbers

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Current Diagram 1 Main N Current
var Diag1MainCurrentArray = [Diag1Nw1Current,Diag1Nw2Current,Diag1S1Current,Diag1Nw3Current,Diag1Pw1Current,Diag1Pw2Current,Diag1R3Current,Diag1Pw3Current];
TweenMax.to(Diag1MainCurrentArray, 0, {autoAlpha:1})
var Diag1MainCurrentTl = new TimelineMax({repeat:-1})
Diag1MainCurrentTl.timeScale(.5);
Diag1MainCurrentTl
.to(Diag1MainCurrentArray, 0, {strokeDasharray:"2,6", ease:Linear.easeNone})
.to(Diag1MainCurrentArray, 0.1, {strokeDashoffset:"-=8", repeat:-1, ease:Linear.easeNone,yoyo:false})

// // Current Diagram 1 Branch 1
var Diag1Branch1CurrentArray = [Diag1Branch1Nw1Current,Diag1Branch1Nw2Current,Diag1Branch1Nw3Current,Diag1R1Current,Diag1S3Current];
TweenMax.to(Diag1Branch1CurrentArray, 0, {autoAlpha:1})
var Diag1Branch1CurrentTl = new TimelineMax({repeat:-1})
Diag1Branch1CurrentTl.timeScale(.5);
Diag1Branch1CurrentTl
.to(Diag1Branch1CurrentArray, 0, {strokeDasharray:"2,6", ease:Linear.easeNone})
.to(Diag1Branch1CurrentArray, 0.1, {strokeDashoffset:"-=8", repeat:-1, ease:Linear.easeNone,yoyo:false})

// // Current Diagram 2 Branch 2
var Diag1Branch2CurrentArray = [Diag1Branch2Nw1Current,,Diag1Branch2Nw2Current,Diag1Branch2Nw3Current,Diag1Branch2Nw4Current,Diag1Branch2Nw5Current,Diag1R2Current, Diag1R2Current,Diag1S2Current];
TweenMax.to(Diag1Branch2CurrentArray, 0, {autoAlpha:1});
var Diag1Branch2CurrentTl = new TimelineMax({repeat:-1})
Diag1Branch2CurrentTl.timeScale(.5);
Diag1Branch2CurrentTl
.to(Diag1Branch2CurrentArray, 0, {strokeDasharray:"2,6", ease:Linear.easeNone})
.to(Diag1Branch2CurrentArray, 0.1, {strokeDashoffset:"-=8", repeat:-1, ease:Linear.easeNone,yoyo:false})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Main Timeline

slideTl
.to(headingText,1,{autoAlpha:0, delay:1})
.from(htmlArea, 0, {className:"+=hidden"})
.to([blackDot,redDot], 0 , {opacity:1})
.to(Diag1_hide, 1, {autoAlpha:1})
.to([Diag1S1,Diag1S1Current,Diag1S1Trace], 1, {rotation:0, transformOrigin:"0 20", delay:1})

// //Current from negative side of battery
.staggerFromTo([Diag1Nw1Trace], 1.5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:2})
.staggerFromTo([Diag1Nw2Trace], 1.5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
.staggerFromTo([Diag1S1Trace], .2, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
.staggerFromTo([Diag1Nw3Trace], 1.2, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})

//Show point A
.to(Slide1PointA_hide, 1, {autoAlpha:1})

// Current splits at parallel
.staggerFromTo([Diag1Branch1Nw1Trace,Diag1Branch2Nw1Trace], 1.3, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
.staggerFromTo([Diag1Branch2Nw2Trace], .7, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone})

.staggerFromTo([Diag1S2Trace,Diag1S3Trace], .2, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
.staggerFromTo([Diag1Branch1Nw2Trace,Diag1Branch2Nw3Trace], 1.5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
.to([Slide2ParallelR1CO_hide,Slide2ParallelR2CO_hide], 1, {autoAlpha:1, delay:0})

// //Trace resistors
.staggerFromTo([Diag1R1Trace,Diag1R2Trace], .6, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:4.5})
.to([Slide2ParallelR1CO_hide,Slide2ParallelR2CO_hide], 1, {autoAlpha:0, delay:-1})

// //Trace last part of parallel
.staggerFromTo([Diag1Branch1Nw3Trace,Diag1Branch2Nw4Trace], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
.staggerFromTo([Diag1Branch2Nw5Trace], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
.to(Slide1PointB_hide, 1, {autoAlpha:1, delay:0})

// //Trace to positive side obattery
.staggerFromTo([Diag1Pw3Trace], .5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:1})
.staggerFromTo([Diag1R3Trace], .5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
.staggerFromTo([Diag1Pw2Trace], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
.staggerFromTo([Diag1Pw1Trace], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})

// //Move diagram1 left and show meter
.to(Diag1_hide, 1, {x:100, y:50, transformOrigin: "50 50",ease: Power0.easeNone, delay:1})
.to([Slide1PointA_hide,Slide1PointB_hide,traceArray], 1, {autoAlpha:0, delay:-1})
.to(traceArray, 0, {drawSVG:'0% 0%'})
.to(multimeterGroup_hide, 1, {autoAlpha:1, delay:0})

//Turn off S1
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:30, transformOrigin:"0 20"})


// // //Change meter to dc amps
// .to(meterKnob, 1, {rotation:180, transformOrigin:"29.5 29.5", ease: Power0.easeNone, onComplete:changeMeter, onCompleteParams:[0]})
// .to(CurrentMeasure1_hide, 1, {autoAlpha:1, delay:-1})

// //Read current at S3.
// .to(redDot,1,{x:214, y:50, onUpdate:updateRedLead, delay:1})
// .to(blackDot,1,{x:369, y:50, onUpdate:updateBlackLead, delay:-1})
// //Turn on S1
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:0, transformOrigin:"0 20", delay:0})
// //Change meter to .8
// .to([thousArray,hunsArray,tensArray,onesArray,dot1_hide,dot2_hide,dot3_hide,dot4_hide], 0, {autoAlpha:0})
// .to([thous8Array,huns0Array,tens0Array,ones0Array,dot1_hide], 0, {autoAlpha:1})

// //Turn off S1
// //Meter to 0.
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:30, transformOrigin:"0 20", delay:3})
// .to([thousArray,hunsArray,tensArray,onesArray,dot1_hide,dot2_hide,dot3_hide,dot4_hide], 0, {autoAlpha:0, delay:0})
// .to([thous0Array,huns0Array,tens0Array,ones0Array,dot2_hide], 0, {autoAlpha:1})
// .to(CurrentMeasure2_hide, 1, {autoAlpha:1, delay:0})
// .to(CurrentMeasure1_hide, 1, {autoAlpha:0, delay:-1})

// //Turn on S1
// //Read current at S2.
// //Meter to .8 amps.
// .to(redDot,1,{x:214, y:-62, onUpdate:updateRedLead, delay:1})
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:0, transformOrigin:"0 20", delay:0})
// .to(blackDot,1,{x:372, y:-62, onUpdate:updateBlackLead, delay:-1})
// .to([thousArray,hunsArray,tensArray,onesArray,dot1_hide,dot2_hide,dot3_hide,dot4_hide], 0, {autoAlpha:0})
// .to([thous8Array,huns0Array,tens0Array,ones0Array,dot1_hide], 0, {autoAlpha:1})

// //Turn off S1
// //Meter to 0.
// //Meter to home.
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:30, transformOrigin:"0 20", delay:4})
// .to(CurrentMeasure3_hide, 1, {autoAlpha:1})

// //Read current at S2.
// //Meter to 1.6 amps.
// .to(CurrentMeasure2_hide, 1, {autoAlpha:0, delay:0})
// .to(redDot,1,{x:367, y:482, onUpdate:updateRedLead, delay:1})
// .to(blackDot,1,{x:339, y:481, onUpdate:updateBlackLead, delay:-1})
// .to(Diag1MainCurrentTl, 0, {timeScale:.7})
// .to(Diag1Branch1CurrentTl, 0, {timeScale:.5})
// .to(Diag1Branch2CurrentTl, 0, {timeScale:.4})
// .to([thousArray,hunsArray,tensArray,onesArray,dot1_hide,dot2_hide,dot3_hide,dot4_hide], 0, {autoAlpha:0})
// .to([thous1Array,huns6Array,tens0Array,ones0Array,dot2_hide], 0, {autoAlpha:1})
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:0, transformOrigin:"0 20", delay:0})

// //Meter leads to home.
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:30, transformOrigin:"0 20", delay:5})
// .to(redDot,1,{x:0, y:0, onUpdate:updateRedLead, delay:0})
// .to(blackDot,1,{x:0, y:0, onUpdate:updateBlackLead, delay:-1})
// .to([thousArray,hunsArray,tensArray,onesArray,dot1_hide,dot2_hide,dot3_hide,dot4_hide], 0, {autoAlpha:0, delay:0})
// .to([thous0Array,huns0Array,tens0Array,ones0Array,dot2_hide], 0, {autoAlpha:1})
// .to(CurrentMeasure3_hide, 1, {autoAlpha:0})

// // //Read voltage at S1.
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:0, transformOrigin:"0 20", delay:6})
// .to(meterKnob, .5, {rotation:-10, transformOrigin:"29.5 29.5", delay:0})
// .to(redDot,1,{x:190, y:230, onUpdate:updateRedLead, delay:0})
// .to(blackDot,1,{x:255, y:268, onUpdate:updateBlackLead, delay:-1})

// //Read open S1
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:30, transformOrigin:"0 20", delay:11})

// //Trace Lines
// .to([traceArray], 1, {autoAlpha:1, delay:0})

// // .staggerFromTo([Diag1S1Trace], .2, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:15})
// .staggerFromTo([Diag1Nw3Trace], .75, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:15})

// .staggerFromTo([Diag1Branch1Nw1Trace,Diag1Branch2Nw1Trace], .35, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Branch2Nw2Trace], .2, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone})

// .staggerFromTo([Diag1S2Trace,Diag1S3Trace], .1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Branch1Nw2Trace,Diag1Branch2Nw3Trace], .3, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})

// // //Trace resistors
// .staggerFromTo([Diag1R1Trace,Diag1R2Trace], .2, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})

// // //Trace last part of parallel
// .staggerFromTo([Diag1Branch1Nw3Trace,Diag1Branch2Nw4Trace], .2, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Branch2Nw5Trace], .2, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})


// // //Trace to positive side obattery
// .staggerFromTo([Diag1Pw3Trace], .25, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1R3Trace], .1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Pw2Trace], .5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Pw1Trace], .5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})

// .staggerFromTo([Diag1Nw2Trace], 1.5, {drawSVG:'100% 100%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:2})
// .staggerFromTo([Diag1Nw1Trace], 1.5, {drawSVG:'100% 100%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})

// //Morph resistors
// .to([Slide2ParallelR2CO_hide,Slide2ParallelR1CO_hide,Slide2ParallelR3CO_hide], 1, {autoAlpha:1, delay:3})
// .to([r1Short_hide,r2Short_hide,r3Short_hide], 0, {strokeWidth:2.5, delay:3})
// .to([g7080,Slide2ParallelR2CO_hide,Slide2ParallelR1CO_hide,Slide2ParallelR3CO_hide], 1, {autoAlpha:0})
// .to(Diag1R1, 1, {morphSVG:"#r1Short_hide", delay:-1})
// .to(Diag1R1Trace, 1, {morphSVG:"#r1Short_hide", delay:-1})
// .to(Diag1R1Current, 1, {morphSVG:"#r1Short_hide", delay:-1})

// .to(Diag1R2, 1, {morphSVG:"#r2Short_hide", delay:-1})
// .to(Diag1R2Trace, 1, {morphSVG:"#r2Short_hide", delay:-1})
// .to(Diag1R2Current, 1, {morphSVG:"#r2Short_hide", delay:-1})

// .to(Diag1R3, 1, {morphSVG:"#r3Short_hide", delay:-1})
// .to(Diag1R3Trace, 1, {morphSVG:"#r3Short_hide", delay:-1})
// .to(Diag1R3Current, 1, {morphSVG:"#r3Short_hide", delay:-1})

// //Bring back to normal
// .to(Diag1R1, 1, {morphSVG:"#Diag1R1", delay:10})
// .to(Diag1R1Trace, 1, {morphSVG:"#Diag1R1Trace", delay:-1})
// .to(Diag1R1Current, 1, {morphSVG:"#Diag1R1Current", delay:-1})

// .to(Diag1R2, 1, {morphSVG:"#Diag1R2", delay:-1})
// .to(Diag1R2Trace, 1, {morphSVG:"#Diag1R2Trace", delay:-1})
// .to(Diag1R2Current, 1, {morphSVG:"#Diag1R2Current", delay:-1})

// .to(Diag1R3, 1, {morphSVG:"#Diag1R3", delay:-1})
// .to(Diag1R3Trace, 1, {morphSVG:"#Diag1R3Trace", delay:-1})
// .to(Diag1R3Current, 1, {morphSVG:"#Diag1R3Current", delay:-1})

// .to([g7080], 1, {autoAlpha:1, delay:-1})

// //Hid and rewind line draws.
// .to([traceArray], 1, {autoAlpha:0, delay:-1})
// .to(traceArray, 0, {drawSVG:'0% 0%', delay:-1})
// .to([traceArray], 0, {autoAlpha:1, delay:0})

// //S2
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:0, transformOrigin:"0 20", delay:2.5})
// .to(redDot,1,{x:368, y:-63, onUpdate:updateRedLead, delay:2})
// .to(blackDot,1,{x:390, y:-60, onUpdate:updateBlackLead, delay:-1})
// .to([Diag1S2,Diag1S2Current,Diag1S2Trace], 0, {rotation:-30, delay:7})

// // Trace s2 to negative side of battery
// .staggerFromTo([Diag1Branch2Nw2Trace], .75, {drawSVG:'100% 100%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:18})
// .staggerFromTo([Diag1Branch2Nw1Trace], .75, {drawSVG:'100% 100%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Nw3Trace], .75, {drawSVG:'100% 100%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1S1Trace], .1, {drawSVG:'100% 100%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Nw2Trace], .75, {drawSVG:'100% 100%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Nw1Trace], .75, {drawSVG:'100% 100%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})

// //Trace to r2
// .staggerFromTo([Diag1Branch2Nw3Trace], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:2})

// //Trace to r3
// .staggerFromTo([Diag1R2Trace], .5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:8})
// .staggerFromTo([Diag1Branch2Nw4Trace], .5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Branch2Nw5Trace], .5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Pw3Trace], .5, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})

// //Trace to positive of battry
// .to([Diag1R3MultiColor], 1, {autoAlpha:1, delay:13})
// .staggerFromTo([Diag1R3MultiColor], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Pw2Trace], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .staggerFromTo([Diag1Pw1Trace], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})

// //Highlight r1 and r3
// .to([Slide2ParallelR1CO_hide,Slide2ParallelR3CO_hide], 1, {autoAlpha:1,delay:2.5})
// .to([Slide2ParallelR1CO_hide,Slide2ParallelR3CO_hide], 1, {autoAlpha:0,delay:2.5})
// .to(redDot,1,{x:787, y:291, onUpdate:updateRedLead, delay:0})
// .to(blackDot,1,{x:847, y:169, onUpdate:updateBlackLead, delay:-1})

// .to(redDot,1,{x:652, y:50, onUpdate:updateRedLead, delay:2})
// .to(blackDot,1,{x:609, y:50, onUpdate:updateBlackLead, delay:-1})

// .to([Slide2ParallelR2CO_hide], 1, {autoAlpha:1,delay:3})
// .to([Slide2ParallelR2CO_hide], 1, {autoAlpha:0,delay:8})

// .to(redDot,1,{x:657, y:-64, onUpdate:updateRedLead, delay:1})
// .to(blackDot,1,{x:609, y:-64, onUpdate:updateBlackLead, delay:-1})


// //Close s2
// .to([Diag1S2,Diag1S2Current,Diag1S2Trace], 0, {rotation:0, delay:3})
// .staggerFromTo([Diag1S2Trace], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
// .to(Diag1S2Trace, 1, {autoAlpha:1})
// .to(redDot,2,{x:0, y:0, onUpdate:updateRedLead, delay:7})
// .to(blackDot,2,{x:0, y:0, onUpdate:updateBlackLead, onStart:potToString, delay:-2})

// .to([thousArray,hunsArray,tensArray,onesArray,dot1_hide,dot2_hide,dot3_hide,dot4_hide], 0, {autoAlpha:0})
// .to([thous0Array,huns0Array,tens0Array,ones0Array,dot2_hide], 0, {autoAlpha:1})
// .add(function(){potToString()})
// //Hide and rewind line draws.
// .to([redDot,blackDot], 1, {autoAlpha:.25,delay:0})
// .to([traceArray,Diag1R3MultiColor], 1, {autoAlpha:0, delay:-1})
// .to(traceArray, 0, {drawSVG:'0% 0%', delay:-1})
// .to([traceArray], 0, {autoAlpha:1, delay:0})
// .to(g7094_hide, 1, {autoAlpha:1, delay:-1})

// //Highlight Currents
// .to([Diag1Pw1,Diag1Pw2], 1, {strokeWidth:5,delay:2})
// .to([Diag1Pw1,Diag1Pw2], 1, {strokeWidth:1, delay:2})

// .to([Diag1Nw1,Diag1Nw2,Diag1S1,Diag1Nw3,Diag1Branch1Nw1,Diag1S3,Diag1Branch1Nw2,Diag1Branch2Nw1,Diag1Branch2Nw2,Diag1S2,Diag1Branch2Nw3], 1, {strokeWidth:5,delay:0})
// .to([Diag1Nw1,Diag1Nw2,Diag1S1,Diag1Nw3,Diag1Branch1Nw1,Diag1S3,Diag1Branch1Nw2,Diag1Branch2Nw1,Diag1Branch2Nw2,Diag1S2,Diag1Branch2Nw3], 1, {strokeWidth:1, delay:2})

// .to([Diag1Branch2Nw4,Diag1Branch2Nw5,Diag1Branch1Nw3,Diag1Pw3], 1, {strokeWidth:5,delay:0})
// .to([Diag1Branch2Nw4,Diag1Branch2Nw5,Diag1Branch1Nw3,Diag1Pw3], 1, {strokeWidth:1, delay:3.5})


// .to([Diag1R1,Diag1R2,Diag1R3,Diag1S1,Diag1S2,Diag1S3], 1, {strokeWidth:5,delay:7})
// .to([Diag1R1,Diag1R2,Diag1R3,Diag1S1,Diag1S2,Diag1S3], 1, {strokeWidth:1, delay:3.5})

// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], .25, {rotation:30, delay:0})
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], .25, {rotation:0, delay:.5})
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], .25, {rotation:30, delay:0})
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], .25, {rotation:0, delay:.5})

// .to([Diag1S2,Diag1S2Current,Diag1S2Trace], .25, {rotation:-30, delay:0})
// .to([Diag1S2,Diag1S2Current,Diag1S2Trace], .25, {rotation:0, delay:.5})
// .to([Diag1S2,Diag1S2Current,Diag1S2Trace], .25, {rotation:-30, delay:0})
// .to([Diag1S2,Diag1S2Current,Diag1S2Trace], .25, {rotation:0, delay:.5})

// .to([Diag1S3,Diag1S3Current,Diag1S3Trace], .25, {rotation:-30, delay:0})
// .to([Diag1S3,Diag1S3Current,Diag1S3Trace], .25, {rotation:0, delay:.5})
// .to([Diag1S3,Diag1S3Current,Diag1S3Trace], .25, {rotation:-30, delay:0})
// .to([Diag1S3,Diag1S3Current,Diag1S3Trace], .25, {rotation:0, delay:.5})

// .to(redDot, 2, {x:671, y:50, onUpdate:updateRedLead, delay:2})
// .to(blackDot, 2, {x:588, y:48, onUpdate:updateBlackLead, delay:-2})

// .to(redDot, 2, {x:0, y:0, onUpdate:updateRedLead, delay:2})
// .to(blackDot, 2, {x:0, y:0, onUpdate:updateBlackLead, delay:-2})
// .add(function(){potToString()})
// .add(function(){pauseAudio();},"+=1")

// //Hide Meter display
// .to(redDot, 2, {x:0, y:0, onUpdate:updateRedLead, delay:0})
// .to(blackDot, 2, {x:0, y:0, onUpdate:updateBlackLead, delay:-2})
// .add(function(){potToString()})
// .to(hideDisplay_hide, 1, {autoAlpha:1, delay:2})
// .to([Diag1S1,Diag1S1Current,Diag1S1Trace], 0, {rotation:30, delay:-1})
// .to([Diag1S2,Diag1S2Current,Diag1S2Trace], 0, {rotation:-30, delay:-1})
// .to([Diag1S3,Diag1S3Current,Diag1S3Trace], 0, {rotation:-30, delay:-1})
// //Measure to grey wires.
// .to(redDot, 2, {x:660, y:483, onUpdate:updateRedLead, delay:0})
// .to(blackDot, 2, {x:255, y:52, onUpdate:updateBlackLead, delay:-2})
// .from(checkBox1, 1, {autoAlpha:0, delay:0})
// .add(function(){pauseAudio();},"+=1")

// //Hide SVG and bring up summary.
// .to([checkBox1,hideDisplay_hide], 1, {autoAlpha:0, delay:0})
// .to(svgContent, 1, {autoAlpha:0, delay:10})
// .from(htmlArea, 0, {className:"+=visible"})
// .from(htmlArea, 1, {autoAlpha:0,delay:-1})
// .from(summaryListHeading, 1, {autoAlpha:0})
// .from(summaryListItem1,1, {autoAlpha:0, delay:2})
// .from(summaryListItem2,1, {autoAlpha:0, delay:3})
// .from(summaryListItem3,1, {autoAlpha:0, delay:4.1})
// .from(summaryListItem4,1, {autoAlpha:0, delay:4.1})
// .from(summaryListItem5,1, {autoAlpha:0, delay:7.1})
function potToString(){
	redLeadPot="string";
	blackLeadPot = "string";
}






//Draggable Red Lead
TweenMax.to(redDot, 0, {opacity:.25})
var redDotPointX;
var redDotPointY;
var redLeadPot;

var redDotDrag2=Draggable.create(redDot2, {});
var redDotDrag=Draggable.create(redDot, {
	type: "x,y",
	bounds: "#svgContent",
	onDrag: function() {
		redDot.style.cursor = "none";
		updateRedLead();
    	},
	onDragEnd: function() {
		console.log(".to(redDot, 2, {x:" + redDot._gsTransform.x + ", y:" + redDot._gsTransform.y + ", onUpdate:updateRedLead, delay:0})" + "\n" + ".to(blackDot, 2, {x:" + blackDot._gsTransform.x + ", y:" + blackDot._gsTransform.y + ", onUpdate:updateBlackLead, delay:-2})")
  	}

});

//Update red lead position ondrag.
var redDotBox = redDot.getBBox();
var redDot2Box = redDot2.getBBox();
function updateRedLead() {
  var x1 = redDot._gsTransform.x+redDotBox.x+(redDotBox.width/2);
  var y1 = redDot._gsTransform.y+redDotBox.y+(redDotBox.width/2);
  var x4 = redDot2._gsTransform.x+redDot2Box.x+redDot2Box.width/2;
  var y4 = redDot2._gsTransform.y+redDot2Box.y+redDot2Box.width/2;;
  var dx = Math.abs(x4 - x1) /2;
  var x2 = x1 - dx;
  var x3 = x4 + dx;
  var data = `M${x1} ${y1} C ${200} ${800} ${x3} ${y4} ${x4} ${y4}`;
  redLead.setAttribute("d", data);
}
updateRedLead();

//Draggable Black Lead
TweenMax.to(blackDot, 0, {opacity:.25})

var blackDotPointX;
var blackDotPointY;
var blackLeadPot;
var blackDotBox = blackDot.getBBox();
var blackDot2Box = blackDot2.getBBox();
var blackDotDrag2=Draggable.create(blackDot2, {});
var blackDotDrag=Draggable.create(blackDot, {
	type: "x,y",
	bounds: "#svgContent",
	onMouseover: function(){
		console.log("over")
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////UNDO TO HERE
	onDrag: function() {
		blackDot.style.cursor = "none";
		updateBlackLead();				
    	},
	onDragEnd: function() {
		console.log(".to(redDot, 2, {x:" + redDot._gsTransform.x + ", y:" + redDot._gsTransform.y + ", onUpdate:updateRedLead, delay:0})" + "\n" + ".to(blackDot, 2, {x:" + blackDot._gsTransform.x + ", y:" + blackDot._gsTransform.y + ", onUpdate:updateBlackLead, delay:-2})")
  	}
});

//Update black lead position ondrag.
function updateBlackLead() {
  var x1 = blackDot._gsTransform.x+blackDotBox.x+(blackDotBox.width/2);
  var y1 = blackDot._gsTransform.y+blackDotBox.y+(blackDotBox.width/2);
  var x4 = blackDot2._gsTransform.x+blackDot2Box.x+blackDot2Box.width/2;
  var y4 = blackDot2._gsTransform.y+blackDot2Box.y+blackDot2Box.width/2;;
  var dx = Math.abs(x4 - x1) /2;
  var x2 = x1 - dx;
  var x3 = x4 + dx;
  var data = `M${x1} ${y1} C ${200} ${800} ${x3} ${y4} ${x4} ${y4}`;
  blackLead.setAttribute("d", data);
}
updateBlackLead();

//Move switches.
function moveSPST(element,rot){
	var elementCurrent = document .getElementById(element.id+"Current")
	var elementTrace = document .getElementById(element.id+"Trace")
	var elementBox = document .getElementById(element.id+"Box")
	if(element._gsTransform.rotation == rot){
		TweenMax.to([element, elementCurrent, elementTrace, elementBox],0, {rotation:0})
		}else{
		TweenMax.to([element, elementCurrent, elementTrace,elementBox],0, {rotation:rot})
	}

	
	}
	var xComp = 120;
	var myVar = setInterval(myTimer, 100)
	function myTimer(){
		 //0
    if(Diag1S1._gsTransform.rotation == 0 && Diag1S2._gsTransform.rotation == 0 && Diag1S3._gsTransform.rotation == 0){
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:.7});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:.5});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:.4});
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:.7});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:.5});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:.4});
    	TweenMax.to([Diag1Nw1,Diag1Nw1Current,Diag1Nw1Trace], 1, {stroke:"black"});
		Diag1Nw1Pot = 0;
		TweenMax.to([Diag1Nw2,Diag1Nw2Current,Diag1Nw2Trace], 1, {stroke:"black"});
		Diag1Nw2Pot = 0;
		TweenMax.to([Diag1Nw3,Diag1Nw3Current,Diag1Nw3Trace], 1, {stroke:"black"});
		Diag1Nw3Pot = 0;
		TweenMax.to([Diag1S1,Diag1S1Current,Diag1S1Trace], 1, {stroke:"black"});
		Diag1S1Pot = 0;
		TweenMax.to([Diag1Branch1Nw1,Diag1Branch1Nw1Current,Diag1Branch1Nw1Trace], 1, {stroke:"black"});
		Diag1Branch1Nw1Pot = 0;
		TweenMax.to([Diag1Branch1Nw2,Diag1Branch1Nw2Current,Diag1Branch1Nw2Trace], 1, {stroke:"black"});
		Diag1Branch1Nw2Pot = 0;
		TweenMax.to([Diag1Branch1Nw3,Diag1Branch1Nw3Current,Diag1Branch1Nw3Trace], 1, {stroke:"purple"});
		Diag1Branch1Nw3Pot = 12;
		TweenMax.to([Diag1S3,Diag1S3Current,Diag1S3Trace], 1, {stroke:"black"})
		Diag1S3Pot = 0;
		TweenMax.to([Diag1R1,Diag1R1Current,Diag1R1Trace], 1, {stroke:"orange"})
		Diag1R1Pot = 0;
		TweenMax.to([Diag1Branch2Nw1,Diag1Branch2Nw1Current,Diag1Branch2Nw1Trace], 1, {stroke:"black"})
		Diag1Branch2Nw1Pot = 0;
		TweenMax.to([Diag1Branch2Nw2,Diag1Branch2Nw2Current,Diag1Branch2Nw2Trace], 1, {stroke:"black"})
		Diag1Branch2Nw2Pot = 0;
		TweenMax.to([Diag1Branch2Nw3,Diag1Branch2Nw3Current,Diag1Branch2Nw3Trace], 1, {stroke:"black"})
		Diag1Branch2Nw3Pot = 0;
		TweenMax.to([Diag1Branch2Nw4,Diag1Branch2Nw4Current,Diag1Branch2Nw4Trace], 1, {stroke:"purple"})
		Diag1Branch2Nw4Pot = 12;
		TweenMax.to([Diag1Branch2Nw5,Diag1Branch2Nw5Current,Diag1Branch2Nw5Trace], 1, {stroke:"purple"})
		Diag1Branch2Nw5Pot = 12;
		TweenMax.to([Diag1R2,Diag1R2Current,Diag1R2Trace], 1, {stroke:"orange"});
		Diag1R2Pot = 0;
		TweenMax.to([Diag1S2,Diag1S2Current,Diag1S2Trace], 1, {stroke:"black"})	;
		Diag1S2Pot = 0;	
		TweenMax.to([Diag1Pw1,Diag1Pw1Current,Diag1Pw1Trace], 1, {stroke:"red"});
		Diag1Pw1Pot = 24;
		TweenMax.to([Diag1Pw2,Diag1Pw2Current,Diag1Pw2Trace], 1, {stroke:"red"});
		Diag1Pw2Pot = 24;
		TweenMax.to([Diag1Pw3,Diag1Pw3Current,Diag1Pw3Trace], 1, {stroke:"purple"});
		Diag1Pw3Pot = 12;
		TweenMax.to([Diag1R3,Diag1R3Current,Diag1R3Trace], 1, {stroke:"orange"});
		Diag1R3Pot = 0;
	}
    //1
    if(Diag1S1._gsTransform.rotation == 0 && Diag1S2._gsTransform.rotation == 0 && Diag1S3._gsTransform.rotation == -30){
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:.5});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:.5});
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:.5});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:.5});
    	TweenMax.to([Diag1Nw1,Diag1Nw1Current,Diag1Nw1Trace], 1, {stroke:"black"});
		Diag1Nw1Pot = 0;
		TweenMax.to([Diag1Nw2,Diag1Nw2Current,Diag1Nw2Trace], 1, {stroke:"black"});
		Diag1Nw2Pot = 0;
		TweenMax.to([Diag1Nw3,Diag1Nw3Current,Diag1Nw3Trace], 1, {stroke:"black"});
		Diag1Nw3Pot = 0;
		TweenMax.to([Diag1S1,Diag1S1Current,Diag1S1Trace], 1, {stroke:"black"});
		Diag1S1Pot = 0;

		TweenMax.to([Diag1Branch1Nw1,Diag1Branch1Nw1Current,Diag1Branch1Nw1Trace], 1, {stroke:"black"});
		Diag1Branch1Nw1Pot = 0;
		TweenMax.to([Diag1Branch1Nw2,Diag1Branch1Nw2Current,Diag1Branch1Nw2Trace], 1, {stroke:"purple"});
		Diag1Branch1Nw2Pot = 12;
		TweenMax.to([Diag1Branch1Nw3,Diag1Branch1Nw3Current,Diag1Branch1Nw3Trace], 1, {stroke:"purple"});
		Diag1Branch1Nw3Pot = 12;
		TweenMax.to([Diag1S3,Diag1S3Current,Diag1S3Trace], 1, {stroke:"black"})
		Diag1S3Pot = 0;
		TweenMax.to([Diag1R1,Diag1R1Current,Diag1R1Trace], 1, {stroke:"purple"})
		Diag1R1Pot = 12;
		
		TweenMax.to([Diag1Branch2Nw1,Diag1Branch2Nw1Current,Diag1Branch2Nw1Trace], 1, {stroke:"black"})
		Diag1Branch2Nw1Pot = 0;
		TweenMax.to([Diag1Branch2Nw2,Diag1Branch2Nw2Current,Diag1Branch2Nw2Trace], 1, {stroke:"black"})
		Diag1Branch2Nw2Pot = 0;
		TweenMax.to([Diag1Branch2Nw3,Diag1Branch2Nw3Current,Diag1Branch2Nw3Trace], 1, {stroke:"black"})
		Diag1Branch2Nw3Pot = 0;
		TweenMax.to([Diag1Branch2Nw4,Diag1Branch2Nw4Current,Diag1Branch2Nw4Trace], 1, {stroke:"purple"})
		Diag1Branch2Nw4Pot = 12;
		TweenMax.to([Diag1Branch2Nw5,Diag1Branch2Nw5Current,Diag1Branch2Nw5Trace], 1, {stroke:"purple"})
		Diag1Branch2Nw5Pot = 12;
		TweenMax.to([Diag1R2,Diag1R2Current,Diag1R2Trace], 1, {stroke:"orange"});
		Diag1R2Pot = 0;
		TweenMax.to([Diag1S2,Diag1S2Current,Diag1S2Trace], 1, {stroke:"black"})	;
		Diag1S2Pot = 0;	

		TweenMax.to([Diag1Pw1,Diag1Pw1Current,Diag1Pw1Trace], 1, {stroke:"red"});
		Diag1Pw1Pot = 24;
		TweenMax.to([Diag1Pw2,Diag1Pw2Current,Diag1Pw2Trace], 1, {stroke:"red"});
		Diag1Pw2Pot = 24;
		TweenMax.to([Diag1Pw3,Diag1Pw3Current,Diag1Pw3Trace], 1, {stroke:"purple"});
		Diag1Pw3Pot = 12;
		TweenMax.to([Diag1R3,Diag1R3Current,Diag1R3Trace], 1, {stroke:"orange"});
		Diag1R3Pot = 0;
    }
    //2
    if(Diag1S1._gsTransform.rotation == 0 && Diag1S2._gsTransform.rotation == -30 && Diag1S3._gsTransform.rotation == 0){
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:.5});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:.5});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:.5});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:.5});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to([Diag1Nw1,Diag1Nw1Current,Diag1Nw1Trace], 1, {stroke:"black"});
		Diag1Nw1Pot = 0;
		TweenMax.to([Diag1Nw2,Diag1Nw2Current,Diag1Nw2Trace], 1, {stroke:"black"});
		Diag1Nw2Pot = 0;
		TweenMax.to([Diag1Nw3,Diag1Nw3Current,Diag1Nw3Trace], 1, {stroke:"black"});
		Diag1Nw3Pot = 0;
		TweenMax.to([Diag1S1,Diag1S1Current,Diag1S1Trace], 1, {stroke:"black"});
		Diag1S1Pot = 0;

		TweenMax.to([Diag1Branch1Nw1,Diag1Branch1Nw1Current,Diag1Branch1Nw1Trace], 1, {stroke:"black"});
		Diag1Branch1Nw1Pot = 0;
		TweenMax.to([Diag1Branch1Nw2,Diag1Branch1Nw2Current,Diag1Branch1Nw2Trace], 1, {stroke:"black"});
		Diag1Branch1Nw2Pot = 0;
		TweenMax.to([Diag1Branch1Nw3,Diag1Branch1Nw3Current,Diag1Branch1Nw3Trace], 1, {stroke:"purple"});
		Diag1Branch1Nw3Pot = 12;
		TweenMax.to([Diag1S3,Diag1S3Current,Diag1S3Trace], 1, {stroke:"black"})
		Diag1S3Pot = 0;
		TweenMax.to([Diag1R1,Diag1R1Current,Diag1R1Trace], 1, {stroke:"orange"})
		Diag1R1Pot = 0;
		
		TweenMax.to([Diag1Branch2Nw1,Diag1Branch2Nw1Current,Diag1Branch2Nw1Trace], 1, {stroke:"black"})
		Diag1Branch2Nw1Pot = 0;
		TweenMax.to([Diag1Branch2Nw2,Diag1Branch2Nw2Current,Diag1Branch2Nw2Trace], 1, {stroke:"black"})
		Diag1Branch2Nw2Pot = 0;
		TweenMax.to([Diag1Branch2Nw3,Diag1Branch2Nw3Current,Diag1Branch2Nw3Trace], 1, {stroke:"purple"})
		Diag1Branch2Nw3Pot = 12;
		TweenMax.to([Diag1Branch2Nw4,Diag1Branch2Nw4Current,Diag1Branch2Nw4Trace], 1, {stroke:"purple"})
		Diag1Branch2Nw4Pot = 12;
		TweenMax.to([Diag1Branch2Nw5,Diag1Branch2Nw5Current,Diag1Branch2Nw5Trace], 1, {stroke:"purple"})
		Diag1Branch2Nw5Pot = 12;
		TweenMax.to([Diag1R2,Diag1R2Current,Diag1R2Trace], 1, {stroke:"purple"});
		Diag1R2Pot = 12;
		TweenMax.to([Diag1S2,Diag1S2Current,Diag1S2Trace], 1, {stroke:"black"})	;
		Diag1S2Pot = 0;	

		TweenMax.to([Diag1Pw1,Diag1Pw1Current,Diag1Pw1Trace], 1, {stroke:"red"});
		Diag1Pw1Pot = 24;
		TweenMax.to([Diag1Pw2,Diag1Pw2Current,Diag1Pw2Trace], 1, {stroke:"red"});
		Diag1Pw2Pot = 24;
		TweenMax.to([Diag1Pw3,Diag1Pw3Current,Diag1Pw3Trace], 1, {stroke:"purple"});
		Diag1Pw3Pot = 12;
		TweenMax.to([Diag1R3,Diag1R3Current,Diag1R3Trace], 1, {stroke:"orange"});
		Diag1R3Pot = 0;
    }
    //3
    if(Diag1S1._gsTransform.rotation == 0 && Diag1S2._gsTransform.rotation == -30 && Diag1S3._gsTransform.rotation == -30){
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to([Diag1Nw1,Diag1Nw1Current,Diag1Nw1Trace], 1, {stroke:"black"});
		Diag1Nw1Pot = 0;
		TweenMax.to([Diag1Nw2,Diag1Nw2Current,Diag1Nw2Trace], 1, {stroke:"black"});
		Diag1Nw2Pot = 0;
		TweenMax.to([Diag1Nw3,Diag1Nw3Current,Diag1Nw3Trace], 1, {stroke:"black"});
		Diag1Nw3Pot = 0;
		TweenMax.to([Diag1S1,Diag1S1Current,Diag1S1Trace], 1, {stroke:"black"});
		Diag1S1Pot = 0;

		TweenMax.to([Diag1Branch1Nw1,Diag1Branch1Nw1Current,Diag1Branch1Nw1Trace], 1, {stroke:"black"});
		Diag1Branch1Nw1Pot = 0;
		TweenMax.to([Diag1Branch1Nw2,Diag1Branch1Nw2Current,Diag1Branch1Nw2Trace], 1, {stroke:"red"});
		Diag1Branch1Nw2Pot = 24;
		TweenMax.to([Diag1Branch1Nw3,Diag1Branch1Nw3Current,Diag1Branch1Nw3Trace], 1, {stroke:"red"});
		Diag1Branch1Nw3Pot = 24;
		TweenMax.to([Diag1S3,Diag1S3Current,Diag1S3Trace], 1, {stroke:"black"});
		Diag1S3Pot = 0;
		TweenMax.to([Diag1R1,Diag1R1Current,Diag1R1Trace], 1, {stroke:"red"})
		Diag1R1Pot = 24;
		
		TweenMax.to([Diag1Branch2Nw1,Diag1Branch2Nw1Current,Diag1Branch2Nw1Trace], 1, {stroke:"black"});
		Diag1Branch2Nw1Pot = 0;
		TweenMax.to([Diag1Branch2Nw2,Diag1Branch2Nw2Current,Diag1Branch2Nw2Trace], 1, {stroke:"black"});
		Diag1Branch2Nw2Pot = 0;
		TweenMax.to([Diag1Branch2Nw3,Diag1Branch2Nw3Current,Diag1Branch2Nw3Trace], 1, {stroke:"red"});
		Diag1Branch2Nw3Pot = 24;
		TweenMax.to([Diag1Branch2Nw4,Diag1Branch2Nw4Current,Diag1Branch2Nw4Trace], 1, {stroke:"red"});
		Diag1Branch2Nw4Pot = 24;
		TweenMax.to([Diag1Branch2Nw5,Diag1Branch2Nw5Current,Diag1Branch2Nw5Trace], 1, {stroke:"red"});
		Diag1Branch2Nw5Pot = 24;
		TweenMax.to([Diag1R2,Diag1R2Current,Diag1R2Trace], 1, {stroke:"red"});
		Diag1R2Pot = 24;
		TweenMax.to([Diag1S2,Diag1S2Current,Diag1S2Trace], 1, {stroke:"black"});
		Diag1S2Pot = 0;	

		TweenMax.to([Diag1Pw1,Diag1Pw1Current,Diag1Pw1Trace], 1, {stroke:"red"});
		Diag1Pw1Pot = 24;	
		TweenMax.to([Diag1Pw2,Diag1Pw2Current,Diag1Pw2Trace], 1, {stroke:"red"});
		Diag1Pw2Pot = 24;	
		TweenMax.to([Diag1Pw3,Diag1Pw3Current,Diag1Pw3Trace], 1, {stroke:"red"});
		Diag1Pw3Pot = 24;	
		TweenMax.to([Diag1R3,Diag1R3Current,Diag1R3Trace], 1, {stroke:"red"});
		Diag1R3Pot = 24;	
    }
    //4
    if(Diag1S1._gsTransform.rotation == 30 && Diag1S2._gsTransform.rotation == 0 && Diag1S3._gsTransform.rotation == 0){
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to([Diag1Nw1,Diag1Nw1Current,Diag1Nw1Trace], 1, {stroke:"black"});
		Diag1Nw1Pot = 0;	
		TweenMax.to([Diag1Nw2,Diag1Nw2Current,Diag1Nw2Trace], 1, {stroke:"black"});
		Diag1Nw2Pot = 0;	
		TweenMax.to([Diag1Nw3,Diag1Nw3Current,Diag1Nw3Trace], 1, {stroke:"red"});
		Diag1Nw3Pot = 24;	
		TweenMax.to([Diag1S1,Diag1S1Current,Diag1S1Trace], 1, {stroke:"black"});
		Diag1S1Pot = 0;	

		TweenMax.to([Diag1Branch1Nw1,Diag1Branch1Nw1Current,Diag1Branch1Nw1Trace], 1, {stroke:"red"});
		Diag1Branch1Nw1Pot = 24;	
		TweenMax.to([Diag1Branch1Nw2,Diag1Branch1Nw2Current,Diag1Branch1Nw2Trace], 1, {stroke:"red"});
		Diag1Branch1Nw2Pot = 24;	
		TweenMax.to([Diag1Branch1Nw3,Diag1Branch1Nw3Current,Diag1Branch1Nw3Trace], 1, {stroke:"red"});
		Diag1Branch1Nw3Pot = 24;	
		TweenMax.to([Diag1S3,Diag1S3Current,Diag1S3Trace], 1, {stroke:"red"})
		Diag1S3Pot = 24;	
		TweenMax.to([Diag1R1,Diag1R1Current,Diag1R1Trace], 1, {stroke:"red"})
		Diag1R1Pot = 24;	
		
		TweenMax.to([Diag1Branch2Nw1,Diag1Branch2Nw1Current,Diag1Branch2Nw1Trace], 1, {stroke:"red"});
		Diag1Branch2Nw1Pot = 24;	
		TweenMax.to([Diag1Branch2Nw2,Diag1Branch2Nw2Current,Diag1Branch2Nw2Trace], 1, {stroke:"red"});
		Diag1Branch2Nw2Pot = 24;	
		TweenMax.to([Diag1Branch2Nw3,Diag1Branch2Nw3Current,Diag1Branch2Nw3Trace], 1, {stroke:"red"});
		Diag1Branch2Nw3Pot = 24;	
		TweenMax.to([Diag1Branch2Nw4,Diag1Branch2Nw4Current,Diag1Branch2Nw4Trace], 1, {stroke:"red"});
		Diag1Branch2Nw4Pot = 24;	
		TweenMax.to([Diag1Branch2Nw5,Diag1Branch2Nw5Current,Diag1Branch2Nw5Trace], 1, {stroke:"red"});
		Diag1Branch2Nw5Pot = 24;	
		TweenMax.to([Diag1R2,Diag1R2Current,Diag1R2Trace], 1, {stroke:"red"});
		Diag1R2Pot = 24;
		TweenMax.to([Diag1S2,Diag1S2Current,Diag1S2Trace], 1, {stroke:"red"});
		Diag1S2Pot = 24;	

		TweenMax.to([Diag1Pw1,Diag1Pw1Current,Diag1Pw1Trace], 1, {stroke:"red"});
		Diag1Pw1Pot = 24;
		TweenMax.to([Diag1Pw2,Diag1Pw2Current,Diag1Pw2Trace], 1, {stroke:"red"});
		Diag1Pw2Pot = 24;
		TweenMax.to([Diag1Pw3,Diag1Pw3Current,Diag1Pw3Trace], 1, {stroke:"red"});
		Diag1Pw3Pot = 24;
		TweenMax.to([Diag1R3,Diag1R3Current,Diag1R3Trace], 1, {stroke:"red"});
		Diag1R3Pot = 24;
    }
    //5
    if(Diag1S1._gsTransform.rotation == 30 && Diag1S2._gsTransform.rotation == 0 && Diag1S3._gsTransform.rotation == -30){
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to([Diag1Nw1,Diag1Nw1Current,Diag1Nw1Trace], 1, {stroke:"black"});
		Diag1Nw1Pot = 0;
		TweenMax.to([Diag1Nw2,Diag1Nw2Current,Diag1Nw2Trace], 1, {stroke:"black"});
		Diag1Nw2Pot = 0;
		TweenMax.to([Diag1Nw3,Diag1Nw3Current,Diag1Nw3Trace], 1, {stroke:"red"});
		Diag1Nw3Pot = 24;
		TweenMax.to([Diag1S1,Diag1S1Current,Diag1S1Trace], 1, {stroke:"black"});
		Diag1S1Pot = 0;

		TweenMax.to([Diag1Branch1Nw1,Diag1Branch1Nw1Current,Diag1Branch1Nw1Trace], 1, {stroke:"red"});
		Diag1Branch1Nw1Pot = 24;
		TweenMax.to([Diag1Branch1Nw2,Diag1Branch1Nw2Current,Diag1Branch1Nw2Trace], 1, {stroke:"red"});
		Diag1Branch1Nw2Pot = 24;
		TweenMax.to([Diag1Branch1Nw3,Diag1Branch1Nw3Current,Diag1Branch1Nw3Trace], 1, {stroke:"red"});
		Diag1Branch1Nw3Pot = 24;
		TweenMax.to([Diag1S3,Diag1S3Current,Diag1S3Trace], 1, {stroke:"red"});
		Diag1S3Pot = 24;
		TweenMax.to([Diag1R1,Diag1R1Current,Diag1R1Trace], 1, {stroke:"red"});
		Diag1R1Pot = 24;
		
		TweenMax.to([Diag1Branch2Nw1,Diag1Branch2Nw1Current,Diag1Branch2Nw1Trace], 1, {stroke:"red"});
		Diag1Branch2Nw1Pot = 24;
		TweenMax.to([Diag1Branch2Nw2,Diag1Branch2Nw2Current,Diag1Branch2Nw2Trace], 1, {stroke:"red"});
		Diag1Branch2Nw2Pot = 24;
		TweenMax.to([Diag1Branch2Nw3,Diag1Branch2Nw3Current,Diag1Branch2Nw3Trace], 1, {stroke:"red"});
		Diag1Branch2Nw3Pot = 24;
		TweenMax.to([Diag1Branch2Nw4,Diag1Branch2Nw4Current,Diag1Branch2Nw4Trace], 1, {stroke:"red"});
		Diag1Branch2Nw4Pot = 24;
		TweenMax.to([Diag1Branch2Nw5,Diag1Branch2Nw5Current,Diag1Branch2Nw5Trace], 1, {stroke:"red"});
		Diag1Branch2Nw5Pot = 24;
		TweenMax.to([Diag1R2,Diag1R2Current,Diag1R2Trace], 1, {stroke:"red"});
		Diag1R2Pot = 24;
		TweenMax.to([Diag1S2,Diag1S2Current,Diag1S2Trace], 1, {stroke:"red"});	
		Diag1S2Pot = 24;

		TweenMax.to([Diag1Pw1,Diag1Pw1Current,Diag1Pw1Trace], 1, {stroke:"red"});
		Diag1Pw1Pot = 24;
		TweenMax.to([Diag1Pw2,Diag1Pw2Current,Diag1Pw2Trace], 1, {stroke:"red"});
		Diag1Pw2Pot = 24;
		TweenMax.to([Diag1Pw3,Diag1Pw3Current,Diag1Pw3Trace], 1, {stroke:"red"});
		Diag1Pw3Pot = 24;
		TweenMax.to([Diag1R3,Diag1R3Current,Diag1R3Trace], 1, {stroke:"red"});
		Diag1R3Pot = 24;
    }
    //6
    if(Diag1S1._gsTransform.rotation == 30 && Diag1S2._gsTransform.rotation == -30 && Diag1S3._gsTransform.rotation == 0){
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to([Diag1Nw1,Diag1Nw1Current,Diag1Nw1Trace], 1, {stroke:"black"});
		Diag1Nw1Pot = 0;
		TweenMax.to([Diag1Nw2,Diag1Nw2Current,Diag1Nw2Trace], 1, {stroke:"black"});
		Diag1Nw2Pot = 0;
		TweenMax.to([Diag1Nw3,Diag1Nw3Current,Diag1Nw3Trace], 1, {stroke:"red"});
		Diag1Nw3Pot = 24;
		TweenMax.to([Diag1S1,Diag1S1Current,Diag1S1Trace], 1, {stroke:"black"});
		Diag1S1Pot = 0;

		TweenMax.to([Diag1Branch1Nw1,Diag1Branch1Nw1Current,Diag1Branch1Nw1Trace], 1, {stroke:"red"});
		Diag1Branch1Nw1Pot = 24;
		TweenMax.to([Diag1Branch1Nw2,Diag1Branch1Nw2Current,Diag1Branch1Nw2Trace], 1, {stroke:"red"});
		Diag1Branch1Nw2Pot = 24;
		TweenMax.to([Diag1Branch1Nw3,Diag1Branch1Nw3Current,Diag1Branch1Nw3Trace], 1, {stroke:"red"});
		Diag1Branch1Nw3Pot = 24;
		TweenMax.to([Diag1S3,Diag1S3Current,Diag1S3Trace], 1, {stroke:"red"});
		Diag1S3Pot = 24;
		TweenMax.to([Diag1R1,Diag1R1Current,Diag1R1Trace], 1, {stroke:"red"});
		Diag1R1Pot = 24;
		
		TweenMax.to([Diag1Branch2Nw1,Diag1Branch2Nw1Current,Diag1Branch2Nw1Trace], 1, {stroke:"red"});
		Diag1Branch2Nw1Pot = 24;
		TweenMax.to([Diag1Branch2Nw2,Diag1Branch2Nw2Current,Diag1Branch2Nw2Trace], 1, {stroke:"red"});
		Diag1Branch2Nw2Pot = 24;
		TweenMax.to([Diag1Branch2Nw3,Diag1Branch2Nw3Current,Diag1Branch2Nw3Trace], 1, {stroke:"red"});
		Diag1Branch2Nw3Pot = 24;
		TweenMax.to([Diag1Branch2Nw4,Diag1Branch2Nw4Current,Diag1Branch2Nw4Trace], 1, {stroke:"red"});
		Diag1Branch2Nw4Pot = 24;
		TweenMax.to([Diag1Branch2Nw5,Diag1Branch2Nw5Current,Diag1Branch2Nw5Trace], 1, {stroke:"red"});
		Diag1Branch2Nw5Pot = 24;
		TweenMax.to([Diag1R2,Diag1R2Current,Diag1R2Trace], 1, {stroke:"red"});
		Diag1R2Pot = 24;
		TweenMax.to([Diag1S2,Diag1S2Current,Diag1S2Trace], 1, {stroke:"red"});	
		Diag1S2Pot = 24;

		TweenMax.to([Diag1Pw1,Diag1Pw1Current,Diag1Pw1Trace], 1, {stroke:"red"});
		Diag1Pw1Pot = 24;
		TweenMax.to([Diag1Pw2,Diag1Pw2Current,Diag1Pw2Trace], 1, {stroke:"red"});
		Diag1Pw2Pot = 24;
		TweenMax.to([Diag1Pw3,Diag1Pw3Current,Diag1Pw3Trace], 1, {stroke:"red"});
		Diag1Pw3Pot = 24;
		TweenMax.to([Diag1R3,Diag1R3Current,Diag1R3Trace], 1, {stroke:"red"});
		Diag1R3Pot = 24;
    }
    //7
    if(Diag1S1._gsTransform.rotation == 30 && Diag1S2._gsTransform.rotation == -30 && Diag1S3._gsTransform.rotation == -30){
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1MainCurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch1CurrentTl, 1, {timeScale:0});
    	TweenMax.to(Diag1Branch2CurrentTl, 1, {timeScale:0});
    	TweenMax.to([Diag1Nw1,Diag1Nw1Current,Diag1Nw1Trace], 1, {stroke:"black"});
		Diag1Nw1Pot = 0;
		TweenMax.to([Diag1Nw2,Diag1Nw2Current,Diag1Nw2Trace], 1, {stroke:"black"});
		Diag1Nw2Pot = 0;
		TweenMax.to([Diag1Nw3,Diag1Nw3Current,Diag1Nw3Trace], 1, {stroke:"gray"});
		Diag1Nw3Pot = "string";
		TweenMax.to([Diag1S1,Diag1S1Current,Diag1S1Trace], 1, {stroke:"black"});
		Diag1S1Pot = 0;

		TweenMax.to([Diag1Branch1Nw1,Diag1Branch1Nw1Current,Diag1Branch1Nw1Trace], 1, {stroke:"gray"});
		Diag1Branch1Nw1Pot = "string";
		TweenMax.to([Diag1Branch1Nw2,Diag1Branch1Nw2Current,Diag1Branch1Nw2Trace], 1, {stroke:"red"});
		Diag1Branch1Nw2Pot = 24;
		TweenMax.to([Diag1Branch1Nw3,Diag1Branch1Nw3Current,Diag1Branch1Nw3Trace], 1, {stroke:"red"});
		Diag1Branch1Nw3Pot = 24;
		TweenMax.to([Diag1S3,Diag1S3Current,Diag1S3Trace], 1, {stroke:"gray"});
		Diag1S3Pot = "string";
		TweenMax.to([Diag1R1,Diag1R1Current,Diag1R1Trace], 1, {stroke:"red"});
		Diag1R1Pot = 24;
		
		TweenMax.to([Diag1Branch2Nw1,Diag1Branch2Nw1Current,Diag1Branch2Nw1Trace], 1, {stroke:"gray"});
		Diag1Branch2Nw1Pot = "string";
		TweenMax.to([Diag1Branch2Nw2,Diag1Branch2Nw2Current,Diag1Branch2Nw2Trace], 1, {stroke:"gray"});
		Diag1Branch2Nw2Pot = "string";
		TweenMax.to([Diag1Branch2Nw3,Diag1Branch2Nw3Current,Diag1Branch2Nw3Trace], 1, {stroke:"red"});
		Diag1Branch2Nw3Pot = 24;
		TweenMax.to([Diag1Branch2Nw4,Diag1Branch2Nw4Current,Diag1Branch2Nw4Trace], 1, {stroke:"red"});
		Diag1Branch2Nw4Pot = 24;
		TweenMax.to([Diag1Branch2Nw5,Diag1Branch2Nw5Current,Diag1Branch2Nw5Trace], 1, {stroke:"red"});
		Diag1Branch2Nw5Pot = 24;
		TweenMax.to([Diag1R2,Diag1R2Current,Diag1R2Trace], 1, {stroke:"red"});
		Diag1R2Pot = 24;
		TweenMax.to([Diag1S2,Diag1S2Current,Diag1S2Trace], 1, {stroke:"gray"});	
		Diag1S2Pot = "string";

		TweenMax.to([Diag1Pw1,Diag1Pw1Current,Diag1Pw1Trace], 1, {stroke:"red"});
		Diag1Pw1Pot = 24;
		TweenMax.to([Diag1Pw2,Diag1Pw2Current,Diag1Pw2Trace], 1, {stroke:"red"});
		Diag1Pw2Pot = 24;
		TweenMax.to([Diag1Pw3,Diag1Pw3Current,Diag1Pw3Trace], 1, {stroke:"red"});
		Diag1Pw3Pot = 24;
		TweenMax.to([Diag1R3,Diag1R3Current,Diag1R3Trace], 1, {stroke:"red"});
		Diag1R3Pot = 24;
    }
	// redDotPointX = redDot.getBoundingClientRect().x - Diag1_hide._gsTransform.x + 123 - (Diag1Nw2.getBoundingClientRect().width);
	// redDotPointX = redDot.getBoundingClientRect().x - Diag1_hide._gsTransform.x + xComp;
	redDotPointY = redDot.getBoundingClientRect().y + (redDot.getBoundingClientRect().width/2);
	redDotPointX = redDot.getBoundingClientRect().x + (redDot.getBoundingClientRect().width/2);
	    for(i=0; i<boxArray.length; i++){
    		redComponent = document.getElementById(boxArrayIdsArray[i])
    		if(redDotPointX > boxArray[i].x && redDotPointX < Math.abs(boxArray[i].x + boxArray[i].width) && redDotPointY > boxArray[i].y && redDotPointY < Math.abs(boxArray[i].y + boxArray[i].height)){
    			// TweenMax.to(redComponent, 0, {opacity:1})
    			TweenMax.to(redDot, .5, {opacity:0})
    			redComponentSplit = redComponent.id.split("Box")
				redLeadPot = window[redComponentSplit[0]+"Pot"];
    			break;
    		}else{
    			// TweenMax.to(redComponent, 0, {opacity:0})
    			TweenMax.to(redDot, .5, {opacity:1})
    			redLeadPot = "string";
    		}
    	}

	blackDotPointY = blackDot.getBoundingClientRect().y + (blackDot.getBoundingClientRect().width/2);
	blackDotPointX = blackDot.getBoundingClientRect().x + (blackDot.getBoundingClientRect().width/2);
	    for(a=0; a<boxArray.length; a++){
    		blackComponent = document.getElementById(boxArrayIdsArray[a])
    		if(blackDotPointX > boxArray[a].x && blackDotPointX < Math.abs(boxArray[a].x + boxArray[a].width) && blackDotPointY > boxArray[a].y && blackDotPointY < Math.abs(boxArray[a].y + boxArray[a].height)){
    			// TweenMax.to(blackComponent, 0, {opacity:1})
    			TweenMax.to(blackDot, .5, {opacity:0})
    			blackComponentSplit = blackComponent.id.split("Box")
				blackLeadPot = window[blackComponentSplit[0]+"Pot"];
				break;
    		}else{
    			// TweenMax.to(blackComponent, 0, {opacity:0})
    			TweenMax.to(blackDot, .5, {opacity:1})
    			blackLeadPot = "string";
    		}
    	}
    
    if(redLeadPot-blackLeadPot<0){
    	TweenMax.to(negative_hide, 0, {autoAlpha:1})
    	}else{
    		TweenMax.to(negative_hide, 0, {autoAlpha:0})
    }
    var knobRotGS = meterKnob._gsTransform.rotation;
    // console.log(knobRotGS)
    if(knobRotGS !== 180){
		changeMeter(Math.abs(redLeadPot-blackLeadPot))
	}

	boxArray = [];
	var boxIDLength = boxArrayIdsArray.length;
	for(var i=0; i<boxIDLength; i++){
		var box = document.getElementById(boxArrayIdsArray[i]);
		boxArray.push(box.getBoundingClientRect());
	}
	// setPotentials();
}

function changeMeter(reading){
	if (isNaN(reading) == true){
		reading = 0;
	}
	var readingToString = reading.toString();
	var fourDigit = reading.toFixed(3);
	var readingSplit = fourDigit.split("");

	TweenMax.to([thousArray,hunsArray,tensArray,onesArray,dot1_hide,dot2_hide,dot3_hide,dot4_hide], 0, {autoAlpha:0})
	

	var index = readingSplit.indexOf(".");
	if (index > -1) {
	  readingSplit.splice(index, 1);
	}
	var decimalPointPos = "dot" + (index+1) + "_hide";

	var thousandsNumber = "thous" + readingSplit[0] + "Array";
	var hunsNumber = "huns" + readingSplit[1] + "Array";
	var tensNumber = "tens" + readingSplit[2] + "Array";
	var onesNumber = "ones" + readingSplit[3] + "Array";

	TweenMax.to(window[decimalPointPos], 0, {autoAlpha:1});	
	TweenMax.to(window[thousandsNumber], 0, {autoAlpha:1})	
	TweenMax.to(window[hunsNumber], 0, {autoAlpha:1});	
	TweenMax.to(window[tensNumber], 0, {autoAlpha:1});
	TweenMax.to(window[onesNumber], 0, {autoAlpha:1});
	
}

var svgWindow = document.getElementById("main");
var svg = d3.select(svgContent);
function redraw(){
	var width = svgWindow.clientWidth;
	var height = svgWindow.clientHeight;
	svg
		.attr("width", width)
		.attr("height", height);
	
}
redraw();
window.addEventListener("resize", redraw);


window.addEventListener('resize', function(){
  if(screen.width === window.innerWidth){
   xComp =124;
  }else{
  	console.log("Not Fullscreen")
   xComp =120;
  }
});




var testWire = Diag1Nw1Box.getBoundingClientRect();
// var testWire = boxArray[16];
function setPotentials(){
	for(var a=0; a<boxArray.length; a++){
	
	for(var i=0; i< boxArray.length; i++){

		// console.log("boxArrayID: " + boxArrayIdsArray[i])
		// console.log("Box Start X: " + boxArray[i].x)
		// console.log("Test x: " + testWire.x)
		// console.log("Box End X: " + (boxArray[i].x + boxArray[i].width))
		// console.log()
		// console.log("Box Start Y: " + boxArray[i].y)
		// console.log("Test Y: " + testWire.y)
		// console.log("Box End Y: " + (boxArray[i].y + boxArray[i].height))
		console.log()
		// if(boxArray[i].x >= testWire.x && boxArray[i].x <= testWire.x + testWire.width && boxArray[i].y >= testWire.y && boxArray[i].y <= testWire.y + boxArray[i].height){
		if(boxArray[i].bottom >= testWire.bottom-10 && boxArray[i].top <= testWire.top+10){
			testWire = boxArray[i];
			blackComponent = document.getElementById(boxArrayIdsArray[i])
			TweenMax.to(blackComponent, 0, {opacity:1})
			
			console.log("new testwire: " + boxArrayIdsArray[i])
			// break;
	}
}
}

}




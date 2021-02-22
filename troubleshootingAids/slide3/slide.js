// slide = // slide = new XMLHttpRequest();
// slide.open("GET","slide.svg",false);
// slide.overrideMimeType("image/svg+xml");
// slide.send("");
// var slide= document.getElementById("main").appendChild(slide.responseXML.documentElement);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var slideTl = new TimelineMax({paused:true});

//Audio
slideAudio.onplay = function() {
	slideTl.play();
	slideTl.time(slideAudio.currentTime);
};

slideAudio.onpause = function() {
	slideTl.pause();
	slideTl.time(slideAudio.currentTime);
};

slideAudio.ontimeupdate = function() {
	slideTl.time(slideAudio.currentTime);
};

function pausePlayer(){
	slideAudio.pause();
	slideTl.time(slideAudio.currentTime);
}
//End Audio

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
		case "drag":
		TweenMax.to(objectArray[i], .01, {autoAlpha:0})
	}
}
//End Hide Code

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TweenMax.to(cover_hide,0, {autoAlpha:0})
TweenMax.to([rect6188], 0, {opacity:0});
TweenMax.to([electronPath2], 0.5, {strokeDasharray:"2,12", ease:Linear.easeNone});
TweenMax.to([electronPath2], 0.5, {strokeDashoffset:"-=14", repeat:-1, ease:Linear.easeNone,yoyo:false});

var motionPath0 = MorphSVGPlugin.pathDataToBezier("#freeElectronPath2", {align:freeElectronAtom2});
var motionPath1 = MorphSVGPlugin.pathDataToBezier("#motionPath1", {align:freeElectron1});
var motionPath2 = MorphSVGPlugin.pathDataToBezier("#motionPath2", {align:freeElectron2});
var motionPath3 = MorphSVGPlugin.pathDataToBezier("#motionPath3", {align:freeElectron1});
var motionPath4 = MorphSVGPlugin.pathDataToBezier("#electronPath3", {align:freeElectronAtom2});

slideTl
.to(headingText,1,{autoAlpha:0, delay:1})
.to(freeElectron1, 2, {bezier:{values:motionPath1, type:"cubic"}, ease:Linear.easeNone, delay:2})
.to(freeElectron2, 2, {bezier:{values:motionPath2, type:"cubic"}, ease:Linear.easeNone})
.to([copperAtom],1, {autoAlpha:0,delay:2})
.to([magnet1_drag,magnet2_drag],1, {autoAlpha:1,delay:0})

.to([magnet1_drag],1, {x:"+=42",delay:3.5})
.to([magnet2_drag],1, {x:"-=42",delay:-1})
.to(magnet1_drag,1, {rotation:180, transformOrigin:"150 50", delay:2.5})
.to(magnet1_drag,1, {y:"-=5", delay:-1})
.to([magnet1_drag],1, {x:"-=42",delay:1})
.to([magnet2_drag],1, {x:"+=42",delay:-1})

.to([magnet1_drag,magnet2_drag],1, {autoAlpha:0,delay:1})

.to([copperAtom2_drag,positiveAtom_drag, negativeAtom_drag],1, {autoAlpha:1,delay:0})


.to([freeElectronAtom2], 10, {bezier:{values:motionPath0, type:"cubic"}, ease: CustomEase.create("custom", "M0,0 C0.36,0.12 0.167,0.041 0.446,0.436 0.744,0.858 0.748,0.406 1,1")})
.to([positiveAtom_drag,negativeAtom_drag,"#negativeAtom_drag-4-9","#negativeAtom_drag-4"],1, {autoAlpha:0, delay:1})


.staggerFromTo([dividerLine], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:8})

.to(freeElectronAtom2, 2, {bezier:{values:motionPath4, type:"cubic"}})

.to([copperAtom2_drag,dividerLine], 1, {autoAlpha:0, delay:1})
.to([battery1_drag],1, {autoAlpha:1,delay:0})
.to([batteryCover],1, {autoAlpha:0, delay:2})

.to([leftElectrons, leftHoles], .5, {scaleX:1.05, scaleY:1.05, transformOrigin: "50% 50%", ease:Bounce. easeOut, delay:2})
.to([leftElectrons, leftHoles], .5, {scaleX:1, scaleY:1, transformOrigin: "50% 50%", ease: Power0.easeNone})

.to([rightElectrons, rightHoles], .5, {scaleX:1.05, scaleY:1.05, transformOrigin: "50% 50%", ease:Bounce. easeOut})
.to([rightElectrons, rightHoles], .5, {scaleX:1, scaleY:1, transformOrigin: "50% 50%", ease: Power0.easeNone})

.from(arrow1, 1, {drawSVG:"0%", immediateRender:true, ease: Power0.easeNone, delay:1})
.to([arrowHead1_drag],.5, {autoAlpha:1})

.to([arrow1,arrowHead1_drag],.5, {autoAlpha:0, delay:2})

.to([s2Text3_drag],1, {autoAlpha:1, delay:2})
.to([s2Text3_drag],1, {autoAlpha:0, delay:2.5})

//Move electrons right
.to(rightElectrons, 3, {x:"-=134", ease: Power0.easeNone, delay:1})
.to([s2Text2_drag],1, {autoAlpha:1, delay:8})
.to([s2Text1_drag],1, {autoAlpha:1, delay:13})
.to(rightHoles, 1, {stroke:"red", delay:-1})

.to([s2Text4_drag],1, {autoAlpha:1, delay:8})
.to([s2Text4_drag],1, {autoAlpha:0, delay:2.5})

// wire between pos and neg
.staggerFromTo([wire1], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone, delay:0})
.staggerFromTo([wire2], 1, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone})

.from(electronPath2, 1, {autoAlpha:0, delay:1})



.to([wire1,wire2,battery1_drag,electronPath2,s2Text2_drag,s2Text1_drag], 1, {autoAlpha:0, delay:28})

.from([endText1,text6241],1, {autoAlpha:0, delay:4})

.from([endText2],1, {autoAlpha:0, delay:5.5})

.from([endText3],1, {autoAlpha:0, delay:3.1})



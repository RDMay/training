var htmlBody = document.getElementsByTagName("BODY")[0];
showWindowDrag=Draggable.create("#showWindow", {zIndexBoost:false, type:"x,y", edgeResistance:0.65});





var editorHidden = false;
window.oncontextmenu = function (e){
    e.preventDefault();
    if(editor.className === "editorHidden"){
        	editor.className = "editorVisible"
        }else{
        	editor.className = "editorHidden";
        }
    }




//Create Group Evventlistener










function getPosition(e){
	var textBox = document.getElementById(e.id);
	textHeight = textBox.getBoundingClientRect().height - textBox.getBoundingClientRect().height/2;
	console.log(textBox.getBoundingClientRect().height)
	console.log(textHeight)
	console.log("x:" + (textBox.getBoundingClientRect().left) + ", y:" + (textBox.getBoundingClientRect().top - textHeight));
}

//Keyboard EventListeners

window.onkeydown = function(e) {
	console.log(e.keyCode)
	switch(e.keyCode) {
		case 34:
		e.preventDefault();
		if(btn1.innerHTML === "PLAY"){
			mainTl.play();
			btn1.innerHTML="PAUSE"
		}else{
			mainTl.pause();
			btn1.innerHTML="PLAY"
		}
		break;

		case 33:
        e.preventDefault();
        mainTl.reverse();
        break;
         
        case 40:
         e.preventDefault();
        if(editor.className === "editorHidden"){
        	editor.className = "editorVisible"
        }else{
        	editor.className = "editorHidden";
        }
        case 27:
        spans = document.getElementsByTagName("span");
        for(i=0; i<spans.length; i++){
        spans[i].setAttribute("contenteditable", "false");
    }
        break;
} 

}

//Show Window Zoom
var scaleUp = 1;
showWindow.addEventListener ("DOMMouseScroll", zoomHandler, false);
function zoomHandler(event){
	console.log("zoomHandler:" + event)
	scaleUp = this._gsTransform.scaleY;
	event.preventDefault();
	switch(event.detail>0) {
		case true:
		if(scaleUp > .5 ){
			scaleUp = scaleUp - .01;
			TweenMax.to(showWindow, .5, {scaleX:scaleUp, scaleY:scaleUp, transformOrigin: "50% 50%", ease: Power0.easeNone});
		}
		break;
		case false:
		scaleUp = scaleUp + .01;
    	TweenMax.to(showWindow, .5, {scaleX:scaleUp, scaleY:scaleUp, transformOrigin: "50% 50%", ease: Power0.easeNone});
        break;
    }
}


var forcedPause =false;
function updateLineNumber(slideNumber, lineNumber){
	if (forcedPause === true) {
		mainTl.pause();
		btn1.innerHTML="PLAY"
	}
	if(slideNumber != undefined){
		// codeLineText.innerHTML=lineNumber;
	}
	if(lineNumber != undefined){
		// slideNumberContainer.innerHTML=lineNumber;
	}
}

showWindow.addEventListener ("DOMMouseScroll", zoomHandler2, false);
scaleUp = 1;
function zoomHandler2(event){
	console.log(spTarget.value)
	target=spTarget.value;
	event.preventDefault();
	switch(event.detail>0) {
		case true:
		if(scaleUp > .5 ){
			scaleUp = scaleUp - .01;
			TweenMax.to(target, .5, {scaleX:scaleUp, scaleY:scaleUp, transformOrigin: "50% 50%", ease: Power0.easeNone});
		}
		break;
		case false:
		scaleUp = scaleUp + .01;
    	TweenMax.to(target, .5, {scaleX:scaleUp, scaleY:scaleUp, transformOrigin: "50% 50%", ease: Power0.easeNone});
        break;
    }
}

function copyToClipboard() {
	editorHidden = true;
	var aux = document.createElement("input");
	 aux.setAttribute("value", document.getElementById("codeText").innerHTML);
	 document.body.appendChild(aux);
	 aux.select();
	 document.execCommand("copy");
	 document.body.removeChild(aux);
	 codeText.innerHTML = "Copied!";
	idText.innerHTML=";"
}

function openPage(){
	window.open("https://www.ptable.com/")

}

var checkArrayObject = "";
var checkArrayObjectId = "";
function setUpChechArrays(target){
	checkArrayObjectId = target.id;
	checkArrayObject = target;
}

function tweenScale(){
	try{
		codeText.innerHTML = "." + tweenType.value + "([" + idText.innerHTML + "], " + tweenDuration.value + ", {x:" + xText.innerHTML + ", y:" + yText.innerHTML + ", scaleX:" + scaleXText.innerHTML + ", scaleY:" + scaleYText.innerHTML + ", transformOrigin: '50% 50%', ease: Power0.easeNone, onComplete: " + onCompleteSelect.value + ", onCompleteParams:[2, new Error().lineNumber]},'-=0')";
	}
	catch(err){
		codeText.innerHTML = "Select an object.";
	}
}



function textFrom0(){
	try{
		codeText.innerHTML = tweenParent.value + ".from([" + idText.innerHTML + "],1, {autoAlpha:0, onComplete: " + onCompleteSelect.value + ", onCompleteParams:[2, new Error().lineNumber]},'-=" + delayChangeText.value + "')";
	}
	catch(err){
		codeText.innerHTML = "Select an object.";
	}
}

function textTo0(){
	try{
		codeText.innerHTML = tweenParent.value + ".to([" + idText.innerHTML + "],1, {autoAlpha:0, onComplete: " + onCompleteSelect.value + ", onCompleteParams:[2, new Error().lineNumber]},'-=" + delayChangeText.value + "')";
	}
	catch(err){
		codeText.innerHTML = "Select an object.";
	}
}

function drawSvg(){
	try{
		codeText.innerHTML = ".staggerTo([" + idText.innerHTML + "], " + tweenDuration.value + ", {drawSVG:'0%'" + ", transformOrigin: '50% 50%', ease: Power0.easeNone, onComplete: " + onCompleteSelect.value + ", onCompleteParams:[2, new Error().lineNumber]}," + tweenDuration.value + ")";
		// .staggerTo(['#s3L1a','#path8647','#path8649','#path8723'], .5, {drawSVG:'100%', transformOrigin: '50% 50%', ease: Power0.easeNone, onComplete: updateLineNumber, onCompleteParams:[2, new Error().lineNumber]},.5)







	}
	catch(err){
		codeText.innerHTML = "Select an object.";
	}
}

var checkArrayObject = "";
var checkArrayObjectId = "";
function setUpChechArrays(target){
	checkArrayObjectId = target.id;
	checkArrayObject = target;
}

function tweenScale(){
	try{
		codeText.innerHTML = tweenParent.value + "." + tweenType.value + "([" + idText.innerHTML + "], " + tweenDuration.value + ", {x:" + xText.innerHTML + ", y:" + yText.innerHTML + ", scaleX:" + scaleXText.innerHTML + ", scaleY:" + scaleYText.innerHTML + ", transformOrigin: '50% 50%', ease: Power0.easeNone, onComplete: " + onCompleteSelect.value + ", onCompleteParams:[2, new Error().lineNumber]},'-=0')";
	}
	catch(err){
		codeText.innerHTML = "_drag object not selected.";
	}
}

function tweenautoAlpha(){
	try{
		codeText.innerHTML = tweenParent.value + "." + tweenType.value + "([" + idText.innerHTML + "], " + tweenDuration.value + ", {autoAlpha:" + tweenDuration.value + ", onComplete: " + onCompleteSelect.value + ", onCompleteParams:[2, new Error().lineNumber]},'" + delayChangeText.value + "')";
	}
	catch(err){
		codeText.innerHTML = "_drag object not selected.";
	}
}

function tweenText(){
	try{
		codeText.innerHTML = tweenParent.value + "." + tweenType.value + "(" + idText.innerHTML + ", " + tweenDuration.value + ", {x:" + xText.innerHTML + ", y:" + yText.innerHTML + ", transformOrigin: '50% 50%', ease: Power0.easeNone, onComplete: " + onCompleteSelect.value + ", onCompleteParams:[2, new Error().lineNumber]},'-=0')";
	}
	catch(err){
		codeText.innerHTML = "_drag object not selected.";
	}
}

function copyToClipboard() {
	TweenMax.to(editor, 2, {autoAlpha:0})
	editorHidden = true;
	var aux = document.createElement("input");
	 aux.setAttribute("value", document.getElementById("codeText").innerHTML);
	 document.body.appendChild(aux);
	 aux.select();
	 document.execCommand("copy");
	 document.body.removeChild(aux);
	 codeText.innerHTML = "Copied!";
}
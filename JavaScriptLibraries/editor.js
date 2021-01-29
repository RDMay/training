var htmlBody = document.getElementsByTagName("BODY")[0];
selectFunction.value = "blank";
editor.classList.add('editorHidden');

function editorChange(changeTo){
	addLine.classList = "editorHidden"
	editText.classList = "editorHidden"
	sizePosition.classList = "editorHidden"
	traceDiagram.classList = "editorHidden"
	morphLeads.classList = "editorHidden"
	switch(changeTo) {
		case "addLine":
		addLine.classList = "editorLine2"
		break;
		case "editText":
		editText.classList = "editorLine2"
		break;
		case "positionScale":
		sizePosition.classList = "editorLine2"
		break;
		case "traceDiagram":
		traceDiagram.classList = "editorLine2"
		break;
		case "moveMeterLeads":
		console.log("meterLeadsFired")
		morphLeads.classList = "editorLine2"
		break;
	}	
}

var drawSVGArray = [];
function traceLines(target){
	if(drawDirection.value === "drawForward"){
	var aux = document.createElement("input");
	aux.setAttribute("value", ".set([" + codeText.innerHTML + "], {stroke:" + tdStrokeColor.value + "}).staggerFromTo([" + codeText.innerHTML + "], .7, {drawSVG:'0% 0%'}, {drawSVG: '0% 100%', ease: Power0.easeNone},.7)");
	 document.body.appendChild(aux);
	 aux.select();
	 document.execCommand("copy");
	 document.body.removeChild(aux);
	 drawSVGArray = []
	 codeText.innerHTML = drawSVGArray;
	}else{
		drawSVGArray.reverse();
		codeText.innerHTML = drawSVGArray;
	var aux = document.createElement("input");
	aux.setAttribute("value", ".set([" + codeText.innerHTML + "], {stroke:" + tdStrokeColor.value + "})<br>.staggerFromTo([" + codeText.innerHTML + "], .7, {drawSVG:'100% 100%'}, {drawSVG: '0% 100%'},.7)");
	 document.body.appendChild(aux);
	 aux.select();
	 document.execCommand("copy");
	 document.body.removeChild(aux);
	 drawSVGArray = []
	 codeText.innerHTML = drawSVGArray;
	}
}


var points = 2;
var drawLinesPathArray = [path1,path2,path3,path4,path5,path6,path7,path8,path9,path10];
// document.getElementById("path1")
function addPoint(){
	points++;
	thisPoint = "point" + points;
	var tweenPoint = document.getElementById(thisPoint)
	TweenMax.to(tweenPoint, 1, {x:400,y:200})
}

function drawLines(){
	pathNumber.value++;
	console.log(callOutPath)
	callOutPath = document.getElementById("path"+pathNumber.value)
	TweenMax.to(point1, 1, {x:400,y:200})
		TweenMax.to(point2, 1, {x:425,y:200})
		TweenMax.to(point3, 1, {x:0,y:0})
		TweenMax.to(point4, 1, {x:0,y:0})
		TweenMax.to(point5, 1, {x:0,y:0})
		TweenMax.to(point6, 1, {x:0,y:0})
		TweenMax.to(point7, 1, {x:0,y:0})
		TweenMax.to(point8, 1, {x:0,y:0})
		TweenMax.to(point9, 1, {x:0,y:0})
		TweenMax.to(point10, 1, {x:0,y:0})
		Draggable.create([point1, point2, point3, point4, point5, point6, point7, point8, point9, point10], {
		onDrag: function() {updatePath()}});
		updatePath();
}


var point1XPos = point1.getBBox().x + point1.getBBox().width/2;
var point1YPos = point1.getBBox().y + point1.getBBox().width/2;
var point2XPos = point2.getBBox().x + point2.getBBox().width/2;
var point2YPos = point2.getBBox().y + point2.getBBox().width/2;
var point3XPos = point3.getBBox().x + point3.getBBox().width/2;
var point3YPos = point3.getBBox().y + point3.getBBox().width/2;
var point4XPos = point4.getBBox().x + point4.getBBox().width/2;
var point4YPos = point4.getBBox().y + point4.getBBox().width/2;
var point5XPos = point5.getBBox().x + point5.getBBox().width/2;
var point5YPos = point5.getBBox().y + point5.getBBox().width/2;
var point6XPos = point6.getBBox().x + point6.getBBox().width/2;
var point6YPos = point6.getBBox().y + point6.getBBox().width/2;
var point7XPos = point7.getBBox().x + point7.getBBox().width/2;
var point7YPos = point7.getBBox().y + point7.getBBox().width/2;
var point8XPos = point8.getBBox().x + point8.getBBox().width/2;
var point8YPos = point8.getBBox().y + point8.getBBox().width/2;
var point9XPos = point9.getBBox().x + point9.getBBox().width/2;
var point9YPos = point9.getBBox().y + point9.getBBox().width/2;
var point10XPos = point10.getBBox().x + point10.getBBox().width/2;
var point10YPos = point10.getBBox().y + point10.getBBox().width/2;

point1.onmouseover = function(){this.style.cursor="default"}
point1.onmousedown = function(){showWindowDrag[0].disable();};
point1.onmouseup = function(){
  showWindowDrag[0].enable();
  var aux = document.createElement("input");
   document.body.appendChild(aux);
   aux.select();
   document.execCommand("copy");
   document.body.removeChild(aux);
};

point2.onmouseover = function(){this.style.cursor="default"}
point2.onmousedown = function(){showWindowDrag[0].disable();};
point2.onmouseup = function(){
  showWindowDrag[0].enable();
  var aux = document.createElement("input");
   document.body.appendChild(aux);
   aux.select();
   document.execCommand("copy");
   document.body.removeChild(aux);
};

point3.onmouseover = function(){this.style.cursor="default"}
point3.onmousedown = function(){showWindowDrag[0].disable();};
point3.onmouseup = function(){
  showWindowDrag[0].enable();
  var aux = document.createElement("input");
   document.body.appendChild(aux);
   aux.select();
   document.execCommand("copy");
   document.body.removeChild(aux);
};

point4.onmouseover = function(){this.style.cursor="default"}
point4.onmousedown = function(){showWindowDrag[0].disable();};
point4.onmouseup = function(){
  showWindowDrag[0].enable();
  var aux = document.createElement("input");
   document.body.appendChild(aux);
   aux.select();
   document.execCommand("copy");
   document.body.removeChild(aux);
};

point5.onmouseover = function(){this.style.cursor="default"}
point5.onmousedown = function(){showWindowDrag[0].disable();};
point5.onmouseup = function(){
  showWindowDrag[0].enable();
  var aux = document.createElement("input");
   document.body.appendChild(aux);
   aux.select();
   document.execCommand("copy");
   document.body.removeChild(aux);
};

point6.onmouseover = function(){this.style.cursor="default"}
point6.onmousedown = function(){showWindowDrag[0].disable();};
point6.onmouseup = function(){
  showWindowDrag[0].enable();
  var aux = document.createElement("input");
   document.body.appendChild(aux);
   aux.select();
   document.execCommand("copy");
   document.body.removeChild(aux);
};

point7.onmouseover = function(){this.style.cursor="default"}
point7.onmousedown = function(){showWindowDrag[0].disable();};
point7.onmouseup = function(){
  showWindowDrag[0].enable();
  var aux = document.createElement("input");
   document.body.appendChild(aux);
   aux.select();
   document.execCommand("copy");
   document.body.removeChild(aux);
};

point8.onmouseover = function(){this.style.cursor="default"}
point8.onmousedown = function(){showWindowDrag[0].disable();};
point8.onmouseup = function(){
  showWindowDrag[0].enable();
  var aux = document.createElement("input");
   document.body.appendChild(aux);
   aux.select();
   document.execCommand("copy");
   document.body.removeChild(aux);
};

point9.onmouseover = function(){this.style.cursor="default"}
point9.onmousedown = function(){showWindowDrag[0].disable();};
point9.onmouseup = function(){
  showWindowDrag[0].enable();
  var aux = document.createElement("input");
   document.body.appendChild(aux);
   aux.select();
   document.execCommand("copy");
   document.body.removeChild(aux);
};

point10.onmouseover = function(){this.style.cursor="default"}
point10.onmousedown = function(){showWindowDrag[0].disable();};
point10.onmouseup = function(){
  showWindowDrag[0].enable();
  var aux = document.createElement("input");
   document.body.appendChild(aux);
   aux.select();
   document.execCommand("copy");
   document.body.removeChild(aux);
};

callOutPath = path11;
function updatePath() {
  var x1 = point1XPos + point1._gsTransform.x;
  var y1 = point1YPos + point1._gsTransform.y;
  var x2 = point2XPos + point2._gsTransform.x;
  var y2 = point2YPos + point2._gsTransform.y;
  var x3 = point3XPos + point3._gsTransform.x;
  var y3 = point3YPos + point3._gsTransform.y;
  var x4 = point4XPos + point4._gsTransform.x;
  var y4 = point4YPos + point4._gsTransform.y;
  var x5 = point5XPos + point5._gsTransform.x;
  var y5 = point5YPos + point5._gsTransform.y;
  var x6 = point6XPos + point6._gsTransform.x;
  var y6 = point6YPos + point6._gsTransform.y;
  var x7 = point7XPos + point7._gsTransform.x;
  var y7 = point7YPos + point7._gsTransform.y; 
  var x8 = point8XPos + point8._gsTransform.x;
  var y8 = point8YPos + point8._gsTransform.y;
  var x9 = point9XPos + point9._gsTransform.x;
  var y9 = point9YPos + point9._gsTransform.y; 
  var x10 = point10XPos + point10._gsTransform.x;
  var y10 = point10YPos + point10._gsTransform.y;  

  switch(points) {
		case 2:
		callOutPath.setAttribute("d", `M${x1} ${y1} L${x2} ${y2}`);
		break;
		case 3:
		callOutPath.setAttribute("d", `M${x1} ${y1} L${x2} ${y2} ${x3} ${y3}`);
		break;
		case 4:
		callOutPath.setAttribute("d", `M${x1} ${y1} L${x2} ${y2} ${x3} ${y3} ${x4} ${y4}`);
		break;
		case 5:
		callOutPath.setAttribute("d", `M${x1} ${y1} L${x2} ${y2} ${x3} ${y3} ${x4} ${y4} ${x5} ${y5}`);
		break;
		case 6:
		callOutPath.setAttribute("d", `M${x1} ${y1} L${x2} ${y2} ${x3} ${y3} ${x4} ${y4} ${x5} ${y5} ${x6} ${y6}`);
		break;
		case 7:
		callOutPath.setAttribute("d", `M${x1} ${y1} L${x2} ${y2} ${x3} ${y3} ${x4} ${y4} ${x5} ${y5} ${x6} ${y6} ${x7} ${y7}`);
		break;
		case 8:
		callOutPath.setAttribute("d", `M${x1} ${y1} L${x2} ${y2} ${x3} ${y3} ${x4} ${y4} ${x5} ${y5} ${x6} ${y6} ${x7} ${y7} ${x8} ${y8}`);
		break;
		case 9:
		callOutPath.setAttribute("d", `M${x1} ${y1} L${x2} ${y2} ${x3} ${y3} ${x4} ${y4} ${x5} ${y5} ${x6} ${y6} ${x7} ${y7} ${x8} ${y8} ${x9} ${y9}`);
		break;
		case 10:
		callOutPath.setAttribute("d", `M${x1} ${y1} L${x2} ${y2} ${x3} ${y3} ${x4} ${y4} ${x5} ${y5} ${x6} ${y6} ${x7} ${y7} ${x8} ${y8} ${x9} ${y9} ${x10} ${y10}`);
		break;
	}
}

function addTextBox(){
	currentProgess=mainTl.progress();
	mainTl.progress(1);
	textArrays=showWindow.getElementsByTagName("span");
	console.log(textArrays.length)
	for(i=0; i<textArrays.length; i++){
		console.log(textArrays[i].className)
		if(textArrays[i].className == "textDrag"){
			TweenMax.to(textArrays[i], 1, {className:changeClass.value});
			TweenMax.to(textArrays[i], .001, {autoAlpha:1});
			// TweenLite.to(textArrays[i], 1, {className:"h1 blackBg"});
			break;
		}
	}
	mainTl.progress(currentProgess)
}

function getLineCode() {
	myPath = "path" + pathNumber.value;
	var aux = document.createElement("input");
	aux.setAttribute("value", '.add(function(){' + myPath + '.setAttribute("d", "' + document.getElementById(myPath).getAttribute("d") + '");' + myPath  + '.style.strokeWidth = ' + selectStrokeWidth.value + '; ' + myPath + '.style.stroke = ' + strokeColor.value + ';}) <br>.from(' +  myPath + ', ' +  selectTime.value + ', {drawSVG:"0%", immediateRender:true, ease: Power0.easeNone, delay:'  + selectDelay.value + '})');
	 document.body.appendChild(aux);
	 aux.select();
	 document.execCommand("copy");
	 document.body.removeChild(aux);
	 codeText.innerHTML = aux.value;
}

function getScalePosition() {
	selection = document.getElementById(codeText.innerHTML)
	var aux = document.createElement("input");
	aux.setAttribute("value", '.to(' + selection.id + ',' + spSelectTime.value + ',{x:' + selection._gsTransform.x + ', y:' + selection._gsTransform.y + ', scaleX:' + selection._gsTransform.scaleX + ', scaleY:' + selection._gsTransform.scaleY + ', transformOrigin: "50% 50%",ease:Power0.easeNone, onComplete: updateLineNumber, onCompleteParams:[new Error().lineNumber]},"' + spSelectDelay.value + '")');
	 document.body.appendChild(aux);
	 aux.select();
	 document.execCommand("copy");
	 document.body.removeChild(aux);
}

function moveMeterLeads(){
	blackX = blueDotXPos + blueDot._gsTransform.x;
	blackY = blueDotYPos + blueDot._gsTransform.y;
	if(leadColor.value == "blackLead"){
		var aux = document.createElement("input");
		aux.setAttribute("value", '.to(' + leadColor.value + ', 1 ,{morphSVG:"M 93.480472,282.09292 C 50,600 800,500 ' + blackX + ', ' + blackY + '"})');
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");
		document.body.removeChild(aux);
	}else{
		var aux = document.createElement("input");
		aux.setAttribute("value", '.to(' + leadColor.value + ', 1 ,{morphSVG:"M 144.211,283.432 C 50,600 800,500 ' + blackX + ', ' + blackY + '"})');
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");
		document.body.removeChild(aux);
	}
}


// .to([nucleus_drag], 1, {x:127, y:-174, scaleX:0.3567945767525061, scaleY:0.350428666064864, autoAlpha:1, transformOrigin: '50% 50%', ease: Power0.easeNone, onComplete: updateLineNumber, onCompleteParams:[1, new Error().lineNumber]},'-=0')



///////////////////////////////////////////////////TEXT










function getCoordinates(){
	newPath = "path" + pathNumber.value;
	console.log(clonePath.value)
	// clonePath = "path" + clonePath.value;
	var aux = document.createElement("input");
	aux.setAttribute("value", '.add(function(){' + newPath + '.setAttribute("d", "' + document.getElementById(clonePath.value).getAttribute("d") + '");' + newPath  + '.style.strokeWidth = ' + selectStrokeWidth.value + '; ' + newPath + '.style.stroke = ' + strokeColor.value + ';}) <br>.from(' +  newPath + ', ' +  selectTime.value + ', {drawSVG:"0%", immediateRender:true, ease: Power0.easeNone, delay:'  + selectDelay.value + '})');
	 document.body.appendChild(aux);
	 aux.select();
	 document.execCommand("copy");
	 document.body.removeChild(aux);
	 codeText.innerHTML = aux.getAttribute("value");
}

var selectedText = "";
function getTextCode() {
	var myText = document.getElementById(selectedText)
	console.log("fired" + myText.innerHTML)
	var aux = document.createElement("input");
	aux.setAttribute("value", '.set(' + selectedText + ', {text:"' + myText.innerHTML + '", className:"' + changeClass.value + '", x:' + myText._gsTransform.x + ', y:' + myText._gsTransform.y + '}).to(['+ selectedText +'],1, {autoAlpha:1})');
	



	 document.body.appendChild(aux);
	 aux.select();
	 document.execCommand("copy");
	 document.body.removeChild(aux);
	 codeText.innerHTML = aux.getAttribute("value");
}























function selectTargetFunction(e){
	console.log(e)
	selectTarget.options.length=0;
	componentToZoom=e.target;
	for (var i = 0; i < familyTreeArray.length; i++) {
		selectTarget.options[i]=new Option(familyTreeArray[i], familyTreeArray[i], true, false)
	}
	familyTreeArray=[];
}

var familyTreeArray = [];
var documentPaths = document.getElementsByTagName("path");
var documentPathLength = documentPaths.length;
for(i=0; i<documentPathLength; i++){
	var path = documentPaths[i];
		path.setAttribute('onmouseover','this.style.cursor = "default"; originalStrokeColor = this.getAttribute("stroke"); this.setAttribute("stroke", "red");');
		path.setAttribute('onmouseout','this.setAttribute("stroke", originalStrokeColor);');
		path.setAttribute('onclick','familyTreeArray.push(this.id); familyTreeArray.push(this.parentNode.id); familyTreeArray.push(this.parentNode.parentNode.id); familyTreeArray.push(this.parentNode.parentNode.parentNode.id); familyTreeArray.push(this.parentNode.parentNode.parentNode.parentNode.id); drawSVGArray.push("" + this.id); codeText.innerHTML=drawSVGArray; selectTargetFunction(e); editorChange("positionScale");');
}

var newDraggable=[]
function createDraggable(){
	try{newDraggable.kill();}catch(err){};
	var target = document.getElementById(selectTarget.value);
	newDraggable = new Draggable(target);
	// target.addEventListener ("DOMMouseScroll", zoomHandler2, false);
}

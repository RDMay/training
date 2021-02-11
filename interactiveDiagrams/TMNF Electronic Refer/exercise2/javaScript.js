document.title = "TM Refrigerator Exercise 2"

var originalLineSize = "1px";
var highlightedWidth = "3px";

//Toggle Edit Functions
getWireColors.style.display="none";
window.addEventListener("keydown", toggleEditor);
function toggleEditor(){
  if(event.keyCode == 16 && event.ctrlKey){
    getColors();
  }
}

var deviceType = "not mobile";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  deviceType="mobile"
}

xhr = new XMLHttpRequest();
xhr.open("GET","schematic.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");

var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);
// var schematic = document.getElementById("mainSvg");

schematic.setAttribute("width", screen.width);
schematic.setAttribute("height", screen.height);

//Resize Window
var svgWindow = document.getElementById("mainWindow");
var svg = d3.select(schematic);
function myredraw(){
  var width = svgWindow.clientWidth;
  var height = svgWindow.clientHeight;
  svg
  .attr("width", width)
  .attr("height", height);
}
myredraw();
window.addEventListener("resize", myredraw)

//Set Path Codes
var diagram1Paths = document.getElementById("diagram1").getElementsByTagName("path");
var diagram1PathsLength = diagram1Paths.length;

for(i=0; i<diagram1PathsLength; i++){
  diagram1Paths[i].style['stroke-linecap']="round";
  diagram1Paths[i].style.stroke = "Black";
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke','blue');
  path.setAttribute('fill','none');
  path.setAttribute('opacity',0);
  path.setAttribute('id',diagram1Paths[i].id + 'copy');

  if(deviceType == "mobile"){
    path.setAttribute('onclick','wireClicked(this);');
    path.setAttribute('ontouchstart','wireClicked(this);');
    path.setAttribute('ontouchend','wireClicked(this);');
    path.setAttribute('onmouseover','wireClicked(this);');
    }else{
      path.setAttribute('onclick','wireClicked(this);');
      path.setAttribute('onmouseover','this.style.cursor = "default";');
    }
    path.style['stroke-linecap']="round";
    path.setAttribute("d", diagram1Paths[i].getAttribute("d"));
    diagram1.appendChild(path);
    path.style["stroke-width"]= 5;
}

function colorPickerChange(e){
  var highlightColor = document.getElementById("colorPicker").value;
}

function wireClicked(wire){
  nameSplit = wire.id.split("copy");
  wire2 = document.getElementById(nameSplit[0]);
  if(wire2.style["stroke-width"] == 1 || wire2.style["stroke-width"] == '1px'){
    wire2.style["stroke-width"]= highlightedWidth;
    wire2.style["stroke"]= document.getElementById("colorPicker").value;
    selectedPart = wire2.id;
  }else{
    wire2.style["stroke-width"]= originalLineSize;
    wire2.style["stroke"]= "rgb(0, 0, 0)";
  }

}

//Change DropDown when component is clicked on diagram.
function changeDropDown(e){
  newDropDownValue = e.split("_")[0];
  for(i=0; i<componentSelect.length; i++){
    if(newDropDownValue == componentSelect[i].value){
      componentSelect.value = newDropDownValue;
      componentChange();
    }
  }
}

function clearHighlights(){
  for(i=0; i<diagram1Paths.length; i++){
    part = diagram1Paths[i].id;
    part = part.split("copy")

    if(part.length === 1){
    diagram1Paths[i].style['stroke-linecap']="round";
    diagram1Paths[i].style.stroke = "#000000";
    diagram1Paths[i].style["stroke-width"]= originalLineSize;
    }
  }
}

clearHighlights();

var blackArray = []; var grayArray = []; var lightGrayArray = []; var darkGrayArray = []; var aquamarineArray = []; var blueArray = []; var purpleArray = []; var violetArray = []; var pinkArray = []; var yellowGreenArray = []; var yellowArray = []; var orangeArray = []; var redArray = [];
var brownArray = [];

function getColors(){
  blackArray = []; grayArray = []; lightGrayArray = []; darkGrayArray = []; aquamarineArray = []; blueArray = []; purpleArray = []; violetArray = []; pinkArray = []; yellowGreenArray = []; yellowArray = []; orangeArray = []; redArray = []; brownArray = [];
    for(i=0; i<diagram1PathsLength; i++){
      console.log(diagram1Paths[i].style["stroke-width"])
      if(diagram1Paths[i].style["stroke-width"] != originalLineSize) {
        switch(diagram1Paths[i].style.stroke) {
        case "rgb(0, 0, 0)":
          blackArray.push(diagram1Paths[i].id);
        break;
        case "rgb(169, 169, 169)":
          darkGrayArray.push(diagram1Paths[i].id);
            break;
        case "rgb(211, 211, 211)":
          lightGrayArray.push(diagram1Paths[i].id);
            break;
        case "rgb(127, 255, 212)":
          aquamarineArray.push(diagram1Paths[i].id);
            break;
        case "rgb(0, 0, 255)":
          blueArray.push(diagram1Paths[i].id);
            break;
        case "rgb(128, 0, 128)":
          purpleArray.push(diagram1Paths[i].id);
            break;
        case "rgb(238, 130, 238)":
          violetArray.push(diagram1Paths[i].id);
            break;
        case "rgb(255, 192, 203)":
          pinkArray.push(diagram1Paths[i].id);
            break;
        case "rgb(154, 205, 50)":
          yellowGreenArray.push(diagram1Paths[i].id);
            break;
        case "rgb(255, 255, 0)":
          yellowArray.push(diagram1Paths[i].id);
            break;
        case "rgb(255, 165, 0)":
          orangeArray.push(diagram1Paths[i].id);
            break;
        case "rgb(255, 0, 0)":
          redArray.push(diagram1Paths[i].id);
            break;
        case "rgb(165, 42, 42)":
          brownArray.push(diagram1Paths[i].id);
            break;
        }
      }
    }
    console.log("BlackArray = [" + blackArray + "];" + "\n" + "DarkGrayArray = [" + darkGrayArray + "];" + "\n" + "LightGrayArray = [" + lightGrayArray + "];" + "\n" + "AquamarineArray = [" + aquamarineArray + "];" + "\n" + "BlueArray = [" + blueArray + "];" + "\n" + "PurpleArray = [" + purpleArray + "];" + "\n" + "VioletArray = [" + violetArray + "];" + "\n" + "PinkArray = [" + pinkArray + "];" + "\n" + "YellowGreenArray = [" + yellowGreenArray + "];" + "\n" + "YellowArray = [" + yellowArray + "];" + "\n" + "OrangeArray = [" + orangeArray + "];" + "\n" + "RedArray = [" + redArray + "];" + "\n" + "BrownArray = [" + brownArray + "];");
}

blackArrayStandard = ['path6367','path106','path262','path6970','path1154','path7010','path7018','path7060','defrostControlWiper','tcBlade'];
blueArrayStandard = ['path6357','path7020','path7069','path7071'];
orangeArrayStandard = ['path1457'];

function checkAnswer(){
  getColors();
  var answerArray = [];
  for(a=0; a<blackArrayStandard.length; a++){
    if(blackArrayStandard.includes(blackArray[a]) == false || blackArray.length != blackArrayStandard.length){
      answerArray.push("false")
    }
  }

  for(i=0; i<blueArrayStandard.length; i++){
    if(blueArrayStandard.includes(blueArray[i]) == false || blueArray.length != blueArrayStandard.length){
      answerArray.push("false")
    }
  }

  for(i=0; i<orangeArrayStandard.length; i++){
    if(orangeArrayStandard.includes(orangeArray[i]) == false || orangeArray.length != orangeArrayStandard.length){
      answerArray.push("false")
    }
  }

  if(defrostControlWiperRotated === true){
    answerArray.push("false")
  }
  
  if(tcBladeRotated === false){
    answerArray.push("false")
  }

  if(answerArray.includes('false')){
    // console.log(answerArray)
    alert("Incorrect, please try again.")
  }else{
    alert("2078")
  }
}

//Switch Codesvar defrostControlWiperRotated=false;
var defrostControlWiperRotated=false;
timerSwitch.setAttribute('onclick','changedefrostControlWiper();');
timerSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changedefrostControlWiper(){
  console.log('fires')
	if(defrostControlWiperRotated === false){
		TweenMax.to(defrostControlWiper,1,{rotation:-65});
		TweenMax.to(defrostControlWipercopy,1,{rotation:-65});
		defrostControlWiperRotated=true;
	}else{
		TweenMax.to(defrostControlWiper,1,{rotation:0});
		TweenMax.to(defrostControlWipercopy,1,{rotation:0});
		defrostControlWiperRotated=false;
	}
}

var tcBladeRotated=false;
ccSwitch.setAttribute('onclick','changetcBlade();');
ccSwitch.setAttribute('onmouseover','this.style.cursor = "pointer";');
function changetcBlade(){
  console.log('fires')
	if(tcBladeRotated === false){
		TweenMax.to(tcBlade,1,{rotation:-27});
		TweenMax.to(tcBladecopy,1,{rotation:-27});
		tcBladeRotated=true;
	}else{
		TweenMax.to(tcBlade,1,{rotation:0});
		TweenMax.to(tcBladecopy,1,{rotation:0});
		tcBladeRotated=false;
	}
}

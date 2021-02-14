document.title = "Dishwasher - Timer Model"

var deviceType = "not mobile";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  deviceType="mobile"
}

xhr = new XMLHttpRequest();
xhr.open("GET","schematic.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");

var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);

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
      path.setAttribute('onmouseover','this.style.cursor = "default"; overPath(this);');
      path.setAttribute('onmouseout','notOverPath(this);');
    }
    path.style['stroke-linecap']="round";
    path.setAttribute("d", diagram1Paths[i].getAttribute("d"));
    diagram1.appendChild(path);
    path.style["stroke-width"]= 3; 
}

//Set Button Codes
var buttons = document.getElementById("partNameGroup").getElementsByTagName("rect");
var partNameGroupLength = buttons.length;
for(i=0; i<partNameGroupLength; i++){
  buttons[i].setAttribute('onmouseover','this.style.cursor = "pointer"');
  buttons[i].setAttribute('onclick','changeDropDown(this.id);'); 
}

function overPath(wire){
  wire.setAttribute("opacity", ".5"); 
}

function notOverPath(wire){
  wire.setAttribute("opacity", "0");
}

var highlightedWidth = 1.5;
function colorPickerChange(e){
  var highlightColor = document.getElementById("colorPicker").value;
}

function wireClicked(wire){
  nameSplit = wire.id.split("copy");
  wire2 = document.getElementById(nameSplit[0]);
  wire2.style["stroke-width"]= 1.25;
  wire2.style["stroke"]= document.getElementById("colorPicker").value;
  selectedPart = wire2.id;
}

var partsList = [];
var partNameGroupList = partNameGroup.getElementsByTagName("rect");

for(i=0; i<partNameGroupList.length; i++){
  partName = partNameGroupList[i].id.split("_");
  partsList.push(partName[0]);
}

partsList.sort();

for(i=0; i<partsList.length; i++){
  partName = partsList[i].split("_")
  var result = partName[0].replace( /([A-Z])/g, " $1" );
  var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  var option = document.createElement("option");
  option.value = partName[0];
  option.text = finalResult;
  componentSelect.add(option);
}

//Change DropDown when component is clicked on diagram.
function changeDropDown(e){
  newDropDownValue = e.split("_")[0];
  for(i=0; i<componentSelect.length; i++){
    if(newDropDownValue == componentSelect[i].value){
      componentSelect.value = newDropDownValue;
      componentChange()
    } 
  }
}

//Do when Dropdown is changed.
function componentChange(){
  //Edit Here/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  TweenMax.to([path1427,path1427copy], .5, {rotation:40, transformOrigin: "0% 100%", ease: Power0.easeNone});
  TweenMax.to([path1556,path1556copy], .5, {rotation:-40, transformOrigin: "100% 0%", ease: Power0.easeNone});
  TweenMax.to([path1993,path1993copy], .5, {rotation:-15, transformOrigin: "100% 0%", ease: Power0.easeNone});
  TweenMax.to([path1999,path1999copy], .5, {rotation:-10, transformOrigin: "100% 0%", ease: Power0.easeNone});
  TweenMax.to([path1991,path1991copy], .5, {rotation:0, transformOrigin: "100% 0%", ease: Power0.easeNone});
  TweenMax.to([path2109,path2109copy], .5, {rotation:0, transformOrigin: "100% 0%", ease: Power0.easeNone});
  TweenMax.to([path2111,path2111copy], .5, {rotation:0, transformOrigin: "100% 0%", ease: Power0.easeNone});
  TweenMax.to([path1986,path1986copy], .5, {rotation:0, transformOrigin: "0% 100%", ease: Power0.easeNone});
  TweenMax.to([path1445,path1445copy], .5, {rotation:0, transformOrigin: "100% 0%", ease: Power0.easeNone});
  TweenMax.to([path1496,path1496copy], .5, {rotation:0, transformOrigin: "100% 0%", ease: Power0.easeNone});
  
  highlightedWidth = 1.5;
  clearHighlights();
  blackArray = componentSelect.value + "BlackArray";
  darkGrayArray = componentSelect.value + "DarkGrayArray";
  lightGrayArray = componentSelect.value + "LightGrayArray";
  aquamarineArray = componentSelect.value + "AquamarineArray";
  blueArray = componentSelect.value + "BlueArray";
  purpleArray = componentSelect.value + "PurpleArray";
  violetArray = componentSelect.value + "VioletArray";
  pinkArray = componentSelect.value + "PinkArray";
  yellowGreenArray = componentSelect.value + "YellowGreenArray";
  yellowArray = componentSelect.value + "YellowArray";
  orangeArray = componentSelect.value + "OrangeArray";
  redArray = componentSelect.value + "RedArray";
  brownArray = componentSelect.value + "BrownArray";
  textArray = componentSelect.value + "Text";
  
  try {
    TweenMax.to(eval("obj =" + blackArray), .1, {stroke:"rgb(0, 0, 0)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + darkGrayArray), .1, {stroke:"rgb(169, 169, 169)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + lightGrayArray), .1, {stroke:"rgb(211, 211, 211)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + aquamarineArray), .1, {stroke:"rgb(127, 255, 212)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + blueArray), .1, {stroke:"rgb(0, 0, 255)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + violetArray), .1, {stroke:"rgb(238, 130, 238)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + pinkArray), .1, {stroke:"rgb(255, 192, 203)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + yellowGreenArray), .1, {stroke:"rgb(154, 205, 50)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + yellowArray), .1, {stroke:"rgb(255, 255, 0)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + orangeArray), .1, {stroke:"rgb(255, 165, 0)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + redArray), .1, {stroke:"rgb(255, 0, 0)", strokeWidth:highlightedWidth});
    TweenMax.to(eval("obj =" + brownArray), .1, {stroke:"rgb(165, 42, 42)", strokeWidth:highlightedWidth});
    partDataWindow.innerHTML = eval("obj =" + textArray);
  }catch(e){};
  switch(componentSelect.value) {
    //Edit Here/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    case "timerMotor":
    TweenMax.to([path1427,path1427copy], .5, {rotation:0, transformOrigin: "0% 100%", ease: Power0.easeNone});
    break;

    case "pump":
    TweenMax.to([path1427,path1427copy], .5, {rotation:0, transformOrigin: "0% 100%", ease: Power0.easeNone});
    TweenMax.to([path1556,path1556copy], .5, {rotation:0, transformOrigin: "100% 0%", ease: Power0.easeNone});
    break;

    case "drainSolenoid":
    TweenMax.to([path1993,path1993copy], .5, {rotation:-20, transformOrigin: "100% 0%", ease: Power0.easeNone});
    TweenMax.to([path1427,path1427copy], .5, {rotation:0, transformOrigin: "0% 100%", ease: Power0.easeNone});
    TweenMax.to([path1991,path1991copy], .5, {rotation:-43, transformOrigin: "100% 0%", ease: Power0.easeNone});
    break;

    case "waterValve":
    TweenMax.to([path1427,path1427copy], .5, {rotation:0, transformOrigin: "0% 100%", ease: Power0.easeNone});
    TweenMax.to([path1993,path1993copy], .5, {rotation:-43, transformOrigin: "100% 0%", ease: Power0.easeNone});
    break;

    case "heater":
    TweenMax.to([path1999,path1999copy], .5, {rotation:-10, transformOrigin: "100% 0%", ease: Power0.easeNone});
    TweenMax.to([path1427,path1427copy], .5, {rotation:0, transformOrigin: "0% 100%", ease: Power0.easeNone});
    break;

    case "csmOpen":
    TweenMax.to([path2109,path2109copy], .5, {rotation:35, transformOrigin: "100% 0%", ease: Power0.easeNone});
    TweenMax.to([path2111,path2111copy], .5, {rotation:35, transformOrigin: "100% 0%", ease: Power0.easeNone});
    break;
    
    case "csmClosed":
    TweenMax.to([path1999,path1999copy], .5, {rotation:-10, transformOrigin: "100% 0%", ease: Power0.easeNone});
    TweenMax.to([path1427,path1427copy], .5, {rotation:0, transformOrigin: "0% 100%", ease: Power0.easeNone});
    break;

    case "floodSwitchClosed":
    TweenMax.to([path1427,path1427copy], .5, {rotation:0, transformOrigin: "0% 100%", ease: Power0.easeNone});
    TweenMax.to([path1993,path1993copy], .5, {rotation:-43, transformOrigin: "100% 0%", ease: Power0.easeNone});
    break;

    case "floodSwitchOpen":
    TweenMax.to([path1427,path1427copy], .5, {rotation:0, transformOrigin: "0% 100%", ease: Power0.easeNone});
    TweenMax.to([path1993,path1993copy], .5, {rotation:-43, transformOrigin: "100% 0%", ease: Power0.easeNone});
    TweenMax.to([path1986,path1986copy], .5, {rotation:43, transformOrigin: "0% 100%", ease: Power0.easeNone});
    break;

    case "l1DoorSwitchOpen":
    TweenMax.to([path1445,path1445copy], .5, {rotation:-43, transformOrigin: "100% 0%", ease: Power0.easeNone});
    break;

    case "neutralDoorSwitchClosed":
    TweenMax.to([path1496,path1496copy], .5, {rotation:0, transformOrigin: "100% 0%", ease: Power0.easeNone});
    break;

    case "neutralDoorSwitchOpen":
    TweenMax.to([path1496,path1496copy], .5, {rotation:-40, transformOrigin: "100% 0%", ease: Power0.easeNone});
    break;
  }
}

componentChange()

function clearHighlights(){
  for(i=0; i<diagram1Paths.length; i++){
    part = diagram1Paths[i].id;
    part = part.split("copy")

    if(part.length === 1){
    diagram1Paths[i].style['stroke-linecap']="round";
    diagram1Paths[i].style.stroke = "#000000";
    diagram1Paths[i].style["stroke-width"]= .75; 
    } 
  }
}

clearHighlights();

var blackArray = [];
var grayArray = [];
var lightGrayArray = [];
var darkGrayArray = [];
var aquamarineArray = [];
var blueArray = [];
var purpleArray = [];
var violetArray = [];
var pinkArray = [];
var yellowGreenArray = [];
var yellowArray = [];
var orangeArray = [];
var redArray = [];
var brownArray = [];

function getColors(){
  blackArray = [];
  grayArray = [];
  lightGrayArray = [];
  darkGrayArray = [];
  aquamarineArray = [];
  blueArray = [];
  purpleArray = [];
  violetArray = [];
  pinkArray = [];
  yellowGreenArray = [];
  yellowArray = [];
  orangeArray = [];
  redArray = [];
  brownArray = [];
    for(i=0; i<diagram1PathsLength; i++){
      if(diagram1Paths[i].style["stroke-width"] != "0.75px") {
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
    console.log("var " + componentSelect.value + "BlackArray = [" + blackArray + "];" + "\n" + "var " + componentSelect.value + "DarkGrayArray = [" + darkGrayArray + "];" + "\n" + "var " + componentSelect.value + "LightGrayArray = [" + lightGrayArray + "];" + "\n" + "var " + componentSelect.value + "AquamarineArray = [" + aquamarineArray + "];" + "\n" + "var " + componentSelect.value + "BlueArray = [" + blueArray + "];" + "\n" + "var " + componentSelect.value + "PurpleArray = [" + purpleArray + "];" + "\n" + "var " + componentSelect.value + "VioletArray = [" + violetArray + "];" + "\n" + "var " + componentSelect.value + "PinkArray = [" + pinkArray + "];" + "\n" + "var " + componentSelect.value + "YellowGreenArray = [" + yellowGreenArray + "];" + "\n" + "var " + componentSelect.value + "YellowArray = [" + yellowArray + "];" + "\n" + "var " + componentSelect.value + "OrangeArray = [" + orangeArray + "];" + "\n" + "var " + componentSelect.value + "RedArray = [" + redArray + "];" + "\n" + "var " + componentSelect.value + "BrownArray = [" + brownArray + "];");
}


  


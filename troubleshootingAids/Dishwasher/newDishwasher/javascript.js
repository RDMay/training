gsap.registerPlugin(DrawSVGPlugin);

document.title = "Washer Dryer Combo"

var originalLineSize = 1;
var highlightedWidth = 3;

xhr = new XMLHttpRequest();
xhr.open("GET","schematic.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);

var deviceType = "not mobile";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  deviceType="mobile"
}

var diagram1Paths = document.getElementById("diagram1").getElementsByTagName("path");
var diagram1PathsLength = diagram1Paths.length;

for(i=0; i<diagram1PathsLength; i++){
  diagram1Paths[i].style['stroke-linecap']="round";
  diagram1Paths[i].style.stroke = "Black";
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke','blue');
  path.setAttribute('fill','none');
  path.setAttribute('opacity',1);
  path.setAttribute('id',diagram1Paths[i].id + 'copy');

  if(deviceType == "mobile"){
    path.setAttribute('onclick','wireClicked(this);');
    // path.setAttribute('ontouchstart','wireClicked(this);');
    path.setAttribute('ontouchend','wireClicked(this);');
    // path.setAttribute('onmouseover','wireClicked(this);');
    }else{
      path.setAttribute('onclick','wireClicked(this);');
      path.setAttribute('onmouseover','this.style.cursor = "default";');
    }
    path.style['stroke-linecap']="round";
    path.setAttribute("d", diagram1Paths[i].getAttribute("d"));
    diagram1.appendChild(path);
    path.style["stroke-width"]= 2;
    // TweenMax.set(path, {drawSVG:'0% 0%'}, {drawSVG: '0% 0%'})
    gsap.set(path, {drawSVG: "0% 0%"})
}

function colorPickerChange(e){
  var highlightColor = document.getElementById("colorPicker").value;
}

function wireClicked(wire){
  nameSplit = wire.id.split("copy");
  wire2 = document.getElementById(nameSplit[0]);
  if(wire2.style["stroke-width"] == originalLineSize || wire2.style["stroke-width"] == originalLineSize + 'px'){
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

var l1Array = []; var l2Array = []; var grayArray = []; var neutralArray = []; var darkGrayArray = []; var aquamarineArray = []; var dcMinusArray = []; var rpmFeedBackArray = []; var violetArray = []; var pinkArray = []; var yellowGreenArray = []; var speedControlArray = []; var energizedLoadArray = []; var dcPlusArray = []; var commArray = [];

function getColors(){
  l1Array = []; grayArray = []; neutralArray = []; darkGrayArray = []; aquamarineArray = []; dcMinusArray = []; rpmFeedBackArray = []; violetArray = []; pinkArray = []; yellowGreenArray = []; speedControlArray = []; energizedLoadArray = []; dcPlusArray = []; unkArray = [];
    for(i=0; i<diagram1PathsLength; i++){
      if(diagram1Paths[i].style["stroke-width"] != originalLineSize) {
        switch(diagram1Paths[i].style.stroke) {
        case "rgb(255, 0, 0)":
          l1Array.push(diagram1Paths[i].id);
        break;
        case "#ff0000":
          l1Array.push(diagram1Paths[i].id);
        break;
        case "rgb(72, 72, 72)":
          l2Array.push(diagram1Paths[i].id);
        break;
        case "#484848":
          l2Array.push(diagram1Paths[i].id);
        break;
        case "rgb(255, 165, 0)":
          neutralArray.push(diagram1Paths[i].id);
        break;
        case "#ffa500":
          neutralArray.push(diagram1Paths[i].id);
        break;
        case "rgb(249, 231, 159)":
          energizedLoadArray.push(diagram1Paths[i].id);
        break;
        case "#f9e79f":
          energizedLoadArray.push(diagram1Paths[i].id);
        break;
        case "rgb(255, 102, 102)":
          dcPlusArray.push(diagram1Paths[i].id);
        break;
        case "#ff6666":
          dcPlusArray.push(diagram1Paths[i].id);
        break;
        case "rgb(48, 48, 48)":
          dcMinusArray.push(diagram1Paths[i].id);
        break;
        case "#303030":
          dcMinusArray.push(diagram1Paths[i].id);
        break;
        case "rgb(65, 105, 225)":
          rpmFeedBackArray.push(diagram1Paths[i].id);
        break;
        case "#4169e1":
          rpmFeedBackArray.push(diagram1Paths[i].id);
        break;
        case "rgb(244, 208, 63)":
          speedControlArray.push(diagram1Paths[i].id);
        break;
        case "#f4d03f":
          speedControlArray.push(diagram1Paths[i].id);
        break;
        case "rgb(30, 144, 255)":
          commArray.push(diagram1Paths[i].id);
        break;
        case "#1e90ff":
          commArray.push(diagram1Paths[i].id);
        break;
        }
      }
    }
    console.log("l1ArrayKey = [" + l1Array + "];" + "\n" + "l2ArrayKey = [" + l2Array + "];" + "\n" + "neutralArrayKey = [" + neutralArray + "];" + "\n" + "energizedLoadArrayKey = ["  + energizedLoadArray + "];" + "\n" + "dcPlusArrayKey = [" + dcPlusArray + "];" + "\n" + "dcMinusArrayKey = [" + dcMinusArray + "];" + "\n" + "rpmFeedBackArrayKey = [" + rpmFeedBackArray + "];" + "\n" + "speedControlArrayKey = [" + speedControlArray + "];" + "\n"  + "commArrayKey = [" + commArray + "];" + "\n");
}

function closeMenu(){
  menuSpan.setAttribute('class', 'uiHiddenClass')
}

function openMenu(){
  menuSpan.setAttribute('class', 'uiClass')
}

function buttonClicked(){
  console.log(event.target.id)
}

Draggable.create(schematic, {
	onDragEnd:function() {
		console.log(
      // gsap.to(".class", {duration:2, x:100});
      'gsap.to(schematic, {duration:2, x:'  +
      + gsap.getProperty(schematic, 'x') + ', '
      + 'y:' + gsap.getProperty(schematic, 'y')  + ', '
      + 'scaleX:' + gsap.getProperty(schematic, 'scaleX') + ', '
      + 'scaleY:' + gsap.getProperty(schematic, 'scaleY') + ', '
      + 'ease:"power2"})'

	)}
});

window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    console.info(delta);
    switch(delta>0) {
  		case true:
  		if(gsap.getProperty(schematic, "scaleX")  > 1){
  			gsap.to(schematic, {duration:.25, scaleX: '-=.25', scaleY: '-=.25', ease:"power2"})
  		}
  		break;
  		case false:
  		gsap.to(schematic, {duration:.25, scaleX:'+=.25', scaleY:'+=.25', ease:"power2"})
      break;
      }
});

// doorLock_btn.addEventListener('click', doorLockClicked);
doorLock_btn.onclick = function(){
  // gsap.fromTo(path2260copy, {drawSVG:"100%"})
  gsap.fromTo("#path2260copy", {drawSVG:'100% 100%'}, {drawSVG: '0% 100%', duration: 3, ease:'none'},0)
}


var tl = gsap.timeline({});
tl
// .to(schematic, {duration:2, x:191, y:-7, scaleX:1.463, scaleY:1.463, ease:"power2"})

// .to("#path552copy", {duration: 1, x: 200})
// .to("#path552copy", {duration: 1, drawSVG: "0% 100%", delay:1})
// .to(schematic,1,{scaleX:'200%', scaleY:'200%', x:'10%', y:'10%', transformOrigin:"50 50"})
// gsap.to(schematic,1,{scaleX:2, scaleY:2, x:-300, y:-300, transformOrigin:"0 0", delay:2})
// .to(schematic,1,{autoAlpha:0, delay:1})
gsap.fromTo(path552copy, {drawSVG:"0%"}, {duration: 1, drawSVG:"0% 100%"})

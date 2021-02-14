var svg = document.getElementById("svg2");
var proxy = document.createElement("div");
var rotateThreshold = 4;
var point = svg.createSVGPoint();
var startClient = svg.createSVGPoint();
var startGlobal = svg.createSVGPoint();
var viewBox = svg.viewBox.baseVal;
var zoom = {
  animation: new TimelineLite(),
  scaleFactor: 1.2,
  duration: 0.1,
};
var pannable = new Draggable(proxy, {
  trigger: svg,
  onPress: selectDraggable,
  onDrag: updateViewBox,
});

window.addEventListener("wheel", onWheel);
function onWheel(event) {
  event.preventDefault();
  var normalized;  
  var delta = event.wheelDelta;
  if (delta) {
    normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
  } else {
    delta = event.deltaY || event.detail || 0;
    normalized = -(delta % 3 ? delta * 10 : delta / 3);
  }
  
  var scaleDelta = normalized > 0 ? 1 / zoom.scaleFactor : zoom.scaleFactor;
  
  point.x = event.clientX;
  point.y = event.clientY;
  
  var startPoint = point.matrixTransform(svg.getScreenCTM().inverse());
    
  var fromVars = {
    ease: zoom.ease,
    x: viewBox.x,
    y: viewBox.y,
    width: viewBox.width,
    height: viewBox.height,
  };
  
  viewBox.x -= (startPoint.x - viewBox.x) * (scaleDelta - 1);
  viewBox.y -= (startPoint.y - viewBox.y) * (scaleDelta - 1);
  viewBox.width *= scaleDelta;
  viewBox.height *= scaleDelta;
    
  zoom.animation = TweenLite.from(viewBox, zoom.duration, fromVars);
  console.log(fromVars)  
}
// TweenLite.from(viewBox, zoom.duration, fromVars);
//
// SELECT DRAGGABLE
// =========================================================================== 
function selectDraggable(event) {
  startClient.x = this.pointerX;
  startClient.y = this.pointerY;
  startGlobal = startClient.matrixTransform(svg.getScreenCTM().inverse());
    
    TweenLite.set(proxy, { 
      x: this.pointerX, 
      y: this.pointerY
    });
    
    
    pannable.enable().update().startDrag(event);
  
}


// UPDATE VIEWBOX
// =========================================================================== 
function updateViewBox() {
	point.x = this.x;
	point.y = this.y;
	var moveGlobal = point.matrixTransform(svg.getScreenCTM().inverse());
	viewBox.x -= (moveGlobal.x - startGlobal.x);
	viewBox.y -= (moveGlobal.y - startGlobal.y); 
}
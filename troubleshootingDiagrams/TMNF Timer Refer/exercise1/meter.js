xhr = new XMLHttpRequest();
xhr.open("GET","SVG Meter.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");

var meter = document.getElementById("uiDiv").appendChild(xhr.responseXML.documentElement);
console.log(uiDiv.offsetWidth)
// meter.setAttribute("width", 500);

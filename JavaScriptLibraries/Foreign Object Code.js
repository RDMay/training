var foreignObject1 = document.createElementNS( ns, 'foreignObject');
foreignObject1.setAttribute('height', 100);
foreignObject1.setAttribute('width', "100%");
foreignObject1.setAttribute('class', "heading1");
var div1 = document.createElement('div');
foreignObject1.setAttribute("id", "headingText");
div1.innerHTML = 'Basic Electricity';
foreignObject1.appendChild(div1); 
svg.appendChild(foreignObject1);
var div1Drag=Draggable.create(foreignObject1, {zIndexBoost:false, type:"x,y", edgeResistance:0.65});
div1.onmousedown = function(){myDraggable[0].disable(); setUpChechArrays(foreignObject1);};
div1.onmouseup = function(){myDraggable[0].enable()};
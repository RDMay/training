// Back a line up.
.fromTo(gnd1, 1, {drawSVG:"0% 100%"}, {drawSVG:"100% 10%"})

//Morph shape to another shape.
.to(path8300, 1, {morphSVG:"#batterySymbol_hide"})

//Meter knob to amps
.to(meterKnob, 2, {rotation:180, transformOrigin:"29.5 29.5"})
// slide = new XMLHttpRequest();
// slide.open("GET","slide.svg",false);
// slide.overrideMimeType("image/svg+xml");
// slide.send("");
// var slide= document.getElementById("main").appendChild(slide.responseXML.documentElement);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var svgWindow = document.getElementById("main");
// var svg = d3.select(svgContent);
// function redraw(){
// 	var width = svgWindow.clientWidth;
// 	var height = svgWindow.clientHeight;
// 	svg
// 		.attr("width", width)
// 		.attr("height", height);
// 		console.log(width)
	
// }
// redraw();
// window.addEventListener("resize", redraw);
var slideTl = new TimelineMax({onUpdate:updateSlider, paused:true});



//Audio
//Player Controls
var audioKnob=Draggable.create(sliderKnob, {
	type: "x",
	bounds: sliderClickZone,
	onClick: function(){
		slideAudio.pause();
		slideTl.pause();
	},
	onDrag: function() {
		slideAudio.pause();
		slideTl.pause();
		slideTl.progress((sliderKnob._gsTransform.x/sliderLine.getBBox().width));
		TweenMax.to(pauseIcon, 0, {autoAlpha:1})
		TweenMax.to(playIcon, 0, {autoAlpha:0})
    	},
	onDragEnd: function() {
		slideAudio.currentTime = slideTl.time();
		slideTl.play();
		slideAudio.play();
		TweenMax.to(pauseIcon, 0, {autoAlpha:1});
		TweenMax.to(playIcon, 0, {autoAlpha:0})
		isPlaying = true;
  	}

});

function updateSlider(){
	sliderPos = sliderLine.getBBox().width*slideTl.progress();
	console.log(slideTl.progress())
	TweenMax.to(sliderKnob, 0, {x:sliderPos})
}

sliderClickZone.onclick = function(e){
	var offSet = sliderLine.getBoundingClientRect().x;
	var newx = e.clientX - offSet;
	TweenMax.to(sliderKnob, 0, {x:newx})
	slideTl.progress(sliderKnob._gsTransform.x/sliderClickZone.getBBox().width);
	slideAudio.currentTime = slideTl.time();
	slideAudio.play();
	slideTl.play();
}

TweenMax.to(pauseIcon, 0, {autoAlpha:0})
isPlaying = false;
function pausePlayHandler(){
	if(isPlaying == false){
		slideTl.play();
		slideAudio.play();
		TweenMax.to(pauseIcon, 0, {autoAlpha:1})
		TweenMax.to(playIcon, 0, {autoAlpha:0})
		isPlaying = true;
	}else{
		slideTl.pause();
		slideAudio.pause();
		TweenMax.to(pauseIcon, 0, {autoAlpha:0})
		TweenMax.to(playIcon, 0, {autoAlpha:1})
		isPlaying = false;
	}
	
}
//End Player Controls

TweenMax.to([openingText1_hide,openingText2_hide,openingText3_hide,openingText4_hide,openingTextH1_hide,firstTextBorder_hide], 0, {autoAlpha:0})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Main Timeline

slideTl
.to(headingText,1,{autoAlpha:0, delay:1})
.to(openingTextH1_hide, 1, {autoAlpha:1, delay:4})
.to(openingText1_hide, 1, {autoAlpha:1, delay:4})
.to(openingText2_hide, 1, {autoAlpha:1, delay:4})
.to(openingText3_hide, 1, {autoAlpha:1, delay:4})
.to(openingText4_hide, 1, {autoAlpha:1, delay:4})
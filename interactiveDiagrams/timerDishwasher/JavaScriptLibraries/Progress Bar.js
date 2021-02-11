
sliderContainer.innerHTML = '<button id="btn1" class="btn" onclick = pause()>PLAY</button>&nbsp;&nbsp;&nbsp;&nbsp;<input id="progressSlider" class="slider" type="range" min="0" max="1" value="0" step="0.001"/>'

progressSlider.value = "0";
progressSlider.addEventListener("input", update);
function update(){
  mainTl.progress(progressSlider.value).pause();
  // currentTl.pause();
  btn1.innerHTML="PLAY"
}
function adjustUI() {
	if(mainTl.isActive() == false){
		btn1.innerHTML="PLAY"
	}
  progressSlider.value = mainTl.progress();
}



function pause(){
	if(btn1.innerHTML === "PLAY"){
		mainTl.play();
		btn1.innerHTML="PAUSE"
	}else{
		mainTl.pause();
		btn1.innerHTML="PLAY"
	}
}
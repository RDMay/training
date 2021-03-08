document.title = "Newfi Simulator"

xhr = new XMLHttpRequest();
xhr.open("GET","schematic.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);

var historyData;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    historyData = JSON.parse(this.responseText);
    // console.log(historyData[0]["Time Ago (Days - Hours)"])
    // ff1ThermistorText.textContent = historyData[0]["FF Min Temp"] + " °F";
    // ffEvapThermistorText.textContent = historyData[0]["FF Evap Min Temp"] + " °F";
    // fzThermistorText.textContent = historyData[0]["FZ Evap Min Temp"] + " °F";
    // fzEvapThermistorText.textContent = historyData[0]["FZ Evap Min Temp"] + " °F";
  }
};
xmlhttp.open("GET", "csvjson.json", true);
xmlhttp.send();

var realTimeData;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    realTimeData = JSON.parse(this.responseText);
    // console.log(realTimeData[89]["SerialStringValue"])
    // console.log(realTimeData.length)
    for(i=0; i<realTimeData.length; i++){
      // console.log(realTimeData[i]["SerialName"])
      switch(realTimeData[i]["SerialName"]) {
        case "0x2200.FF1_THERM_INSTANT":
        ff1ThermistorText.textContent = realTimeData[i]["SerialNumberValue"] + " °F";
        break;
        case "0x2202.FFEVAP_THERM_INSTANT":
        ffEvapThermistorText.textContent = realTimeData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x2203.FZ_THERM_INSTANT":
        fzThermistorText.textContent = realTimeData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x2204.FZEVAP_THERM_INSTANT":
        fzEvapThermistorText.textContent = realTimeData[i]["SerialNumberValue"] + " °F";
        break;
        case"3x36.ALL_DOORBOARD_INFO_ICE_CAB_THERMISTOR":
        iceBoxThermistorText.textContent = realTimeData[i]["SerialNumberValue"] + " °F";
        break;
        case"3x3609.ALL_DOORBOARD_INFO_ICEMAKER_MOLD_HEATER":
        imDrMoldBodyThermistor.textContent = realTimeData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x35.ALL_THERMISTOR_DELI_PAN":
        deliPanThermistor.textContent = realTimeData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x2206.HUMIDITY_THERM_INSTANT":
        ambientHumidity.textContent = realTimeData[i]["SerialNumberValue"] + " %";
        break;
        case"0x2205.AMBTEMP_THERM_INSTANT":
        ambientTempThermistor.textContent = realTimeData[i]["SerialNumberValue"] + " °F";
        break;
      }
    }

  }
};
xmlhttp.open("GET", "currentData.json", true);
xmlhttp.send();

var mainButtonsArray = ['notifications_btn', 'faultCodes_btn', 'cycleHistory_btn', 'infoSettings_btn', 'loadStatus_btn', 'operateLoads_btn', 'diagnosticTests_btn', 'applianceLiterature_btn'];

function buttonClicked(target){
  for(a=0; a<mainButtonsArray.length; a++){
    var offState = document.getElementById(mainButtonsArray[a]);
    for(i=0; i<offState.childNodes.length; i++){
      var selectedButton = offState.childNodes[i].id;
      var selectedButtonMember = selectedButton.split("_");
      selectedButtonMember = selectedButtonMember[1];
      if(selectedButtonMember == 'bg'){
        offState.childNodes[i].style.fill = 'white';
      }
      if(selectedButtonMember == 'txt'){
        offState.childNodes[i].style.fill = '#4d4d4d';
      }
      if(selectedButtonMember == 'icon'){
        offState.childNodes[i].style.stroke = '#4d4d4d';
      }
    }


  }
  var button = event.target;
  button = document.getElementById(target);
  for(i=0; i<button.childNodes.length; i++){
    var selectedButton = button.childNodes[i].id;
    var selectedButtonMember = selectedButton.split("_");
    selectedButtonMember = selectedButtonMember[1];
    if(selectedButtonMember == 'bg'){
      button.childNodes[i].style.fill = '#3e9ce4ff';
    }
    if(selectedButtonMember == 'txt'){
      button.childNodes[i].style.fill = 'white';
    }
    if(selectedButtonMember == 'icon'){
      button.childNodes[i].style.stroke = 'white';
    }
  }
}

// gsap.to(notificationBackground, {duration:1, fill:'#3e9ce4ff'})
// gsap.to(notificationsText, {duration:1, fill:'white'})
// console.log(robert.style.fill)
// robert.style.fill = 'rgb(0, 255, 0)';
// console.log(robert.style.fill)
// console.log(document.getElementById('rect3653').getBBox())
//
// var div = document.createElement('div');
// div.innerHTML = "my <b>new</b> skill - <large>DOM maniuplation!</large>";
// // set style
// div.style.color = 'red';
// // better to use CSS though - just set class
// div.setAttribute('class', 'myclass'); // and make sure myclass has some styles in css
// document.body.appendChild(div);




// g3656.add

// let newElement = document.createElement('rect');
// newElement.setAttribute('fill','orange');
// newElement.setAttribute('width','200');
// newElement.setAttribute('height','200');
// g3656.appendChild(newElement);

document.title = "Newfi Simulator"

xhr = new XMLHttpRequest();
xhr.open("GET","newfi.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var newfi = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);
var buttonGroup = layer1.getElementsByTagName('g');
for(i=0; i<buttonGroup.length; i++){
  buttonGroup[i].addEventListener('mouseover', function (){overButton(this)});
  buttonGroup[i].addEventListener('mouseout', function (){leaveButton(this)});
}
gsap.set([cloudDiagnostics_btn, softwareUpdate_btn, newfiAlerts_btn], {autoAlpha:0});

function overButton(e){
  for(i=0; i<e.childNodes.length; i++){
    var target = e.childNodes[i].id;
    var targetMember = target.split("_");
    targetMember = targetMember[1];
    if(targetMember == 'bg'){
      e.childNodes[i].style.fill = '#3588c7';
    }
  }
}
function leaveButton(e){
  for(i=0; i<e.childNodes.length; i++){
    var target = e.childNodes[i].id;
    var targetMember = target.split("_");
    targetMember = targetMember[1];
    if(targetMember == 'bg' && e.id != selectedMainButton){
      e.childNodes[i].style.fill = '#fff';
    }
  }
}
//History Data
var historyData;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    historyData = JSON.parse(this.responseText);
    // ff1ThermistorText.textContent = historyData[0]["FF Min Temp"] + " °F";
    // ffEvapThermistorText.textContent = historyData[0]["FF Evap Min Temp"] + " °F";
    // fzThermistorText.textContent = historyData[0]["FZ Evap Min Temp"] + " °F";
    // fzEvapThermistorText.textContent = historyData[0]["FZ Evap Min Temp"] + " °F";
  }
};
xmlhttp.open("GET", "history.json", true);
xmlhttp.send();

//Real Time Data
var realTimeData;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    realTimeData = JSON.parse(this.responseText);
    for(i=0; i<realTimeData.length; i++){
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

//FCode Data
//History Data
var fCodeData = [];
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    fCodeData = JSON.parse(this.responseText);
  }
};
xmlhttp.open("GET", "fCodes.json", true);
xmlhttp.send();

var mainButtonsArray = ['notifications_btn', 'faultCodes_btn', 'cycleHistory_btn', 'infoSettings_btn', 'loadStatus_btn', 'operateLoads_btn', 'diagnosticTests_btn', 'applianceLiterature_btn'];

var selectedMainButton = '';
function buttonClicked(target){
  console.log(target)
  selectedMainButton = target;
  for(a=0; a<mainButtonsArray.length; a++){
    var buttons = document.getElementById(mainButtonsArray[a]);
    for(i=0; i<buttons.childNodes.length; i++){
      var currentButton = buttons.childNodes[i].id;
      var currentButtonMember = currentButton.split("_");
      currentButtonMember = currentButtonMember[1];
      if(currentButtonMember == 'bg'){
        buttons.childNodes[i].style.fill = 'white';
      }
      if(currentButtonMember == 'txt'){
        buttons.childNodes[i].style.fill = '#4d4d4d';
      }
      if(currentButtonMember == 'icon'){
        buttons.childNodes[i].style.stroke = '#4d4d4d';
      }
    }

  }
  var button = event.target;
  button = document.getElementById(target);
  for(i=0; i<button.childNodes.length; i++){
    var currentButton = button.childNodes[i].id;
    var currentButtonMember = currentButton.split("_");
    currentButtonMember = currentButtonMember[1];
    if(currentButtonMember == 'bg'){
      button.childNodes[i].style.fill = '#3e9ce4';
    }
    if(currentButtonMember == 'txt'){
      button.childNodes[i].style.fill = 'white';
    }
    if(currentButtonMember == 'icon'){
      button.childNodes[i].style.stroke = 'white';
    }
  }
  gsap.set([htmlWindow1, htmlWindow2], {autoAlpha:0});
  gsap.set([cloudDiagnostics_btn, softwareUpdate_btn, newfiAlerts_btn], {autoAlpha:0});
  switch(target) {
  case 'notifications_btn':
    gsap.set([cloudDiagnostics_btn, softwareUpdate_btn, newfiAlerts_btn], {autoAlpha:1});
    gsap.to(htmlWindow2, {autoAlpha:1});
    htmlWindow2.innerHTML = "<div class='alert'>Alerts</div>"
    break;
  case 'faultCodes_btn':
    gsap.set([cloudDiagnostics_btn, softwareUpdate_btn, newfiAlerts_btn], {autoAlpha:0});
    gsap.to(htmlWindow1, {autoAlpha:1});
    htmlWindow1.innerHTML = "";
    for(i=0; i<fCodeData.length; i++){
      var div = document.createElement('div');
      htmlWindow1.innerHTML +=
      "<div style='border-bottom: solid; border-width: thin; position:relative'>"
        +"<div>"
          +"<p><strong>"+ fCodeData[i]['DaysAgo'] + "</strong></p>"
          +"<p>Days Ago</p>"
        +"</div>"
        +"<div>"
          +"<p><strong>"+ fCodeData[i]['IsActive'] + "</strong></p>"
          +"<p>State</p>"
        +"</div>"
        +"<div>"
          +"<p><strong>"+ fCodeData[i]['Count'] + "</strong></p>"
          +"<p>Count</p>"
        +"</div>"
        +"<div>"
          +"<p><strong>"+ fCodeData[i]['CycleCount'] + "</strong></p>"
          +"<p>Cycle Number</p>"
        +"</div>"
        +"<span style='font-size:3vw; color:black; margin-left:50px; font-weight: 900px; position:absolute; top:0%; left:8%;'><strong>" + "F-"+ fCodeData[i]['Value'] + "</strong></span>"
        +"<span style='font-size:1vw; color:black; margin-left:50px; font-weight: 900px; position:absolute; top:50%; left:10%;'><strong>" + "F-"+ fCodeData[i]['Value'] + "</strong></span>"
      + "</div>";
      div.style.color = 'red';
      div.setAttribute('class', 'myclass');
      document.body.appendChild(div);
    }
    break;
    case 'cycleHistory_btn':
    gsap.set([cloudDiagnostics_btn, softwareUpdate_btn, newfiAlerts_btn], {autoAlpha:0});
    gsap.to(htmlWindow1, {autoAlpha:1});
    htmlWindow1.innerHTML = "";
    htmlWindow1.innerHTML = "<div id='cycleHistoryBanner'>Cycle History Data (Cycle = Compressor Off-Off</div>"
    for(i=0; i<fCodeData.length; i++){
      var div = document.createElement('div');
      htmlWindow1.innerHTML +=
      "<div style='border-bottom: solid; border-width: thin; position:fixed'>"
        +"<div>"
          +"<p><strong>"+ historyData[i]['Time Ago (Days - Hours)'] + "</strong></p>"
          +"<p>Days Ago</p>"
        +"</div>"

      + "</div>";
      div.style.color = 'red';
      div.setAttribute('class', 'myclass');
      document.body.appendChild(div);
      break;
    }
}
}



// htmlWindow1.style.left = rect2161.getBoundingClientRect().x +'px';
// htmlWindow.style.top = rect2161.getBoundingClientRect().y + 'px';

htmlWindow1.style.left = notifications_btn.getBoundingClientRect().right +'px';
htmlWindow1.style.top = notifications_btn.getBoundingClientRect().top + 'px';
htmlWindow1.style.width = rect2161.getBoundingClientRect().right - rect2161.getBoundingClientRect().x -30  + 'px';
htmlWindow2.style.left = newfiAlerts_btn.getBoundingClientRect().right +'px';
htmlWindow2.style.top = newfiAlerts_btn.getBoundingClientRect().top + 'px';
htmlWindow2.style.width = rect2161.getBoundingClientRect().right - newfiAlerts_btn.getBoundingClientRect().right  + 'px';

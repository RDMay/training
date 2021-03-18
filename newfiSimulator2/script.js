document.title = "Newfi Simulator"

//FCode Data
var jsonData = [];
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    jsonData = JSON.parse(this.responseText);
    for(i=0; i<jsonData.length; i++){
      switch(jsonData[i]["SerialName"]) {
        case "0x2200.FF1_THERM_INSTANT":
        ff1Text.textContent = jsonData[i]["SerialNumberValue"] + " °F";
        break;
        case "0x2202.FFEVAP_THERM_INSTANT":
        ffEvapText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x2203.FZ_THERM_INSTANT":
        fzEvapText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x2204.FZEVAP_THERM_INSTANT":
        fzEvapText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
        break;
        case"3x36.ALL_DOORBOARD_INFO_ICE_CAB_THERMISTOR":
        iceboxText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
        break;
        case"3x3609.ALL_DOORBOARD_INFO_ICEMAKER_MOLD_HEATER":
        imDrMoldBodyText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x35.ALL_THERMISTOR_DELI_PAN":
        deliPanText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x2206.HUMIDITY_THERM_INSTANT":
        ambientHumidityText.textContent = jsonData[i]["SerialNumberValue"] + " %";
        break;
        case"0x2205.AMBTEMP_THERM_INSTANT":
        ambientTempText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x3113.STATE_SYSTEM_SABBATH_MODE":
        sabbathText.textContent = jsonData[i]["SerialStringValue"];
        break;
        case"0x3109.STATE_SYSTEM_OPERATING_MODE":
        systemText.textContent = jsonData[i]["SerialStringValue"];
        break;
      }
    }
  }
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();


xmlhttp.open("GET", "currentData.json", true);
xmlhttp.send();
var mainButtons = document.getElementById('mainButtons').childNodes;

function mainMenuClicked(){
  notifications_btn.style.background = 'white'
  notifications_btn.style.color = '#4d4d4d';
  bellIcon.src = 'bellIcon.svg'
  faultCodes_btn.style.background = 'white'
  faultCodes_btn.style.color = '#4d4d4d';
  faultCodesIcon.src = 'faultCodesIcon.svg'
  cycleHistory_btn.style.background = 'white'
  cycleHistory_btn.style.color = '#4d4d4d';
  cycleHistoryIcon.src = 'cycleHistoryIcon.svg'
  infoAndSettings_btn.style.background = 'white'
  infoAndSettings_btn.style.color = '#4d4d4d';
  infoAndSettingsIcon.src = 'cycleHistoryIcon.svg'
  loadStatus_btn.style.background = 'white';
  loadStatus_btn.style.color = '#4d4d4d';
  loadStatusIcon.src = 'loadStatusIcon.svg';
  operateLoads_btn.style.background = 'white';
  operateLoads_btn.style.color = '#4d4d4d';
  operateLoadsIcon.src = 'operateLoadsIcon.svg';
  diagnosticTests_btn.style.background = 'white';
  diagnosticTests_btn.style.color = '#4d4d4d';
  diagnosticTestsIcon.src = 'diagnosticTestsIcon.svg';
  applianceLiterature_btn.style.background = 'white';
  applianceLiterature_btn.style.color = '#4d4d4d';
  applianceLiteratureIcon.src = 'applianceLiteratureIcon.svg';
  notifications.style.display = 'none';
  infoAndSettings.style.display = 'none';
  loadStatus.style.display = 'none';
  operateLoads.style.display = 'none';
  diagnosticTests.style.display = 'none';
  applianceLiterature.style.display = 'none';
  switch(event.target.id) {
  case 'notifications_btn':
    notifications.style.display = 'inline';
    notifications_btn.style.background = '#2d73a7';
    notifications_btn.style.color = 'white';
    bellIcon.src = 'bellIconWhite.svg'
    break;
  case 'faultCodes_btn':
  faultCodes_btn.style.background = '#2d73a7';
  faultCodes_btn.style.color = 'white';
  faultCodesIcon.src = 'faultCodesIconWhite.svg'
    break;
  case 'cycleHistory_btn':
  cycleHistory_btn.style.background = '#2d73a7';
  cycleHistory_btn.style.color = 'white';
  cycleHistoryIcon.src = 'cycleHistoryIconWhite.svg'
    break;
  case 'infoAndSettings_btn':
    infoAndSettings.style.display = 'inline';
    infoAndSettings_btn.style.background = '#2d73a7';
    infoAndSettings_btn.style.color = 'white';
    infoAndSettingsIcon.src = 'infoAndSettingsIconWhite.svg'
    break;
  case 'loadStatus_btn':
    loadStatus.style.display = 'inline';
    loadStatus_btn.style.background = '#2d73a7';
    loadStatus_btn.style.color = 'white';
    loadStatusIcon.src = 'loadStatusIconWhite.svg'
    break;
  case 'operateLoads_btn':
    operateLoads.style.display = 'inline';
    operateLoads_btn.style.background = '#2d73a7';
    operateLoads_btn.style.color = 'white';
    operateLoadsIcon.src = 'operateLoadsIconWhite.svg'
    break;
  case 'diagnosticTests_btn':
    diagnosticTests.style.display = 'inline';
    diagnosticTests_btn.style.background = '#2d73a7';
    diagnosticTests_btn.style.color = 'white';
    diagnosticTestsIcon.src = 'diagnosticTestsIconWhite.svg'
    break;
  case 'applianceLiterature_btn':
    applianceLiterature.style.display = 'inline';
    applianceLiterature.style.display = 'inline';
    applianceLiterature_btn.style.background = '#2d73a7';
    applianceLiterature_btn.style.color = 'white';
    applianceLiteratureIcon.src = 'applianceLiteratureIconWhite.svg'
    break;

}
}

var notificationsButtonList = [newfiAlerts_btn, softwareUpdates_btn, cloudDiagnostics_btn];
function notificationsClicked(){
  for(i=0; i<notificationsButtonList.length; i++){
    notificationsButtonList[i].style.color = '#4d4d4d';
    notificationsButtonList[i].style.background = 'white';
  }
  switch(event.target.id) {
  case 'newfiAlerts_btn':
    newfiAlerts_btn.style.background = '#2d73a7';
    newfiAlerts_btn.style.color = 'white';
    break;
  case 'softwareUpdates_btn':
    softwareUpdates_btn.style.background = '#2d73a7';
    softwareUpdates_btn.style.color = 'white';
    break;
  }
}









var mainButtonsArray = ['notifications_btn', 'faultCodes_btn', 'cycleHistory_btn', 'infoSettings_btn', 'loadStatus_btn', 'operateLoads_btn', 'diagnosticTests_btn', 'applianceLiterature_btn'];

function buttonClicked(target){
  for(a=0; a<mainButtonsArray.length; a++){

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


document.getElementById('infoAndSettings').style.display = 'none';
document.getElementById('loadStatus').style.display = 'none';
document.getElementById('operateLoads').style.display = 'none';
document.getElementById('diagnosticTests').style.display = 'none';
document.getElementById('applianceLiterature').style.display = 'none';

notifications_btn.style.background = '#2d73a7';
notifications_btn.style.color = 'white';
bellIcon.src = 'bellIconWhite.svg'

// newfiAlerts_btn.style.background = '#2d73a7';
// newfiAlerts_btn.style.color = 'white';
// newfi.src = 'newfiWhite.svg'

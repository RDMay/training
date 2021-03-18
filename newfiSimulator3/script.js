document.title = "Newfi Simulator"
selectedNotificationButton = 'newfiAlerts_btn';
var fCodesCount = 0;
stop = false;

//FCode Data
var jsonData = [];
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    jsonData = JSON.parse(this.responseText);
    fCodeArray = [];
    for(i=0; i<jsonData.length; i++){
      if(jsonData[i]["SerialName"] == '0x2200.FF1_THERM_INSTANT'){
        ff1Text.textContent = jsonData[i]["SerialNumberValue"] + " °F";
      }
      if(jsonData[i]["SerialName"] == '0x2203.FZ_THERM_INSTANT'){
        fzText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
      }
      if(jsonData[i]["SerialName"] == '3x2201.DR_IMCAB_THERM_INSTANT'){
        iceboxText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
      }
      if(jsonData[i]["SerialName"] == '0x35.ALL_THERMISTOR_DELI_PAN'){
        deliPanText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
      }
      if(jsonData[i]["SerialName"] == '0xE000.CYCLE_AMBIENT_HUMIDITY_START'){
        ambientHumidityText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
      }
      if(jsonData[i]["SerialName"] == '0x2202.FFEVAP_THERM_INSTANT'){
        ffEvapText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
      }
      if(jsonData[i]["SerialName"] == '0x2204.FZEVAP_THERM_INSTANT'){
        fzEvapText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
      }
      if(jsonData[i]["SerialName"] == '3x3609.ALL_DOORBOARD_INFO_ICEMAKER_MOLD_HEATER'){
        imDrMoldBodyText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
      }
      if(jsonData[i]["SerialName"] == '0x2205.AMBTEMP_THERM_INSTANT'){
        ambientTempText.textContent = jsonData[i]["SerialNumberValue"] + " °F";
      }
      if(jsonData[i]["SerialName"] == 'ERDx1002.COMMAND_FEATURE_SABBATH_MODE'){
        if(jsonData[i]["SerialStringValue"] == 'disabled'){
          sabbathText.textContent = 'Off';
        }
        else{
          sabbathText.textContent = 'On';
        }
      }
      if(jsonData[i]["SerialName"] == '0x3109.STATE_SYSTEM_OPERATING_MODE'){
        systemText.textContent = jsonData[i]["SerialStringValue"];
      }
      if(jsonData[i]["Alert Name"] && jsonData[i]['Alert Fired'] == 'TRUE'){
        newfiAlertsHTML = "<div id='windowHeader' class='windowHeader'>Alert</div>"
        +"<br><div class='subHeader1'>" + jsonData[i]["Alert Name"] + "</div>";
      }
      if(jsonData[i].Key == "UpdateEligible" && jsonData[i].Value == true){
        softWareUpdatesHTML = "<div id='windowHeader' class='windowHeader'>Software update is available for this appliance</div>";
      }
      //Cloud Diagnostics
      cloudDiagnosticsHTML = "<div id='windowHeader' class='windowHeader'>Cloud Diagnostics</div>";

      if(jsonData[i].FcodeIgnored == 'True'){
        if(fCodesCount == 0){
          faultCodesHTML = "<div id='windowHeader' class='windowHeader' style='position:fixed; background-color:#cdcdcd; background: linear-gradient(94deg, #cdcdcd, #cdcdcd 100%);'>"
          +"<button>Clear All Codes</button>"
          +"<span style='position:absolute; margin-left:100px; padding:5px; width:600px; height:60%; background-color:#9d9d9d; border-radius:10px;'>All F-codes: <span id='fCodeSummary'></span></span>"
          +"<img src='refreshIconBackground.svg' style='position:fixed; right:10px; width:4.5%;'>"
          +"</div>"
        }
        fCodesCount++;
        faultCodesHTML +=
        "<div class='fCodes'>"
              +"<p class='fCodes1' style='font-size:1.5em;'>"+ jsonData[i]['DaysAgo']
              +"<p class='fCodes1'>Days Ago</p>"
              if(jsonData[i]['IsActive' == 'FALSE']){
                isactive = 'Active'
              }else{
                isactive = 'Inactive'
              }
        faultCodesHTML +=
              "<p class='fCodes1' style='color:red; font-size:1.5em;'>" + isactive + "</p>"
              +"<p class='fCodes1'>State<br><br></p>"
              +"<p class='fCodes1' style='font-size:1.5em;'>" + jsonData[i]['Count'] + "</p>"
              +"<p class='fCodes1'>Count<br><br></p>"
              +"<p class='fCodes1' style='font-size:1.5em;'>" + jsonData[i]['CycleCount'] + "</p>"
              +"<p class='fCodes1'>Cycle Number</p>"
              +"<p class='fCodes2' style='font-size:2.8em; font-weight:700'>F" + jsonData[i]['Value'] + "</p>"
        +"</div>"
        fCodeArray.push('F' + jsonData[i]['Value']);
      }


      item = Object.keys(jsonData[i])
      name = Object.keys(jsonData[i])[0];
      var keyNames = Object.keys(name);
        if(name == 'Time Ago (Days - Hours)' && stop == false){
          var historyData = [];
          cycleHistoryHTML =
          "<div id='windowHeader' class='windowHeader'>Cycle History Data (Cycle = Compressor Off-Off)</div>"
          var title = Object.keys(jsonData[i]);
          var value = Object.keys(jsonData[i]).map(function (key) { return jsonData[i][key];});
          cycleHistoryHTML += "<div class='historyData'>"
          for(t=0; t<title.length; t++){
            cycleHistoryHTML += "<span class='historyDataHeader'>" + title[t] + "</span>"
          }
          cycleHistoryHTML += "</div>"
          stop = true;
        }

        if(name == 'Time Ago (Days - Hours)'){;
          cycleHistoryHTML += "<div class='historyData'>"
          for(t=0; t<title.length; t++){
            cycleHistoryHTML += "<span class='historyDataRow'>" + value[t] + "</span>"
          }
          cycleHistoryHTML += "</div>"
        }
    }
  }
}

xmlhttp.open("GET", "data.json", true);
xmlhttp.send();

function mainMenuClicked(target){
  notifications_btn.style.background = 'white'
  notificationsIcon.src = 'notificationsIcon.svg'
  faultCodes_btn.style.background = 'white'
  faultCodesIcon.src = 'faultCodesIcon.svg'
  cycleHistory_btn.style.background = 'white'
  cycleHistoryIcon.src = 'cycleHistoryIcon.svg'
  infoAndSettings_btn.style.background = 'white'
  infoAndSettingsIcon.src = 'infoAndSettingsIcon.svg'
  loadStatus_btn.style.background = 'white'
  loadStatusIcon.src = 'loadStatusIcon.svg'
  operateLoads_btn.style.background = 'white'
  operateLoadsIcon.src = 'operateLoadsIcon.svg'
  diagnosticTests_btn.style.background = 'white'
  diagnosticTestsIcon.src = 'diagnosticTestsIcon.svg'
  applianceLiterature_btn.style.background = 'white'
  applianceLiteratureIcon.src = 'applianceLiteratureIcon.svg'

  document.getElementById('notificationsButtons').style.display = 'none';
  document.getElementById('infoAndSettingsButtons').style.display = 'none';
  document.getElementById('loadStatusButtons').style.display = 'none';
  document.getElementById('operateLoadsButtons').style.display = 'none';
  document.getElementById('diagnosticTestsButtons').style.display = 'none';
  document.getElementById('applianceLiteratureButtons').style.display = 'none';

  switch(target) {
  case 'notifications_btn':
  document.getElementById('notificationsButtons').style.display = 'inline';
    viewWindow.className = 'viewWindowSmall'
    notifications_btn.style.background = '#2d73a7';
    notificationsIcon.src = 'notificationsIconWhite.svg'
    if(selectedNotificationButton == 'newfiAlerts_btn'){
      viewWindow.innerHTML = newfiAlertsHTML;
      console.log('newfiAlertsHTML')
    }
    if(selectedNotificationButton == 'softwareUpdates_btn'){
      viewWindow.innerHTML = softWareUpdatesHTML;
      console.log('softWareUpdatesHTML')
    }
    if(selectedNotificationButton == 'cloudDiagnostics_btn'){
      viewWindow.innerHTML = cloudDiagnosticsHTML;
      console.log('cloudDiagnosticsHTML')
    }

    for(i=0; i<jsonData.length; i++){
      item = Object.keys(jsonData[i])
      name = Object.keys(jsonData[i])[0];
      var keyNames = Object.keys(name);
      var value = Object.keys(jsonData[i]).map(function (key) { return jsonData[i][key];});
        // if(name == 'Alert Name' && value[2] == 'TRUE'){
        //   viewWindow.innerHTML += "<br><div class='subHeader1'>" + value[0] + "</div>";
        // }
      }
    break;
  case 'faultCodes_btn':
    viewWindow.className = 'viewWindowLarge';
    faultCodes_btn.style.background = '#2d73a7';
    faultCodesIcon.src = 'faultCodesIconWhite.svg'
    viewWindow.innerHTML = faultCodesHTML;
    for(i=0; i<fCodeArray.length; i++){
      fCodeSummary.textContent += fCodeArray[i] + ", ";
    }
  break;
  case 'cycleHistory_btn':
  viewWindow.className = 'viewWindowLarge'
  cycleHistory_btn.style.background = '#2d73a7';
  cycleHistoryIcon.src = 'cycleHistoryIconWhite.svg'
  viewWindow.innerHTML = cycleHistoryHTML;
  /////////////////////////////////////////////////
  // var historyData = [];
  // viewWindow.innerHTML = "<div id='windowHeader' class='windowHeader'>Alerts</div>";
  // windowHeader.innerHTML = "Cycle History Data (Cycle = Compressor Off-Off)"
  // var x = document.createElement("TABLE");
  // x.setAttribute("id", "myTable");
  // x.setAttribute('cellspacing', '0');
  // viewWindow.innerHTML += "<br><br>"
  // viewWindow.appendChild(x);
  // stop = false;
  for(i=0; i<jsonData.length; i++){
    // item = Object.keys(jsonData[i])
    // name = Object.keys(jsonData[i])[0];
    // var keyNames = Object.keys(name);
    //   if(name == 'Time Ago (Days - Hours)' && stop == false){
    //     var title = Object.keys(jsonData[i]);
    //     var value = Object.keys(jsonData[i]).map(function (key) { return jsonData[i][key];});
    //     var newTR = document.createElement("TR");
    //     newTR.setAttribute("id", "myTr");
    //     document.getElementById("myTable").appendChild(newTR);
    //     for(t=0; t<title.length; t++){
    //       var newTD = document.createElement("TD");
    //       var textNode = document.createTextNode(title[t]);
    //       newTD.appendChild(textNode);
    //       document.getElementById("myTr").appendChild(newTD);
    //     }
    //     stop = true;
    //   }
    //   if(name == 'Time Ago (Days - Hours)' && stop == true){
    //     row = Object.keys(jsonData[i]).map(function (key) { return jsonData[i][key];});
    //     var value = Object.keys(jsonData[i]).map(function (key) { return jsonData[i][key];});
    //     var tbodyRef = document.getElementById('myTable');
    //     var newRow = tbodyRef.insertRow();
    //     for(y=0; y<title.length; y++){
    //       var newCell = newRow.insertCell();
    //       var newText = document.createTextNode(row[y]);
    //       newCell.appendChild(newText);
    //     }
      // }
    }
    /////////////////////////////////////
    break;
  case 'infoAndSettings_btn':
    document.getElementById('infoAndSettingsButtons').style.display = 'inline';
    viewWindow.className = 'viewWindowSmall'
    infoAndSettings_btn.style.background = '#2d73a7';
    infoAndSettingsIcon.src = 'infoAndSettingsIconWhite.svg'
    break;
  case 'loadStatus_btn':
  document.getElementById('loadStatusButtons').style.display = 'inline';
    viewWindow.className = 'viewWindowSmall'
    loadStatus_btn.style.background = '#2d73a7';
    loadStatusIcon.src = 'loadStatusIconWhite.svg'
    break;
  case 'operateLoads_btn':
  document.getElementById('operateLoadsButtons').style.display = 'inline';
    viewWindow.className = 'viewWindowSmall'
    operateLoads_btn.style.background = '#2d73a7';
    operateLoadsIcon.src = 'operateLoadsIconWhite.svg'
    break;
  case 'diagnosticTests_btn':
  document.getElementById('diagnosticTestsButtons').style.display = 'inline';
    viewWindow.className = 'viewWindowSmall'
    diagnosticTests_btn.style.background = '#2d73a7';
    diagnosticTestsIcon.src = 'diagnosticTestsIconWhite.svg'
    break;
  case 'applianceLiterature_btn':
  document.getElementById('applianceLiteratureButtons').style.display = 'inline';
    viewWindow.className = 'viewWindowSmall'
    applianceLiterature_btn.style.background = '#2d73a7';
    applianceLiteratureIcon.src = 'applianceLiteratureIconWhite.svg'
    break;

}
}

var notificationsButtonList = [newfiAlerts_btn,softwareUpdates_btn,cloudDiagnostics_btn];
function notificationsClicked(){
  for(i=0; i<notificationsButtonList.length; i++){
    notificationsButtonList[i].style.color = '#4d4d4d';
    notificationsButtonList[i].style.background = 'white';
  }
  switch(event.target.id) {
  case 'newfiAlerts_btn':
    selectedNotificationButton = 'newfiAlerts_btn';
    viewWindow.innerHTML = newfiAlertsHTML;
    newfiAlerts_btn.style.background = '#2d73a7';
    newfiAlerts_btn.style.color = 'white';
  break;
  case 'softwareUpdates_btn':
    selectedNotificationButton = 'softwareUpdates_btn';
    viewWindow.innerHTML = softWareUpdatesHTML;
    softwareUpdates_btn.style.background = '#2d73a7';
    softwareUpdates_btn.style.color = 'white';
  break;
  case 'cloudDiagnostics_btn':
    selectedNotificationButton = 'cloudDiagnostics_btn';
    viewWindow.innerHTML = cloudDiagnosticsHTML;
    cloudDiagnostics_btn.style.background = '#2d73a7';
    cloudDiagnostics_btn.style.color = 'white';
  break;
  }
}










// document.getElementById('notificationsButtons').style.display = 'none';
document.getElementById('infoAndSettingsButtons').style.display = 'none';
document.getElementById('loadStatusButtons').style.display = 'none';
document.getElementById('operateLoadsButtons').style.display = 'none';
document.getElementById('diagnosticTestsButtons').style.display = 'none';
document.getElementById('applianceLiteratureButtons').style.display = 'none';

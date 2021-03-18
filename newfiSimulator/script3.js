document.title = "Newfi Simulator"

xhr = new XMLHttpRequest();
xhr.open("GET","newfi.svg",false);
xhr.overrideMimeType("image/svg+xml");
xhr.send("");
var newfi = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);
var buttonGroup1 = layer1.getElementsByTagName('g');
for(i=0; i<buttonGroup1.length; i++){
  buttonGroup1[i].addEventListener('mouseover', function (){overButton(this)});
  buttonGroup1[i].addEventListener('mouseout', function (){leaveButton(this)});
}
var buttonGroup2 = layer2.getElementsByTagName('g');
for(a=0; a<buttonGroup2.length; a++){
  buttonGroup2[a].addEventListener('mouseover', function (){overButton(this)});
  buttonGroup2[a].addEventListener('mouseout', function (){leaveButton(this)});
}
var buttonGroup3 = layer3.getElementsByTagName('g');
for(i=0; i<buttonGroup3.length; i++){
  buttonGroup3[i].addEventListener('mouseover', function (){overButton(this)});
  buttonGroup3[i].addEventListener('mouseout', function (){leaveButton(this)});
}
var buttonGroup4 = layer4.getElementsByTagName('g');
for(i=0; i<buttonGroup4.length; i++){
  buttonGroup4[i].addEventListener('mouseover', function (){overButton(this)});
  buttonGroup4[i].addEventListener('mouseout', function (){leaveButton(this)});
}

var ns = 'http://www.w3.org/2000/svg';
var svg = document.querySelector( 'svg' );
var foreignObject = document.createElementNS( ns, 'foreignObject');
foreignObject.setAttribute('height', 2000);
foreignObject.setAttribute('width', 1780);
foreignObject.setAttribute('x', 235);
foreignObject.setAttribute('y', 288);
var viewWindow = document.createElement('div');
viewWindow.innerHTML = "<div class='windowHeader>Alerts</div>";
viewWindow.classList.add("viewWindow");
foreignObject.appendChild( viewWindow );
svg.appendChild(foreignObject);

function overButton(e){
  console.log('fired')
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

gsap.to(softwareUpdate_bg, {duration:2, fill:'#77dd77', repeat:-1, yoyo:true, delay:2});


//FCode Data
var fCodeData = [];
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    fCodeData = JSON.parse(this.responseText);
    for(i=0; i<fCodeData.length; i++){
      switch(fCodeData[i]["SerialName"]) {
        case "0x2200.FF1_THERM_INSTANT":
        ff1ThermistorText.textContent = fCodeData[i]["SerialNumberValue"] + " °F";
        break;
        case "0x2202.FFEVAP_THERM_INSTANT":
        ffEvapThermistorText.textContent = fCodeData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x2203.FZ_THERM_INSTANT":
        fzThermistorText.textContent = fCodeData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x2204.FZEVAP_THERM_INSTANT":
        fzEvapThermistorText.textContent = fCodeData[i]["SerialNumberValue"] + " °F";
        break;
        case"3x36.ALL_DOORBOARD_INFO_ICE_CAB_THERMISTOR":
        iceBoxThermistorText.textContent = fCodeData[i]["SerialNumberValue"] + " °F";
        break;
        case"3x3609.ALL_DOORBOARD_INFO_ICEMAKER_MOLD_HEATER":
        imDrMoldBodyThermistor.textContent = fCodeData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x35.ALL_THERMISTOR_DELI_PAN":
        deliPanThermistor.textContent = fCodeData[i]["SerialNumberValue"] + " °F";
        break;
        case"0x2206.HUMIDITY_THERM_INSTANT":
        ambientHumidity.textContent = fCodeData[i]["SerialNumberValue"] + " %";
        break;
        case"0x2205.AMBTEMP_THERM_INSTANT":
        ambientTempThermistor.textContent = fCodeData[i]["SerialNumberValue"] + " °F";
        break;
      }
    }
  }
};
xmlhttp.open("GET", "fCodes.json", true);
xmlhttp.send();

var mainButtonsArray = ['notifications_btn', 'faultCodes_btn', 'cycleHistory_btn', 'infoSettings_btn', 'loadStatus_btn', 'operateLoads_btn', 'diagnosticTests_btn', 'applianceLiterature_btn'];

var selectedMainButton = '';
function buttonClicked(target){
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
  gsap.set(viewWindow, {x:0});
  switch(target) {
  case 'notifications_btn':
    gsap.set([cloudDiagnostics_btn, softwareUpdate_btn, newfiAlerts_btn], {autoAlpha:1});
    gsap.set(viewWindow, {x:190});
    // viewWindow.style.backgroundColor = 'red';
    viewWindow.innerHTML = "<div class='alertsHeader'>Alerts</div>"
    +"<div id='scrollable' style='background-color:#fff; height:100vh; left:500px; overflow:auto; padding:20px 0px;'>Robert</div>"
    for(i=0; i<fCodeData.length; i++){
      if(fCodeData[i]['Alert Fired'] == 'TRUE'){
        scrollable.innerHTML +=
        "<div style='background-color:#eeeeee; position:relative; font-size: 20px; padding:0px;'>"
          +"<div style='background-color:#d7d7d7; position:relative; font-size: 35px; padding:20px; margin-top:10px;'>"
            +"<p><strong>"+ fCodeData[i]['Alert Name'] + "</strong></p>"
          +"</div>"
        + "</div>";
      }
    }
    break;

  case 'faultCodes_btn':
    gsap.set([cloudDiagnostics_btn, softwareUpdate_btn, newfiAlerts_btn], {autoAlpha:0});
    // gsap.to(htmlWindow1, {autoAlpha:1});
    viewWindow.innerHTML =
    "<div class='faultCodesBanner' style='postion:absolute'>"
      +"<span><button id='cycleHistory_btn'>Clear All Codes</button></span>"
      +"<span style='position:fixed; left:400px; width:900px; height:6vh; font-size: 20px; border: solid thin black; border-radius: 10px; padding:10px; background-color:#9e9e9eff; color:white;'>All F-codes: <span id='fCodeSummary'></span></span>"
      +"<img src='refreshIcon.png' style='position:fixed; right:10px; width:5%'>"
    +"</div>"
    +"<div id='scrollable' style='background-color:#eeeeee; height:90vh; overflow:auto;  padding:20px 0px;'></div>"
    for(i=0; i<fCodeData.length; i++){
      if(i < fCodeData.length-1){
        fCodeSummary.innerHTML += fCodeData[i]['Value']  + ","
      }else{
        fCodeSummary.innerHTML += fCodeData[i]['Value']
      }
      if(fCodeData[i]['FcodeIgnored'] == 'False'){
      scrollable.innerHTML +=
      "<div style='background-color:#eeeeee; border-bottom: solid; border-width: thin; position:relative; font-size: 20px; padding:20px;'>"
        +"<div>"
          +"<p><strong>"+ fCodeData[i]['DaysAgo'] + "</strong></p>"
          +"<p>Days Ago</p><br>"
        +"</div>"
        +"<div>"
          +"<p><strong>"+ fCodeData[i]['IsActive'] + "</strong></p>"
          +"<p>State</p><br>"
        +"</div>"
        +"<div>"
          +"<p><strong>"+ fCodeData[i]['Count'] + "</strong></p>"
          +"<p>Count</p><br>"
        +"</div>"
        +"<div>"
          +"<p><strong>"+ fCodeData[i]['CycleCount'] + "</strong></p>"
          +"<p>Cycle Number</p><br>"
        +"</div>"
        +"<span style='font-size:3vw; color:black; margin-left:50px; font-weight: 900px; position:absolute; top:0%; left:8%;'><strong>" + "F-"+ fCodeData[i]['Value'] + "</strong></span>"
        // +"<span style='font-size:1vw; color:black; margin-left:50px; font-weight: 900px; position:absolute; top:50%; left:10%;'><strong>" + "F-"+ fCodeData[i]['Value'] + "</strong></span>"
      + "</div>";
    }
    }
    break;
    case 'cycleHistory_btn':
    gsap.set([cloudDiagnostics_btn, softwareUpdate_btn, newfiAlerts_btn], {autoAlpha:0});
    var historyData = [];
    viewWindow.innerHTML = "<div class='windowHeader'><div id='cycleHistoryBanner'>Cycle History Data (Cycle = Compressor Off-Off)</div></div>"
    var div = document.createElement('div');
    viewWindow.appendChild(div);
    div.id = "tableDiv";
    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    x.setAttribute('cellspacing', '0')
    tableDiv.appendChild(x);
    stop = false;
    for(i=0; i<fCodeData.length; i++){
      item = Object.keys(fCodeData[i])
      name = Object.keys(fCodeData[i])[0];
      var keyNames = Object.keys(name);
        if(name == 'Time Ago (Days - Hours)' && stop == false){
          var title = Object.keys(fCodeData[i]);
          var value = Object.keys(fCodeData[i]).map(function (key) { return fCodeData[i][key];});
          var newTR = document.createElement("TR");
          newTR.setAttribute("id", "myTr");
          document.getElementById("myTable").appendChild(newTR);
          for(t=0; t<title.length; t++){
            var newTD = document.createElement("TD");
            var textNode = document.createTextNode(title[t]);
            newTD.appendChild(textNode);
            document.getElementById("myTr").appendChild(newTD);
          }
          stop = true;
        }
        if(name == 'Time Ago (Days - Hours)' && stop == true){
          row = Object.keys(fCodeData[i]).map(function (key) { return fCodeData[i][key];});
          var value = Object.keys(fCodeData[i]).map(function (key) { return fCodeData[i][key];});
          console.log(row)
          var tbodyRef = document.getElementById('myTable');
          var newRow = tbodyRef.insertRow();
          for(y=0; y<title.length; y++){
            var newCell = newRow.insertCell();
            var newText = document.createTextNode(row[y]);
            newCell.appendChild(newText);
          }
        }
      }
      break;
  }
}

viewWindow.appendChild(newfiAlerts_btn)
gsap.to(newfiAlerts_btn, {duration:5, x:500})
newfiAlerts_btn.setAttribute('className', 'faultCodesBanner')
console.log(newfiAlerts_btn.class)

// var json = '{ "foo": 1, "bar": 2, "baz": 3 }';
// var obj = JSON.parse(json);
// var values = Object.keys(obj).map(function (key) { return obj[key]; });
//
// var keyNames = Object.keys(obj);
// console.log(keyNames)

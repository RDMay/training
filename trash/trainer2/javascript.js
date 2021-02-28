// var req = new XMLHttpRequest();
//
// req.onload = function() {
//     document.getElementById('mainWindow').innerHTML = this.responseText;
//     var links = document.getElementsByTagName('a');
//     for(var i = 0; i< links.length; i++){
//       console.log('fired')
//       links[i].style.color = 'orange';
//       links[i].onclick = function(e) {
//               for(var a = 0; a< links.length; a++){
//                 links[a].style.color = 'orange';
//               }
//               this.style.color = 'red';
//           }
//     }
// }
//
// req.open("get", "trainersPage.html", true);
// req.send();



// var schematic = document.getElementById("mainWindow").appendChild(xhr.responseXML.documentElement);

function changeIframe(){
  document.getElementById('myIframe').src = "../highlightingDiagrams/TMNF Timer Refer/exercise1/content.html";
}

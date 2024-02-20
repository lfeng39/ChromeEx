// popup.js

// document.addEventListener("DOMContentLoaded", function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         const currentTab = tabs[0]
//         chrome.tabs.sendMessage(currentTab.id, { action: "getHTML" }, function (response) {
//         console.log(currentTab.title)
//         // console.log(response.html);
//         document.getElementById('html').innerText = response.html
//         })
//     })
// })
  
document.getElementById('getHtml').onclick = getHtml
function getHtml()
{
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0]
        chrome.tabs.sendMessage(currentTab.id, { action: "getHTML" }, function (response) {
            console.log(currentTab.title)
            // console.log(response.html);
            // document.getElementById('html').innerText = response.html
        })
    })
    
}
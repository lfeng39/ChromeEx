
// console.log("This is a popup!!!")
// console.log('app.js')
// chrome.action.setPopup({popup: '../html/popup.html'});
// chrome.notifications

document.getElementById('calltest').onclick = tip

function tip()
{
    // alert('gptapi')
    document.getElementById('gptapi').innerText = 'come on'

    chrome.runtime.sendMessage({ action: 'generateText', txt: '窗前明月光 作者是谁 全文内容 以及还有别的版本吗' })

    // chrome.tabs.query({ active: true, currentWindow: true }, sendM)
    // function sendM(tabs)
    // {
    //     chrome.tabs.sendMessage(tabs[0].id, { action: 'generateText' })
    // }
}


// chrome.runtime.onMessage.addListener(reS);
// function reS(request, sender, sendResponse)
// {
//     if (request.action === 'displayText')
//     {
//       document.getElementById('gptapi').innerText = request.text;
//     }
// }



  
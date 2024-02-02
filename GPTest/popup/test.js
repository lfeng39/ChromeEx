
// console.log("This is a popup!!!")
// console.log('app.js')
// chrome.action.setPopup({popup: '../html/popup.html'});
// chrome.notifications



url_obj = new URLSearchParams(window.location.search)
selTxt = url_obj.get('selTxt')
document.getElementById('gptxt').innerText = 'selTxt'

window.addEventListener
(
    'blur',
    function closedPopup()
    {
        window.close()
    }
)
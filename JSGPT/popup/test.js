
// console.log("This is a popup!!!")
// console.log('app.js')
// chrome.action.setPopup({popup: '../html/popup.html'});
// chrome.notifications



window.addEventListener
(
    'blur',
    function closedPopup()
    {
        window.close()
    }
)

url_obj = new URLSearchParams(window.location.search)
selTxt = url_obj.get('selTxt')
gptRsp = url_obj.get('gptRsp')

document.getElementById('sel_txt').innerText = selTxt
document.getElementById('gpt_rsp').innerText = gptRsp

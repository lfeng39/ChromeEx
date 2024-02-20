// window.addEventListener
// (
//     'blur',
//     function closedPopup()
//     {
//         window.close()
//     }
// )

url_obj = new URLSearchParams(window.location.search)
selTxt = url_obj.get('selTxt')
// gptRsp = url_obj.get('gptRsp')

document.getElementById('sel_txt').innerText = selTxt
chrome.runtime.onMessage.addListener(
    function(request, sender, respone)
    {
        // alert(request.data.bullets)
        if(request.action === 'fillData')
        {
            document.getElementById('gpt_rsp').innerText = request.data
        }
        
    }
)
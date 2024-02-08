

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
lan = url_obj.get('lan')
gptRsp = url_obj.get('gptRsp')

document.getElementById('sel_txt').innerText = selTxt
document.getElementById('lan').innerText = 'SelTxt -- ' + lan
document.getElementById('gpt_rsp').innerText = gptRsp

// function parseString()
// {
//     url_obj = new URLSearchParams(window.location.search)
//     selTxt = url_obj.get('selTxt')
//     return selTxt
// }
// document.getElementById('gptxt').innerText = parseString()
document.getElementById('calltest').onclick = tips
document.getElementById('ser').onclick = sendTabInfo

function tips()
{
    var popup_obj = chrome.extension.getViews({ type: 'popup' })[0]
    popup_title = popup_obj.document.title
    // alert('leo.js:' + popup_title)
    prompt_title = prompt(popup_title)
    popup_title = prompt_title
}

function sendTabInfo()
{
    chrome.tabs.query
    (
        {active: true, currentWindow: true},
        (tab) => 
        {
            title = tab[0].title
            url = tab[0].url
            chrome.runtime.sendMessage
            (
                {
                    message: 'stock',
                    tabTitle: title,
                    tabUrl: url
                }
            )
        }
    )


}

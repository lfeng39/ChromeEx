chrome.runtime.onInstalled.addListener(() => {
  console.log('pageListener-worker')
  chrome.action.setBadgeText(
    {
      text: 'eyes',
    });


})

// chrome.action.onClicked.addListener((tab) => {
//   console.log(tab.url, tab.id, tab.index, tab.width, tab.title)

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  // console.log('Received HTML content:', tabId, tab.title, tab.url)
  if (changeInfo.status === 'complete') {
    console.log('complete:', tabId, tab.title, tab.url)
    // chrome.tabs.sendMessage(tabId, { url: tab.url })
    if(tab.url.includes('amazon') && tab.url.includes('/dp/'))
    {
      console.log('LittleKris')
      const tt = tab.url.split('dp')
      console.log('LittleKris',tt)
      chrome.tabs.sendMessage(tabId, { action: 'amazon' })
    }
  }

})


chrome.runtime.onMessage.addListener(function(request, sender, response)
{
  if(request.action === 'popup')
  {
    const html = request.pageHTML
    console.log(typeof html, html)
    const popupURL = 'popup/popup-win.html?html=' + 'htmlCode'
    chrome.windows.create(
      {
        url: chrome.runtime.getURL(popupURL),
        type: 'popup',
        width: 800,
        height: 800,
        // top: msg.screeny,
        // left: msg.screenx
      },
      function(popupWindow)
      {
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
        {
          if (tabId === popupWindow.tabs[0].id && changeInfo.status === 'complete')
          {
            chrome.tabs.sendMessage(tabId, { action: 'fillData', data: html });
          }
        });
      }
    )
  }
  if(request.action === 'aiRegnerate')
  {
    console.log('aiRegnerate requeset msg:', request.listing_title)
    const j21_api_key = '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'
    const postUrl = ['http://localhost:8080', 'https://api.openai.com/v1/chat/completions']
    // const postUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${j21_api_key}`,
    }
    const data = {
      messages: request.listing_title,
      // bullet: request.listing_bullet
      // model: "gpt-3.5-turbo",
      // messages: [
      //     // {
      //     //     "role": "system",
      //     //     "content": "You are a helpful assistant."
      //     // },
      //     {
      //         "role" : "user",
      //         "content": request.message
      //     }
      // ]
    }
    fetch(postUrl[0], {method: 'POST', headers: headers, body: JSON.stringify(data)})
      .then(response =>
      {
        if (!response.ok) {
          throw new Error(`Network response was not ok, fetch respone status: ${response.status}`)
        }
        return response.json()
      })
      .then(data =>
      {
        // console.log('API Health Response:', data.messages)
        // const da = data
        // console.log('nodeSer Response:', typeof(da), da)
        console.log('nodeSer Response:', data.messages)
        console.log('data type:', typeof(data.messages))
        response(data)
        // const gptRsp = data.messages[0].content
        // const gptRsp = data.choices[0].message.content
      })
      .catch(error =>
      {
        console.error('fetchError:', error)
      })
    return true
  }
})
chrome.runtime.onInstalled.addListener(() => {
  console.log('service-worker')
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
        function(popupWindow) {
          chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            if (tabId === popupWindow.tabs[0].id && changeInfo.status === 'complete') {
              // 弹窗加载完成后发送数据
              chrome.tabs.sendMessage(tabId, { action: 'fillData', data: html });
            }
          });
        }
      )
      
  }
  if(request.action === 'aiRegnerate')
  {
    console.log(request.message)
    const j21_api_key = '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'
    const postUrl = 'http://localhost:8080';
    // const postUrl = 'https://api.openai.com/v1/chat/completions';
    fetch
    (
      postUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${j21_api_key}`,
        },
        body: JSON.stringify(
          {
            messages: request.listing_title,
            bullet: request.listing_bullet
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
        )
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // 处理 API 返回的数据
        // console.log('API Health Response:', data.messages);
        console.log('API Health Response:', data);
        // response(data['messages'])
        // const gptRsp = data.messages[0].content
        // const gptRsp = data.choices[0].message.content

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
})
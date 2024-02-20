chrome.runtime.onInstalled.addListener((tab) => 
{
  console.log('Tran-service-worker')
  chrome.action.setBadgeText(
  {
    text: 'Tra',
  });
});


chrome.runtime.onMessage.addListener
(
  function(request, sender, response)
  {
    if(request.action === 'trans')
    {
      console.log('frome content.js:::', request.txt)
      const content = request.txt + ' 请翻译，并详细讲解。'
      const j21_translate_api_key = 'aaa'
      const postUrl = ['http://localhost:8080', 'https://api.openai.com/v1/chat/completions']
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${j21_translate_api_key}`,
      }
      const data = {
        
        model: "gpt-3.5-turbo",
        messages: [
            // {
            //     "role": "system",
            //     "content": "You are a helpful assistant."
            // },
            {
                "role" : "user",
                "content": content
            }
        ]
      }
      const testdata = {
        choices: [
          { message: { content: content}}
        ]
      }
      fetch(postUrl[0], {method: 'POST', headers: headers, body: JSON.stringify(testdata)})
        .then(response =>
        {
          if (!response.ok) {
            throw new Error(`Network response was not ok, fetch respone status: ${response.status}`)
          }
          return response.json()
        })
        .then(data =>
        {
          // console.log('GPT-3.5 data:', data.choices[0])
          // console.log('\n')
          // console.log('GPT-3.5 messages:', data.choices[0].message)
          // console.log('\n')
          console.log(data.choices[0].message.content)
          // console.log('\n')
          // console.log(typeof data.choices[0].message.content.split('@'))
          // response(data.choices[0].message.content)
  
          chrome.windows.create(
            {
              url: chrome.runtime.getURL('popup/popup-win.html?selTxt='+request.txt),
              type: 'popup',
              width: 600,
              height: 800,
              top: request.screeny,
              left: request.screenx
            },
            function(popupWindow)
            {
              // 向弹窗发送数据
              chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
              {
                if (tabId === popupWindow.tabs[0].id && changeInfo.status === 'complete')
                {
                  // 弹窗加载完成后发送数据
                  chrome.tabs.sendMessage(tabId, { action: 'fillData', data: data.choices[0].message.content });
                }
              })
            }
          )
          // chrome.runtime.sendMessage({action: 'popup', data: data})
        })
        .catch(error =>
        {
          console.error('fetchError:', error)
        })
      return true
    }
    console.log(data.choices[0].message.content)
  }
)

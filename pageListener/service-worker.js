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
    const content = 'The amazon listing title is: "' + request.listing_title + '" and bullet points is: "' + request.listing_bullets + '", regenerate an amazon listing title and 5 bullet points with an inspirational tone, each within 170-200 bytes. please provide in JSON format, including the keys title and bullet_points'
    // const content = 'amazon listing 的标题如下: "' + request.listing_title + '" 五点描述如下: "' + request.listing_bullets + '", 请优化他们 使用鼓舞人心的语气 请以JSON格式提供 其中包含以下键 title, bullet_points'
    console.log('aiRegnerate requeset msg:', content)
    const j21_listing_api_key = 'aaa'
    const j21_translate_api_key = 'aaa'
    const postUrl = ['http://localhost:8080', 'https://api.openai.com/v1/chat/completions']
    // const postUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${j21_listing_api_key}`,
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
      title: request.listing_title,
      bullets: request.listing_bullets
    }
    fetch(postUrl[1], {method: 'POST', headers: headers, body: JSON.stringify(data)})
      .then(response =>
      {
        if (!response.ok) {
          throw new Error(`Network response was not ok, fetch respone status: ${response.status}`)
        }
        return response.json()
      })
      .then(data =>
      {
        console.log('GPT-3.5 data:', data.choices[0])
        console.log('\n')
        console.log('GPT-3.5 messages:', data.choices[0].message)
        console.log('\n')
        console.log(data.choices[0].message.content)
        console.log('\n')
        console.log(JSON.parse(data.choices[0].message.content))
        response(parseStr(data.choices[0].message.content))
        // response(data.choices[0].message.content)
      })
      .catch(error =>
      {
        console.error('fetchError:', error)
      })
    return true
  }
})

function parseStr(str)
{
  const aaa = JSON.parse(str)
  const data = {
    title: aaa.title,
    bullets: aaa.bullet_points
    // title: str.split('Bullet Points: ')[0].substring(7),
    // bullets: str.split('Bullet Points: ')[1].split('@').slice(1)

    // title: str.split('@')[0].substring(1, -1),
    // bullets: str.split('@')
  }
  return data
}

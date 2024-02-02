chrome.runtime.onInstalled.addListener((tab) => 
{
  console.log('GAPI-service-worker')
  console.log(tab.url,tab.id)
  if (tab)
  {
    console.log('JS load done', tab, typeof(tab))
  }
  chrome.action.setBadgeText(
  {
    text: 'api',
  });
});

// chrome.action.setPopup(
// {
//     popup: '../popup/popup.html',
// });

function reddenPage()
{
  // url = window.location.search
  alert('mysite'+tab.title)
}

function tableo()
{
  chrome.tabs.create(
  {
    url: chrome.runtime.getURL('popup/popup.html')
  });
}
// import {franc} from './franc/index.js'
chrome.action.onClicked.addListener((tab) => 
{
  console.log(tab.url,tab.id,tab.index,tab.width, tab.title)

  
});


chrome.runtime.onMessage.addListener(reS);
function reS(request, sender, sendResponse)
{

  if(request.action === 'baidu')
  {
    console.log(request.tabTitle)
    chrome.windows.create
    (
      {
        url: chrome.runtime.getURL('popup/test.html'),
        type: 'popup',
        width: 600,
        height: 800,
        // top: request.screeny,
        // left: request.screenx
      }
    )
  }
  if (request.action === 'generateText')
  {
    const prompt = request.txt
    const msg = [{'role':'user', 'content':prompt}]

    // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    const apiKey = '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'
    const j21_api_key = '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'
    const apiOpenai = 'https://api.openai.com/v1/engines/davinci-codex/completions'

    fetch(healthUrl, {
      headers: {
        'Authorization': `Bearer ${j21_api_key}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // 处理 API 返回的数据
        console.log('API Health Response:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    
    // fetch(
    // apiOpenai,
    // {
    //     method: 'POST',
    //     headers:
    //     {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${j21_api_key}`
    //     },
    //     body:
    //     JSON.stringify({
    //     messages: msg,
    //     max_tokens: 100
    //     })
    // })
    // .then(response =>
    // {
    //     if (!response.ok)
    //     {
    //         throw new Error(`Network response was not ok, status: ${response.status}`);
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     const generatedText = data.choices[0].messages.content;
    //     const url = 'popup/popup-win.html?selTxt=' + generatedText
    //   // console.log("Received message:", msg, 'x:', msg.screenx, 'y:', msg.screeny, msg.text)
    //     chrome.windows.create
    //     (
    //       {
    //         url: chrome.runtime.getURL(url),
    //         type: 'popup',
    //         width: 600,
    //         height: 800,
    //         // top: request.screeny,
    //         // left: request.screenx
    //       }
    //     )
    // })
    // .catch(error => console.error('catchError:', error));

    // const url = 'popup/popup-win.html?selTxt=' + request.txt
    // // console.log("Received message:", msg, 'x:', msg.screenx, 'y:', msg.screeny, msg.text)
    // chrome.windows.create
    // (
    //   {
    //     url: chrome.runtime.getURL(url),
    //     type: 'popup',
    //     width: 600,
    //     height: 800,
    //     // top: request.screeny,
    //     // left: request.screenx
    //   }
    // )
    console.log('request',request.txt)
  }
}
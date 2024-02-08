// import '../popup/app.js';
// import '../node_modules/langdetect'
// import '../node_modules/franc'
// import '../node_modules/require'

// import {creatRequire} from 'module'
// const require = creatRequire(import.meta.url)

// chrome.action.onClicked.addListener
// ((tab) =>
//   {
//     // console.log('Detected language:', 'detectedLanguage');
//     chrome.scripting.executeScript
//     (
//       {
//         target: {tabId: tab.id},
//         function: function() {
          
//           const franc = require('franc')
//           const text = "Hello, this is a sample text."
//           // const detectedLanguage = franc(text)
//           console.log('Detected language:'+franc(text))
//         }
//       }
//     )
//   }
// )

chrome.action.setPopup
(
  {
    popup: '../popup/popup.html',
  }
)

// chrome.tabs.create({ url: 'www.baidu.com' })
chrome.runtime.onInstalled.addListener
(
  () => 
  {
    // var langdetect = require('langdetect')
    // console.log(langdetect.detect('Extension installed'))
    console.log('Extension installed')
    chrome.tabs.onUpdated.addListener
    (
      (tabId,changeInfo,tab) =>
      {    
        if (changeInfo.status === 'complete')
        {
          console.log('loding status:',changeInfo.status, '|', 'title:',tab.title, '|', 'id:',tabId)
          console.log('URL:',tab.url)
          console.log('\n')
          // const langdetect = require('langdetect')
          // console.log(franc('This build supports the following languages'))
          // chrome.tabs.sendMessage(tabId, { action: 'getHtml' }, () =>
          // {
          //   var franc = require('franc')
          //   console.log(franc('This build supports the following languages'))
          //   // console.log('Received content:', received.content);
          // });
          // var franc = require('franc')
          // console.log(franc('This build supports the following languages'))
        }
      }
    )

  // chrome.action.setBadgeText(
  // {
  //   text: 'GPT',
  // })
  }
)

chrome.runtime.onMessage.addListener
(
  (msg) =>
  {
    // if(msg.message === 'displayText')
    // {
    //   // import langdetect from 'langdetect'
    //   // const langdetect = require('langdetect')
    //   // const abc = langdetect.detect(msg.selTxt)
    //   // var franc = require('franc')
    //   // detectedLanguage = franc(selTxt, {minLength: 3})
    //   const url = 'popup/popup-win.html?selTxt=' + msg.text
    //   console.log("Received message:", msg, 'x:', msg.screenx, 'y:', msg.screeny, msg.text)
    //   chrome.windows.create
    //   (
    //     {
    //       url: chrome.runtime.getURL(url),
    //       type: 'popup',
    //       width: 600,
    //       height: 800,
    //       top: msg.screeny,
    //       left: msg.screenx
    //     }
    //   )
    // }
    if(msg.message === 'selTxt')
    {
      // import langdetect from 'langdetect'
      // const langdetect = require('langdetect')
      // const abc = langdetect.detect(msg.selTxt)
      // var franc = require('franc')
      // detectedLanguage = franc(selTxt, {minLength: 3})
      
      const postUrl = 'http://127.0.0.1:5000/python/language'

      fetch(
        postUrl,
        {
            method: 'POST',
            headers:
            {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${apiKey}`
            },
            body:
            JSON.stringify({
            messages: msg.selTxt
            })
        })
        .then(response =>
        {
            if (!response.ok)
            {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('语言：',data.lan);

            const url = 'popup/popup-win.html?selTxt=' + data.content + '&lan=' + data.lan
            // const url = 'popup/popup-win.html?selTxt=' + data.content + '&gptRsp=' + data.gptRsp
            // console.log("Received message:", msg, 'x:', msg.screenx, 'y:', msg.screeny, msg.selTxt);
    
            chrome.windows.create
            (
              {
                url: chrome.runtime.getURL(url),
                type: 'popup',
                width: 600,
                height: 800,
                top: msg.screeny,
                left: msg.screenx
              }
            )
        })
        .catch(error => console.error('catchError:', error));
       
      
    }
    if(msg.message === 'stock')
    {
      console.log("message:", msg);
      // chrome.scripting.executeScript
      // (
      //   {
      //     target: {tabId: tab.id},
      //     function: function() {
      //       const franc = require('franc')
      //       const text = "Hello, this is a sample text."
      //       // const detectedLanguage = franc(text)
      //       console.log('Detected language:'+franc(text))
      //     }
      //   }
      // )
      // chrome.tabs.query({active: true},function tab(tab){
      //   chrome.scripting.executeScript(
      //   {
      //     target: {tabId: tab[0].id},
      //     func: function test(){console.log(tab[0].id)}
      //   });
      // })
      
          
          // url = 'popup/popup-win.html?selTxt=' + tabs[0].title
          // chrome.windows.create(
          // {
          //   url: chrome.runtime.getURL(url),
          //   type: 'popup',
          //   width: 600,
          //   height: 800,
          //   top: msg.screeny,
          //   left: msg.screenx
          // })
    }

  }
)





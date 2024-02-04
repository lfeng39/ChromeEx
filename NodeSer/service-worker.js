// chrome.runtime.onInstalled.addListener((tab) => 
// {
//   console.log('Nodejs-service-worker')
//   chrome.action.setBadgeText(
//   {
//     text: 'node',
//   });
// });

// // import {franc} from './franc/index.js'
// chrome.action.onClicked.addListener
// (
//   (tab) => 
//   {
//     console.log(tab.url,tab.id,tab.index,tab.width, tab.title)
//   }
// )

// const reqHead = {
//   method: 'POST',
//   headers:
//   {
//   'Content-Type': 'application/json',
//   // 'Authorization': `Bearer ${apiKey}`
//   },
//   body:
//   JSON.stringify({
//   messages: request.txt
//   })
// }

chrome.runtime.onMessage.addListener
(
  (request, sender, rsp) =>
  {
    // fet(rsp)
    // request info
    console.log('frome content.js:::',request.txt)
    // response info
    const nodeServerUrl = 'http://localhost:8080'

    // 使用 fetch 发送 GET 请求
    fetch(
      nodeServerUrl, 
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${apiKey}`
        },
        body:
        JSON.stringify({
          messages: request.txt
        })
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        // rsp(data)
        rsp(JSON.parse(data))
        console.log('Response from Node.js server:', JSON.parse(data), typeof(JSON.parse(data)));
        // if(typeof(data) !== 'object')
        // {
        //   console.log('string')
        //   rsp(JSON.parse(data))
        // }
        // else
        // {
        //   rsp(data)
        //   console.log('Response from Node.js server:', data, typeof(data));
        // }
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return true
  }
  
)

// const http = require('http')
// const server = http.createServer(gptSer)
// server.listen(8080)

// function gptSer(request, response)
// {
//     console.log(request)
//     response.write('lfeng say hello')
//     response.end()
// }

// function fet(rsp)
// {
//   const nodeServerUrl = 'http://localhost:8080';

//   // 使用 fetch 发送 GET 请求
//   fetch(nodeServerUrl)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.text();
//     })
//     .then(data => {
//       rsp({message: data})
//       console.log('Response from Node.js server:', data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }
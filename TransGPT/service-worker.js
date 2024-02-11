chrome.runtime.onInstalled.addListener((tab) => 
{
  console.log('Tran-service-worker')
  chrome.action.setBadgeText(
  {
    text: 'Tra',
  });
});

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
    (request, sender, response) => {
      console.log('frome content.js:::', request.txt)
      const content = request.txt + ' 请翻译，并详细讲解。'
      const j21_api_key = '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'
      const postUrl = ['http://localhost:8080', 'https://api.openai.com/v1/chat/completions']
      // const postUrl = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${j21_api_key}`,
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
          // console.log('\n')
          // console.log(typeof data.choices[0].message.content.split('@'))
          response(data.choices[0].message.content)
        })
        .catch(error =>
        {
          console.error('fetchError:', error)
        })
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
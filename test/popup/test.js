
// console.log("This is a popup!!!")
// console.log('app.js')
// chrome.action.setPopup({popup: '../html/popup.html'});
// chrome.notifications
// var tt = require('franc');




// const prompt = '窗前明月光 作者是谁 全文内容 以及还有别的版本吗'
// const msg = [{'role':'user', 'content':prompt}]

// // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
// const l39_api_key = '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'
// const j21_api_key = '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'

// const apiOpenai = 'https://api.openai.com/v1/engines/davinci-codex/completions'
// const requestData = {
//     model: 'gpt-3.5-turbo',
//     messages: msg,
//     max_tokens: 100
// }
// const promptHead = {
//     method: 'POST',
//     headers:
//     {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${j21_api_key}`
//     },
//     body:JSON.stringify(requestData)
// }
// fetch(apiOpenai, promptHead)
//     .then(response =>
//     {
//         if (!response.ok)
//         {
//             throw new Error(`Network response was not ok, status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data =>
//     {
//         const generatedText = data.choices[0].messages.content;
//         alert('GPT'+ ' / ' + generatedText)
//         console.log('GPT', ' / ' , generatedText)
//         // const url = 'popup/popup-win.html?selTxt=' + generatedText
        
//         // console.log("Received message:", msg, 'x:', msg.screenx, 'y:', msg.screeny, msg.text)
//         // chrome.windows.create
//         // (
//         //   {
//         //     url: chrome.runtime.getURL(url),
//         //     type: 'popup',
//         //     width: 600,
//         //     height: 800,
//         //     // top: request.screeny,
//         //     // left: request.screenx
//         //   }
//         // )
//     })
//     .catch(error => console.error('catchError:', error));



const generatedText = '窗前明月光 作者是谁 全文内容 以及还有别的版本吗'
const url = 'popup/popup-win.html?selTxt=' + generatedText
// chrome.windows.create
// (
//     {
//     url: chrome.runtime.getURL(url),
//     type: 'popup',
//     width: 600,
//     height: 800,
//     // top: request.screeny,
//     // left: request.screenx
//     }
// )

alert('GPT'+ ' / ' + generatedText)
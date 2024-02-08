// alert('i am jessie');

window.addEventListener
(
    'click',
    function pageTxt(event)
    {
        // this.alert('data.result')
        selTxt = window.getSelection().toString()
        // const franc = require('franc')
        // const ff = franc(selTxt)
        // this.alert('come on'+ ff)

        // const prompt = "解释下面这段话: " + selTxt
        // const msg = [{'role':'user', 'content':prompt}]
        // const postUrl = '/python/language'

        // fetch(
        //     postUrl,
        //     {
        //         method: 'POST',
        //         headers:
        //         {
        //         'Content-Type': 'application/json',
        //         // 'Authorization': `Bearer ${apiKey}`
        //         },
        //         body:
        //         JSON.stringify({
        //         messages: 'yes you did it.'
        //         })
        //     })
        //     .then(response =>
        //     {
        //         if (!response.ok)
        //         {
        //             throw new Error(`Network response was not ok, status: ${response.status}`);
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log(data.result);
        //         this.alert(data.result)
        //         // const generatedText = data.choices[0].messages.content;
        //         chrome.runtime.sendMessage
        //         (
        //             {
        //                 messages: 'GPTxt',
        //                 text: generatedText,
        //                 screenx: screenx,
        //                 screeny: screeny
        //             }
        //         )
        //     })
        //     .catch(error => console.error('catchError:', error));

        // if (selTxt)
        // {
        //     screenx = event.screenX
        //     screeny = event.screenY
        //     // Simulate generating text using OpenAI GPT-3 API.
        //     // this.alert('come')
        //     const prompt = "解释下面这段话: " + selTxt
        //     const msg = [{'role':'user', 'content':prompt}]
        //     const postUrl = '/python/language'
    
        //     fetch(
        //         postUrl,
        //         {
        //             method: 'POST',
        //             // headers:
        //             // {
        //             // 'Content-Type': 'application/json',
        //             // // 'Authorization': `Bearer ${apiKey}`
        //             // },
        //             body:
        //             JSON.stringify({
        //             messages: 'yes you did it.'
        //             })
        //         })
        //         .then(response =>
        //         {
        //             if (!response.ok)
        //             {
        //                 throw new Error(`Network response was not ok, status: ${response.status}`);
        //             }
        //             return response.json();
        //         })
        //         .then(data => {
        //             console.log(data.result);
        //             this.alert(data.result)
        //             // const generatedText = data.choices[0].messages.content;
        //             // chrome.runtime.sendMessage
        //             // (
        //             //     {
        //             //         messages: 'displayText',
        //             //         text: generatedText,
        //             //         screenx: screenx,
        //             //         screeny: screeny
        //             //     }
        //             // )
        //         })
        //         .catch(error => console.error('catchError:', error));
        // }
        if(selTxt)
        {
            screenx = event.screenX
            screeny = event.screenY
            
            // regex = /[\u4e00-\u9fa5]/
            // detectedLanguage = regex.test(selTxt) ? 'en' : 'other'
            // const franc = require('franc')
            // detectedLanguage = franc(selTxt, {minLength: 3})
            // console.log('Detected language:', detectedLanguage)
            // langdetect = require('langdetect')
            // detectedLanguage = langdetect.detect(selTxt)
            chrome.runtime.sendMessage
            (
                // extensionId,
                {
                    message: 'selTxt',
                    selTxt: selTxt,
                    detectedLanguage: 'detectedLanguage',
                    screenx: screenx,
                    screeny: screeny
                },
                // function resp(response)
                // {
                //     console.log('selTxtresponse:',response,extensionId)
                // }
            )
        }
    }
)


// chrome.runtime.onMessage.addListener((received, sender, sendResponse) =>
// {
//     if (received.action === 'getHtml')
//     {
//       // 获取当前标签页的 HTML 内容
//     //   const htmlContent = document.documentElement.outerHTML
//       const htmlContent = 'code: lfeng39'
//       // 将 HTML 内容发送回给 Service Worker
//       sendResponse({ content: htmlContent });
//     }
// });
  

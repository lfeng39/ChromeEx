window.addEventListener(
    'mouseup',
    
    function go(event) {
        selTxt = window.getSelection().toString()
        screenx = event.screenX
        screeny = event.screenY

        if (selTxt)
        {
            
                chrome.runtime.sendMessage(
                    {
                        action: 'trans',
                        txt: selTxt,
                        screenx: screenx,
                        screeny: screeny
                    },
                    // (response) => {
                    //     this.alert(response)
                    // }
                )

        }
    }
)


// chrome.runtime.sendMessage
// (
//     { getContentData: true },
//     response =>
//     {
//         if (response) {
//         if (response.error) {
//             console.error('Error:', response.error);
//         } else {
//             console.log('Received data in content.js:', response);
//             // 在这里处理收到的数据
//         }
//         } else {
//         console.error('No response received from background.js');
//         }
//     }
// );
window.addEventListener(
    'mouseup',
    function go() {
        selTxt = window.getSelection().toString()
        // this.alert('lfeng39')
        if (selTxt) {
            chrome.runtime.sendMessage
                (
                    {
                        message: 'nodejSer',
                        txt: selTxt
                    },
                    (response) => {
                        this.alert(response)
                    }
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
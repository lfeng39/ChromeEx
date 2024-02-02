// alert('test content.js')
// console.log('test content.js')




window.addEventListener(
    'click',
    function cli()
    {
        // this.alert('GPTEST')
        chrome.tabs.query
        (
            {active: true, currentWindow: true},
            (tab) => 
            {
                title = tab[0].title
                url = tab[0].url
                chrome.runtime.sendMessage
                (
                    {
                        action: 'baidu',
                        tabTitle: title,
                        tabUrl: url
                    }
                )
            }
        )
    }
)

// function fetch()
// {
//     fetch(
//             postUrl,
//             {
//                 method: 'POST',
//                 headers:
//                 {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${apiKey}`
//                 },
//                 body:
//                 JSON.stringify({
//                 messages: 'yes you did it.'
//                 })
//             }
//         )
//             .then(response =>
//             {
//                 if (!response.ok)
//                 {
//                     throw new Error(`Network response was not ok, status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data.result);
//                 this.alert(data.result)
//             })
//             .catch(error => console.error('catchError:', error));
// }
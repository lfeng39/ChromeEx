
window.addEventListener
(
    'click',
    function cli()
    {
        // const [tabInfo] = chrome.runtime.query({ active: true, currentWindow: true })
        chrome.runtime.sendMessage
        (
            {
                action: 'baidu',
                message: '讲一个爱情小故事 150字以内'
            },
            // {
            //     action: 'cli',
            //     message: 'cli'
            // },
            function req(req)
            {
                alert(req)
            }
        )
    }
)


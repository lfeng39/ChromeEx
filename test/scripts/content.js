window.addEventListener
(
    'click',
    function cli()
    {
        const messageData = {
            action: 'getTabInfo'
        }
        
        chrome.runtime.sendMessage
        (
            messageData,
            function(req)
            {
                alert(req.title)
                console.log('type',typeof(req),req)
            }
        )
        
    }
)


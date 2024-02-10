chrome.runtime.onInstalled.addListener((tab) => 
{
  console.log('JSGPT-worker')
  chrome.action.setBadgeText(
  {
    text: 'js',
  });
});


chrome.runtime.onMessage.addListener(reS);
function reS(request, sender, sendResponse)
{
  if(request.action === 'baidu')
  {
    console.log(request.message)
    sendResponse(request.message)
  }
  if(request.action === 'amazon')
  {
    console.log(request.message)
    const j21_api_key = 'aaa'
    // const postUrl = 'http://localhost:8080';
    const postUrl = 'https://api.openai.com/v1/chat/completions';
    fetch
    (
      postUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${j21_api_key}`,
        },
        body: JSON.stringify(
          {
            model: "gpt-3.5-turbo",
            messages: [
                // {
                //     "role": "system",
                //     "content": "You are a helpful assistant."
                // },
                {
                    "role" : "user",
                    "content": request.message
                }
            ]
          }
        )
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // 处理 API 返回的数据
        // console.log('API Health Response:', data.messages);
        // console.log('API Health Response:', data);
        const gptRsp = data.messages[0].content
        // const gptRsp = data.choices[0].message.content
        chrome.windows.create
        (
          {
            url: chrome.runtime.getURL('popup/test.html?selTxt='+request.message+'&gptRsp='+gptRsp),
            type: 'popup',
            width: 600,
            height: 800,
            // top: request.screeny,
            // left: request.screenx
          }
        )
      })
      .catch(error => {
        console.error('Error:', error);
      });
      console.log('request done, wait')
  }
}
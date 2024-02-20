chrome.runtime.onInstalled.addListener(() => {
  console.log('A.I.Listing-worker')
})


chrome.webNavigation.onCompleted.addListener(function(tab)
{
  if (tab.url.includes('amazon.com') && tab.url.includes('/dp/') || tab.url.includes('/gp/'))
  {
    console.log('Amazon page loaded:', tab.url)
    console.log('split URL', tab.url.split('dp'))
    chrome.tabs.sendMessage(tab.tabId, { action: 'amazon' })
  }
})

chrome.runtime.onMessage.addListener(function(request, sender, response)
{
  if(request.action === 'aiRegnerate')
  {
    
    const key_word_a = 'with persuasive tone, provides more detailed information while maintaining'
    const responseFormat = 'please provide in JSON format, including the keys title and bullet_points'
    const content = 'The amazon listing title is: "' + request.listing_title + '" and bullet points is: "' + request.listing_bullets + '", regenerate an amazon listing title and 5 bullet points'+ key_word_a +', each within 170-200 bytes, with shortened phrases at the beginning of each bullet point.' + responseFormat
    const j21_listing_api_key = 'aaa'
    const postUrl = 'https://api.openai.com/v1/chat/completions'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${j21_listing_api_key}`,
    }
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
          {
              "role" : "user",
              "content": content
          }
      ]
    }
    fetch(postUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
      .then(response =>
      {
        if (!response.ok) {
          throw new Error(`Network response was not ok, fetch respone status: ${response.status}`)
        }
        return response.json()
      })
      .then(data =>
      {
        // console.log(JSON.parse(data.choices[0].message.content))
        response(parseStr(data.choices[0].message.content))
      })
      .catch(error =>
      {
        console.error('fetchError:', error)
      })
    return true
  }
})

function parseStr(str)
{
  const json_str = JSON.parse(str)
  const data = {
    title: json_str.title,
    bullets: json_str.bullet_points
  }
  return data
}

chrome.runtime.onInstalled.addListener((tab) => 
{
  console.log('service-worker')
  console.log(tab.url,tab.id)
  if (tab)
  {
    console.log('JS load done', tab, typeof(tab))
  }
  chrome.action.setBadgeText(
  {
    text: 'Leo',
  });
});

// chrome.action.setPopup(
// {
//     popup: '../popup/popup.html',
// });

function reddenPage()
{
  // url = window.location.search
  alert('mysite'+tab.title)
}

function tableo()
{
  chrome.tabs.create(
  {
    url: chrome.runtime.getURL('popup/popup.html')
  });
}
// import {franc} from './franc/index.js'
chrome.action.onClicked.addListener((tab) => 
{
  console.log(tab.url,tab.id,tab.index,tab.width, tab.title)

  // var popup_obj = chrome.extension.getViews({ type: 'popup' })[0]
  // popup_title = popup_obj.document.title
  // alert('sendTabInfo:' + popup_title)
  if(tab.url.includes('amazon'))
  {
    chrome.scripting.executeScript(
    {
      target: {tabId: tab.id},
      // files: ['scripts/content.js']
      func: tableo
    });
  }
  else
  {
    // chrome.runtime.sendMessage(
    //   // tab.id,
    //   {
    //     msg: 'showAlert',
    //     title: 'tab.title',
    //     url: 'tab.url'
    //   },
    // )
    chrome.scripting.executeScript(
    {
      target: {tabId: tab.id},
      // files: ['jessie.js']
      files: ['popup/test.js']
      // func: tableo
    });
  }
});



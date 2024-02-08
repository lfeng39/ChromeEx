
url_obj = new URLSearchParams(window.location.search)
html = url_obj.get('html')


// document.getElementById('html').innerText = html
// document.getElementById('html_code').innerText = html_code


chrome.runtime.onMessage.addListener(function(request, sender, response){
    if(request.action === 'fillData')
    {
        const htmlString = request.data
        document.getElementById('html_code').innerHTML = htmlString
    }
    // console.log('294053174 JAL',request)
})
chrome.runtime.onMessage.addListener(function(request, sender, response)
{
    // create ai trigger module
    const littl_kris_module = document.getElementById('dp-container').children[0]
    const a_i_regnerate_module = document.getElementById('a-page')
    const littl_kris_module_div = document.createElement('div')
    const a_i_regnerate_module_div = document.createElement('div')
    littl_kris_module_div.style = 'width: 100%; min-height: 50px; border-radius:8px; border:1px solid #f5f5f5; background-color: #fcfcfc; margin: 18px 0';
    littl_kris_module_div.innerHTML = `
    <div style="text-align: center; margin: 10px; padding: 10px;">
        <h1>LittleKris</h1>
        <button id="ai_btn" style="height: 35px; border-radius:8px;">A.I.Regnerate Title & Bullet</button>
    </div>
    `
    // create ai module
    if(window.screen.availHeight < 1000)
    {
        // alert('hei / '+document.body.offsetHeight + ' / ' + window.screen.availHeight)
        a_i_regnerate_module_div.style = 'display: none; position: fixed; z-index:1000; width: 100%; height: 100%; padding-top:'+ (window.screen.availHeight*0.5-window.screen.availHeight*0.6*0.76) +'px; background-color: rgb(0, 0, 0, 0.6);'
    }
    else
    {
        a_i_regnerate_module_div.style = 'display: none; position: fixed; z-index:1000; width: 100%; height: 100%; padding-top:'+ (window.screen.availHeight*0.5-window.screen.availHeight*0.6*0.6) +'px; background-color: rgb(0, 0, 0, 0.6);'
    }
    a_i_regnerate_module_div.id = 't_b_bg'
    a_i_regnerate_module_div.innerHTML = `
    <div id="t_b">
        <div style="display: flex; justify-content: space-between;">
            <div><h1>LittleKris TEST</h1></div>
            <div><h1 id="closed">X</h1></div>
        </div>
        <div style="display: flex; justify-content: space-between; height:90%; overflow: hidden; overflow-y: scroll;">
            <div id="bullets" style="width:33%; height:100%; margin: 10px 0; padding: 10px; border-radius:8px; background-color: rgb(250, 250, 250, 0.8);">
                <div><h1>Before</h1></div>
                <div></div>
                <div></div>
            </div>
            <div style="width:33%; height:100%; margin: 10px 0; padding: 10px; border-radius:8px; background-color: rgb(250, 250, 250, 0.8);">
                <div><h1>After</h1></div>
                <div id="gptRspTitle"><h1>GPT-2</h1></div>
                <div id="gptRspBullet"></div>
            </div>
            <div style="width:33%; height:100%; margin: 10px 0; padding: 10px; border-radius:8px; background-color: rgb(250, 250, 250, 0.8);">
                <div><h1>GPT-Regnerate</h1></div>
                <div><h1>GPT-2</h1></div>
                <div></div>
            </div>
        </div>
    </div>
    `
    littl_kris_module.insertAdjacentElement('beforebegin', littl_kris_module_div)
    a_i_regnerate_module.insertAdjacentElement('beforebegin', a_i_regnerate_module_div)
    document.getElementById('ai_btn').onclick = aiRegnerate
    document.getElementById('closed').onclick = closed
    document.getElementById('closed').style.cursor = 'pointer'
})

function aiRegnerate()
{
    const pageHTML = document.documentElement.outerHTML;

    //   const htmlString = request.data
    const parser = new DOMParser();
    const doc = parser.parseFromString(pageHTML, 'text/html');
    // const bullets_length = doc.getElementById('feature-bullets').children[0].children
    const bullets_length = doc.getElementById('feature-bullets').getElementsByTagName('li')
    console.log('.children', bullets_length)
    const title = doc.getElementById('productTitle').innerText
    const bullets = []
    for(i=0; i<bullets_length.length; i++)
    {
        // bullets.push(doc.getElementById('feature-bullets').children[2].children[i].innerText)
        const tagP = '<p style="font-size:16px;">*' + bullets_length[i].innerText +'</p>'
        // console.log('???',tagP)
        bullets.push(tagP)
    }
    // console.log('bullets', typeof bullets, bullets)
    document.getElementById('bullets').children[1].innerHTML = '<h1 style="font-size: 18px; line-height: 18px; margin-bottom: 15px;">' + title + '</h1>'
    document.getElementById('bullets').children[2].innerHTML = bullets.join('')

    const main_width = window.getComputedStyle(dp)['max-width']
    console.log('window.screen.availHeight',window.screen.availHeight)
    document.getElementById('t_b_bg').style.display = ''
    // main_dp_width value for ai module
    if(window.screen.availHeight < 1000)
    {
        document.getElementById('t_b').style = 'max-width:'+ main_width +'; height:'+ window.screen.availHeight*0.8 +'px; border-radius:8px; background-color: rgb(250, 250, 250, 0.8); margin: 0 auto; padding: 20px;'
    }
    else
    {
        document.getElementById('t_b').style = 'max-width:'+ main_width +'; height:'+ window.screen.availHeight*0.6 +'px; border-radius:8px; background-color: rgb(250, 250, 250, 0.8); margin: 0 auto; padding: 20px;'
    }    
    chrome.runtime.sendMessage(
        { action: "aiRegnerate", listing_title: title, listing_bullet: bullets },
        function(request)
        {
            document.getElementById('gptRspTitle').innerHTML = request.messages
            console.log('request>>>>>>>>>>>>>>>>>>>>>',request)
        }
    )
}
function closed()
{
    document.getElementById('t_b_bg').style.display = 'none'
}

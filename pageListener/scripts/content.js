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
        a_i_regnerate_module_div.style = 'display: none; position: fixed; z-index:1000; width: 100%; height: 100%; padding-top:'+ (window.screen.availHeight*0.5-window.screen.availHeight*0.6*0.76) +'px; background-color: rgb(0, 0, 0, 0.6);'
    }
    else
    {
        a_i_regnerate_module_div.style = 'display: none; position: fixed; z-index:1000; width: 100%; height: 100%; padding-top:'+ (window.screen.availHeight*0.5-window.screen.availHeight*0.6*0.6) +'px; background-color: rgb(0, 0, 0, 0.6);'
    }
    a_i_regnerate_module_div.id = 't_b_bg'
    a_i_regnerate_module_div.innerHTML = `
    // <style>
    //     .hi{
    //         font-size: 18px;
    //         color: #333;
    //     }
    // </style>
    <div id="t_b">
        <div style="display: flex; justify-content: space-between;">
            <div><h1 class="hi">LittleKris TEST</h1></div>
            <div><h1 id="closed">X</h1></div>
        </div>
        <div style="display: flex; justify-content: space-between; height:90%; border-radius:8px; background-color: rgb(250, 250, 250, 0.8); overflow: hidden; overflow-y: scroll;">
            <div id="bullets" style="width:33%; height: auto; padding: 10px;">
                <div><h3 style="height: 30px;">Before</h3></div>
                <div><h5>Title</h5></div>
                <div></div>
                <div><h5>BulletPoint</h5></div>
                <div></div>
            </div>
            <div style="width:33%; height: auto; padding: 10px;">
                <div><h3 style="height: 30px;">A.I.Upgrade</h3></div>
                <div><h5>Title</h5></div>
                <div id="gptRspTitle"><p>GPT-2</p></div>
                <div><h5>BulletPoint</h5></div>
                <div id="gptRspBullet"></div>
            </div>
            <div style="width:33%; height: auto; padding: 10px;">
                <div><h3 style="height: 30px;">GPT-Regnerate</h3></div>
                <div><h5>Title</h5></div>
                <div><p>GPT-2</p></div>
                <div><h5>BulletPoint</h5></div>
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
    const bullets_tag = doc.getElementById('feature-bullets').getElementsByTagName('li')
    // console.log('.children', bullets_tag)
    const title = doc.getElementById('productTitle').innerText
    const bullets = []
    const bullets_html = []
    for(i=0; i<bullets_tag.length; i++)
    {
        // bullets.push(doc.getElementById('feature-bullets').children[2].children[i].innerText)
        const bullet = bullets_tag[i].innerText
        const bullet_html = '<p style="font-size:14px; line-height: 18px;">*' + bullets_tag[i].innerText +'</p>'
        // console.log('???',tagP)
        bullets.push(bullet)
        bullets_html.push(bullet_html)
    }
    // console.log('bullets', typeof bullets, bullets)
    document.getElementById('bullets').children[2].innerHTML = '<h1 style="font-size: 16px; line-height: 18px; margin-bottom: 15px;">' + title + '</h1>'
    document.getElementById('bullets').children[4].innerHTML = bullets_html.join('')
    console.log('bullets:///',bullets)

    const main_width = window.getComputedStyle(dp)['max-width']
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
        { action: "aiRegnerate", listing_title: title, listing_bullets: bullets },
        function(request)
        {
            document.getElementById('gptRspTitle').innerHTML = '<h1 style="font-size: 16px; line-height: 18px; margin-bottom: 15px;">' + request.title + '</h1>'
            const rsp_bullets_html = []
            for(i=0; i<request.bullets.length; i++)
            {
                // bullets.push(doc.getElementById('feature-bullets').children[2].children[i].innerText)
                const rsp_bullet_html = '<p style="font-size:14px; line-height: 18px;">*' + request.bullets[i] +'</p>'
                rsp_bullets_html.push(rsp_bullet_html)
            }
            document.getElementById('gptRspBullet').innerHTML = rsp_bullets_html.join('')
            console.log('request>>>',request)
            // console.log('request>>>',JSON.parse(request))
        }
    )
}
function closed()
{
    document.getElementById('t_b_bg').style.display = 'none'
}

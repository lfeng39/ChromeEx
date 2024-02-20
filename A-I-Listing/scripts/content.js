chrome.runtime.onMessage.addListener(function(request, sender, response)
{
    // create ai trigger module
    const littl_kris_module = document.getElementById('dp-container').children[0]
    // const littl_kris_module = document.getElementById('rightCol')
    const a_i_regnerate_module = document.getElementById('a-page')
    const littl_kris_module_div = document.createElement('div')
    const a_i_regnerate_module_div = document.createElement('div')
    littl_kris_module_div.style = 'width: 100%; min-height: 50px; border-radius:8px; border:1px solid #f5f5f5; background-color: #fcfcfc; margin: 18px 0';
    littl_kris_module_div.innerHTML = `
    <div style="text-align: center; margin: 10px; padding: 10px;">
        <div style="text-align: center; margin: 0 auto; align-items: center; width:200px; display: flex;">
            <div style="margin-right: 10px;"><img width="30" height="30" src="http://i.giphy.com/3og0ISeflb7vrNzy2A.gif""></div>
            <div><h1>A.I.Listing</h1></div>
        </div>
        <button id="ai_btn" style="width:200px; height: 35px; border-radius:8px;">A.I.Regnerate Title & Bullet</button>
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

    // const img_LK = chrome.runtime.getURL('images/L.K.png')

    a_i_regnerate_module_div.id = 'littleKris_t_b_bg'
    a_i_regnerate_module_div.innerHTML = `
        <div id="littleKris_t_b">
            <div style="height: 50px; display: flex; justify-content: space-between;">
                <div style="width: 50%;  display: flex;">
                    <div style="margin-right: 20px;"><h1>A.I.Listing</h1></div>
                    <!--div style="margin-right: 20px;"><h1>TEST</h1></div-->
                </div>
                <div><h1 id="closed">X</h1></div>
            </div>
            <div style="display: flex; justify-content: space-between; height:90%; border-radius:8px; background-color: rgb(250, 250, 250, 0.8); overflow: hidden; overflow-y: scroll;">
                <div id="bullets" style="width:50%; height: auto; padding: 10px;">
                    <div><h3 style="height: 30px;">Current</h3></div>
                    <div><h5>Title</h5></div>
                    <div></div>
                    <div><h5>BulletPoints</h5></div>
                    <div></div>
                </div>
                <div style="width:50%; height: auto; padding: 10px;">
                    <div><h3 style="height: 30px;">A.I.Upgrade</h3></div>
                    <div><h5>Title</h5></div>
                    <div id="gptRspTitle" style="min-height: 72px;"><img width="50" height="50" src="http://i.giphy.com/3og0ISeflb7vrNzy2A.gif" style="margin-bottom: 10px;"></div>
                    <div><h5>BulletPoints</h5></div>
                    <div id="gptRspBullet"><img width="50" height="50" src="http://i.giphy.com/3og0ISeflb7vrNzy2A.gif"></div>
                </div>
            </div>
        </div>
        `
    // document.addEventListener('DOMContentLoaded', function () {littl_kris_module.insertAdjacentElement('beforebegin', littl_kris_module_div)})
    littl_kris_module.insertAdjacentElement('beforebegin', littl_kris_module_div)
    a_i_regnerate_module.insertAdjacentElement('beforebegin', a_i_regnerate_module_div)
    document.getElementById('ai_btn').onclick = aiRegnerate
    document.getElementById('closed').onclick = closed
    document.getElementById('closed').style.cursor = 'pointer'
})

function aiRegnerate()
{

    const pageHTML = document.documentElement.outerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(pageHTML, 'text/html');

    const title = doc.getElementById('productTitle').innerText
    
    
    function getBullets()
    {
        const bullets_tag_ul = doc.getElementById('feature-bullets')
        if(bullets_tag_ul)
        {
            const bullets_tag_li = bullets_tag_ul.getElementsByTagName('li')
            const bullets_txt = []
            const bullets_html = []
            for(i=0; i<bullets_tag_li.length; i++)
            {
                const bullet = bullets_tag_li[i].innerText
                const bullet_html = '<p style="font-size:14px; line-height: 18px;">* ' + bullet +'</p>'
                bullets_txt.push(bullet)
                bullets_html.push(bullet_html)
            }

            return [bullets_txt, bullets_html]
        }
        else
        {
            const bullets_tag_ul = doc.getElementsByClassName('a-unordered-list a-vertical a-spacing-small')
            const bullets_txt = []
            const bullets_html = []
            for(i=0; i<bullets_tag_ul.length; i++)
            {
                const bullet = bullets_tag_ul[i].innerText
                const bullet_html = '<p style="font-size:14px; line-height: 18px;">* ' + bullet +'</p>'
                bullets_txt.push(bullet)
                bullets_html.push(bullet_html)
            }

            return [bullets_txt, bullets_html]
        }
    }

    document.getElementById('bullets').children[2].innerHTML = '<h1 style="font-size: 16px; line-height: 18px; margin-bottom: 15px; min-height: 72px;">' + title + '</h1>'
    document.getElementById('bullets').children[4].innerHTML = getBullets()[1].join('')

    const main_width = window.getComputedStyle(dp)['max-width']
    document.getElementById('littleKris_t_b_bg').style.display = ''
    // main_dp_width value for ai module
    if(window.screen.availHeight < 1000)
    {
        document.getElementById('littleKris_t_b').style = 'max-width:'+ main_width +'; height:'+ window.screen.availHeight*0.8 +'px; border-radius:8px; background-color: rgb(250, 250, 250, 0.8); margin: 0 auto; padding: 20px;'
    }
    else
    {
        document.getElementById('littleKris_t_b').style = 'max-width:'+ main_width +'; height:'+ window.screen.availHeight*0.6 +'px; border-radius:8px; background-color: rgb(250, 250, 250, 0.8); margin: 0 auto; padding: 20px;'
    }    
    chrome.runtime.sendMessage(
        { action: "aiRegnerate", listing_title: title, listing_bullets: getBullets()[0] },
        function(request)
        {
            // const request = JSON.parse(request)
            document.getElementById('gptRspTitle').innerHTML = '<h1 style="font-size: 16px; line-height: 18px; margin-bottom: 15px; min-height: 72px;">' + request.title + '</h1>'
            const rsp_bullets_html = []
            for(i=0; i<request.bullets.length; i++)
            {
                // bullets.push(doc.getElementById('feature-bullets').children[2].children[i].innerText)
                const rsp_bullet_html = '<p style="font-size:14px; line-height: 18px;">* ' + request.bullets[i] +'</p>'
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
    document.getElementById('littleKris_t_b_bg').style.display = 'none'
}

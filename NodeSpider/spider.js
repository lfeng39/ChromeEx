const https = require('https')
const cheerio = require('cheerio')
const zlib = require('zlib')
// let server = https.createServer(gptSer)
// server.listen(8080)

const getURL = 'https://www.amazon.com/dp/B0CQK8W3ZL'
// const getURL = 'https://movie.douban.com/top250'

const getOptions = {
    'method': 'GET',
    'authority': 'www.amazon.com',
    'path': '/dp/B0CQK8W3ZL',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    // 'scheme': 'https',
    // 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    // 'accept-encoding': 'gzip, deflate, br',
    // 'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
    // 'cache-control': 'max-age=0',
    // 'cookie': 'session-id=135-2740894-7597127; i18n-prefs=USD; ubid-main=130-8094137-1673046; lc-main=en_US; skin=noskin; session-id-time=2082787201l; kndctr_7742037254C95E840A4C98A6_AdobeOrg_identity=CiYwNTgzMDk3NzIzNzM3MTI4NjMyNDE2NTEyNTYwNjM1MTUxMDM4NVIRCJyt9tjSMRgBKgRTR1AzMAHwAZyt9tjSMQ==; AMCV_7742037254C95E840A4C98A6%40AdobeOrg=MCMID|05830977237371286324165125606351510385; JSESSIONID=BE4328E0B83A1B1656FACDCF55DE592A; csm-hit=tb:YHB13XZ5TBTSKGNG06P7+s-4SMSTCWET8342QXK4G82|1707113236506&t:1707113236506&adb:adblk_no; session-token=ESIxRUw6l2sUSPYFQm2KvVDcwmImIV98l3zY9LUZgLy/vzmyik+X9otGDi5eJp92GcrFHQG18FxTzb4mbFclfW+bVGJhHCAuqkkh5oULg/ap+4Gy01co60y27fzCGfyeDOer0fSu1n5oc8lXWQuphYNhrhxm6GDv2tRAIKvkUNXs5gv/t0SYP1iKlZrzmCdm1qYxTspsZORdH2meuwERKIKN5UIBjwJcQrL1HXIaAdW3+1Hyz5g5/F8ezMBnVdq67MxSmu3J0en447F9FgMa5ZWQLPR44vAzL48NorBO7pjbWbTqyAPxIN5VyTO4L3RiHyZ3jz/px06bcd/WuBybNVfccoZ/Jw9a',
    
}

https.get(getOptions, function(rsp){
    let html = '';
    let chunks = [];
    rsp.setEncoding('utf8')

    const contentEncoding = rsp.headers['content-encoding'];
    console.log(contentEncoding)

    rsp.on('data',function(chunk){
        // html += chunk;
        chunks.push(chunk);
    })

    rsp.on('end',function(){
        // if (contentEncoding === 'gzip') {
        //     const buffer = Buffer.concat(chunks);
        //     html = zlib.gunzipSync(buffer).toString('utf8');
        // } else {
        //     html = chunks.join('');
        // }

        // console.log(html)
        // const $ = cheerio.load(html)
        // let allFilms = []

        // const title = $('.a-list-item').text()
        // // const star = html('.rating_num').text()
        // console.log(title)

        // for(i=0; i<title.split('/').length; i++)
        // {
        //     console.log(i+1,')',title.split('/')[i])
        // }
        // $('li .item').each(function(){
        //     // this 循环时 指向当前这个电影
        //     // 当前这个电影下面的title
        //     // 相当于this.querySelector 
        //     const title = $('.title').text()
        //     const star = $('.rating_num',this).text()
        //     // const pic = $('.pic img',this).attr('src')
        //     // console.log(title.split('/'),title.split('/').length)
        //     // console.log(star)
        //     // console.log('\n')
        //     // for(i=0; i<title.split('/').length; i++)
        //     // {
        //     //     console.log(title.split('/')[i])
        //     // }
        //     // 存 数据库
        //     // 没有数据库存成一个json文件 fs
        //     // allFilms.push({
        //     //     title,star,pic
        // })
    })
})


// res.on('end',function(){})

// const axios = require('axios');

// async function fetchData(url) {
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// const url = 'https://movie.douban.com/top250';
// fetchData(url).then(data => console.log(data));

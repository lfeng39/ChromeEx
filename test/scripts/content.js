// alert('test content.js')
// console.log('test content.js')

chrome.runtime.onMessage.addListener(
    function received(received)
    {
        alert('received.title+received.url')
        console.log(received.title)
    }
)
// import {franc, francAll} from 'franc'
// window.addEventListener
// (
//     'mouseup',
//     function pageTxt(event)
//     {
        

//         // const ttt = require('franc')
//         // const tol = 'English'
//         const prompt = '窗前明月光 作者是谁 全文内容 以及还有别的版本吗'
//         const ifLan = franc(prompt, {minLength: 3})
//         console.log(prompt, '是：', ifLan)
//         this.alert(prompt, '是：', ifLan)
//     }
// )


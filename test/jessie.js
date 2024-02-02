// const add = require('../lfeng.js')

import {franc, francAll} from 'franc'

// const ttt = require('franc')
// const tol = 'English'
const prompt = '窗前明月光 作者是谁 全文内容 以及还有别的版本吗'
const ifLan = franc(prompt, {minLength: 3})
console.log(prompt, '是：', ifLan)
// alert(prompt + '是：' + ifLan)
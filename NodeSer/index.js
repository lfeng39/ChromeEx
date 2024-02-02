// const a = 39
// const b = 21
// console.log('run success',a*b)


// import { franc, francAll } from "franc"
// const lan = franc('the', {minLength: 3})
// console.log(lan)


const http = require('http');
const data = {content: 'como on'}
let server = http.createServer(function (request, response)
    {
        response.write(data)
        response.end()
    }
)
server.listen(8080)
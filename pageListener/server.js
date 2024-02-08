const http = require('http')
let server = http.createServer(serTest)
server.listen(8080)

// const data = {
//     post: 'post',
//     rsp: 'lfeng39'
// }


function serTest(request, response) {
    let data = ''
    request.on('data', (chunk) => {
        data += chunk;
        // console.log('Received data:', JSON.parse(chunk));
        // response.end(chunk);
    });

    // openai.api_key = j21_api_key
    // test = openai.chat.completions.create(
    //     model="gpt-3.5-turbo",
    //     messages=[{"role": "user", "content": promte}],
    //     max_tokens=60
    // )

    // print(test.choices[0].message.content)

    request.on('end', () => {
        console.log('Received data:', data);
        // response.setHeader('Content-Type', 'application/json')
        // response.end(JSON.stringify(data));
        response.end(data)
    });
    // let url = request.url
    // response.setHeader('Content-Type', 'application/json')
    // console.log(request.on('request'))
    // response.write(JSON.stringify(data))

}
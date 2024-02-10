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
    const content = "Title: Be Inspired and Energized with the BAGSMART Small Gym Bag for Women - Your Perfect Companion for Fitness and Adventure! Bullet Points: @ Elevate Your Gym Experience: Unleash your full potential with our versatile sports duffle bag designed to cater to all your storage needs. Embrace the power of organization and enjoy easy access to your essentials. Whether it's yoga, gym sessions, or weekend getaways, this bag has got you covered! @ Embrace Exciting Journeys: Step into a world of limitless possibilities with the BAGSMART Workout Bag. Offering ample space with its wide bottom design, it effortlessly accommodates everything you need before and after your training sessions. Bid farewell to clutter and embrace a streamlined lifestyle. @ Stay Fresh and Stylish: Say goodbye to unpleasant odors and soggy clothes! Our bag features a separate shoe compartment that not only maintains ventilation but also keeps sweaty items apart. Additionally, it conveniently fits a 32 oz water bottle, ensuring hydration is always at your fingertips. @ Unyielding Durability: Crafted with high-density durable polyester cloth materials, the BAGSMART Workout Bag is your reliable partner in conquering rigorous gym routines. With premium zippers and reinforced stitching on the padded shoulder strap, it is built to withstand any challenge, providing longevity and hassle-free use. @ A Customer-Oriented Promise: At BAGSMART, we are committed to your satisfaction. We strive to deliver the utmost quality, and your happiness is our top priority. In the rare event of any quality concerns, we offer an unconditional refund or replacement. Contact us without hesitation and experience our exceptional after-sales service. Note: The byte limit for the bullet points is quite strict, so I had to condense the information while maintaining an inspirational tone."
    const testdata = JSON.stringify({
        obj: 'gpt',
        choices: [
        {
            index: 0,
            message:
            {
                role: 'assistant',
                content: content
            }
        }]
    })

    request.on('end', () => {
        console.log('Received data:', data)
        console.log('data type:', typeof(data))
        console.log('\n')
        console.log('test data:', testdata)
        response.setHeader('Content-Type', 'application/json')
        // response.end(JSON.stringify(data))
        response.end(testdata)
    });
    // let url = request.url
    // response.setHeader('Content-Type', 'application/json')
    // console.log(request.on('request'))
    // response.write(JSON.stringify(data))

}
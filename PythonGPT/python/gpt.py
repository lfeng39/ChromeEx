from openai import OpenAI
import openai
l39_api_key = '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'
# j21_api_key = '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'
j21_api_key = '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'


# client = OpenAI(
#   organization='org-rddDZuCDVt67fXKoKIwK9dH3',
# )

# msg = input('')

# # promte = '请用中文讲解下面的内容：' + '白日依山尽'
# # print('1')
# # print('getWhat:', promte)
# openai.api_key = j21_api_key
# test = openai.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[{"role": "user", "content": msg}],
#     # max_tokens=60
# )

# print(test.choices[0].message)



from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/python/gpt', methods=['POST'])

def gptRsp():
    try:
        # data_from_js = request.form.get('messages')
        data_from_js = request.json['messages']
        promte = '请用中文介绍下面的内容：' + data_from_js
        print('1')
        print('getWhat:', promte)
        openai.api_key = j21_api_key
        test = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": promte}],
            # max_tokens=60
        )

        print(test.choices[0].message.content)
        print('2')
        return jsonify({"content": data_from_js, "gptRsp": test.choices[0].message.content})
    except Exception as e:
        app.logger.error(f"Exception on /python/language [POST]: {str(e)}")
        
        # 返回一个包含错误信息的 JSON 响应，状态码为 400
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run()
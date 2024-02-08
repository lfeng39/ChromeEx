import langdetect
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/python/language', methods=['POST'])

def gLan():
    try:
        # data_from_js = request.form.get('messages')
        data_from_js = request.json['messages']

        detectedLanguage = langdetect.detect(data_from_js)

        print('getWhat:', detectedLanguage)
        # print('Detected language:', detectedLanguage)

        return jsonify({"content": data_from_js, 'lan': detectedLanguage})
    except Exception as e:
        app.logger.error(f"Exception on /python/language [POST]: {str(e)}")
        
        # 返回一个包含错误信息的 JSON 响应，状态码为 400
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run()

# @app.route('/')
# def hello():
#     return 'Hello, World!'

# if __name__ == '__main__':
#     app.run()
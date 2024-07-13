# The flask framework was used 
# To install flask the following was ran on CLI: `pip install flask`

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
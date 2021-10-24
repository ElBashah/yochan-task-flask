from flask import Flask
from flask import request
from markupsafe import Markup

app = Flask(__name__)

def Button(width, text):
    return Markup('<input style="width:{}rem" type="button" class="button" value="{}" />'.format(width, text))

def TextBox(id):
    return Markup(' <div class="text-box"> <input class="text-box-inner" type="text" id="{}" /></div>'.format(id))

def LoginPage():
    res = '<div class="login-container">'
    res += '<div style="flex-direction: row;"> <div style="font-size: 20px;">Email: </div>'
    res += '{}</div>'.format(TextBox("email"))
    res += '<div style=" flex-direction: row; margin-top: 1rem;"> <div style="font-size: 20px;">Name: </div>'
    res += '{}</div>'.format(TextBox("username"))
    res += '<div style="margin-top: 1rem;">'
    res += '{}</div></div>'.format(Button(8, "Login"))
    return Markup(res)

html = "<html>"
html += '<head> <link rel= "stylesheet" type= "text/css" href= "./static/styles/App.css"> </head>'
html += '<body class="">{}'.format(LoginPage())
html += '</body>'
html += "</html>"

@app.route('/')
def main():
    return Markup(html)



        
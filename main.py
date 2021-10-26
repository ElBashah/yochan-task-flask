from flask import Flask , redirect, url_for, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
# Ini
from flask import request, render_template
from markupsafe import Markup
import datetime

app = Flask(__name__)

# Firebase init
cred = credentials.Certificate('firebaseConfig.json')
default_app = initialize_app(cred)
db = firestore.client()
feedbacks_ref = db.collection('feedbacks')

def Button(width, text, click):
    return Markup('<button style="width:{}rem" type="button" class="button" value="{}" onclick="window.location.href=" url_for( "page2") " > TEST <button/>'.format(width, text))

def TextBox(id):
    return Markup(' <div class="text-box"> <input class="text-box-inner" type="text" id="{}" /></div>'.format(id))

def LoginPage():
    res = '<div class="login-container">'
    res += '<div style="flex-direction: row;"> <div style="font-size: 20px;">Email: </div>'
    res += '{}</div>'.format(TextBox("email"))
    res += '<div style=" flex-direction: row; margin-top: 1rem;"> <div style="font-size: 20px;">Name: </div>'
    res += '{}</div>'.format(TextBox("username"))
    res += '<div style="margin-top: 1rem;">'
    res += '{}</div></div>'.format(Button(8, "Login", ""))
    return Markup(res)

html = "<html>"
html += '<head> <link rel= "stylesheet" type= "text/css" href= "./static/styles/App.css"> </head>'
html += '<body class="">{}'.format(LoginPage())
html += '</body>'
html += "</html>"

home = '<svg stroke="currentColor" fill="currentColor" stroke-width="0"'
home += 'viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"> '
home += '<path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z">'
home += '</path> </svg>'

robot = '<svg stroke="currentColor" fill="currentColor" stroke-width="0"'
robot += 'viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">'
robot += '<path d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z">'
robot += '</path></svg>'

feedback = {'c1': 0, 'c2': 0, 'c3': 0, 'c4': 0, 'c5': 3, 'c6': 0, 'c7': 0, 'current': 1, 'previous': 1 }
user = {'name': "Turki", 'email': ""}

@app.route('/next', methods = ['GET'])
def next():
    return redirect(url_for('page2', opr='next', state=feedback['current']))

@app.route('/back', methods = ['GET'])
def back():
    return redirect(url_for('page2', opr='back', state=feedback['current']))

@app.route('/add', methods = ['GET'])
def add():
    return redirect(url_for('page2', opr='add', state=feedback['current']))

@app.route('/sub', methods = ['GET'])
def sub():
    return redirect(url_for('page2', opr='sub', state=feedback['current']))

def getState(state):
    if state == 7 and state != feedback['current']:
        return Markup(home)

    elif state == feedback['current']:
        return Markup(robot)
    
    else:
        return Markup('<div>&nbsp;</div>')


@app.route('/page2',  methods=['POST', 'GET'])
def page2():

    if request.method == 'POST':
        user['email'] = request.form['email']
        user['name'] = request.form['name']

    opr = request.args.get('opr')
    if opr == 'next':
        state = int(request.args.get('state'))
        feedback['previous'] = state
        if state > 0 and state < 7:
            state += 1
            feedback['current'] = state

    elif opr == 'back':
        state = int(request.args.get('state'))
        feedback['previous'] = state
        if state > 1 and state < 7:
            state -= 1
            feedback['current'] = state

    elif opr == 'add' or opr == 'sub':
        if feedback['previous'] == feedback['current']:
            if opr == 'add':
                feedback['c' + str(feedback['current'])] += 1
            else:
                feedback['c' + str(feedback['current'])] -= 1
        else:
            if opr == 'add':
                feedback['c' + str(feedback['current'])] = 1
                feedback['previous'] = feedback['current']
            else:
                feedback['c' + str(feedback['current'])] = -1
                feedback['previous'] = feedback['current']
        
    return render_template('page2.html', getState=getState, next=next, current_state=feedback['current'], url_for=url_for)


@app.route('/page3')
def page3():

    # Uploading to firestore
    ref = feedbacks_ref.document()
    ref.set({'feedback_id': ref.id, 'date': datetime.datetime.now(), 'name': user['name'], 'c1': feedback['c1'], 'c2': feedback['c2'], 'c3': feedback['c3'], 'c4': feedback['c4'], 'c5': feedback['c5'], 'c6': feedback['c6'], 'c7': feedback['c7'], 'email': user['email']})

    # Reading back the document just uploaded
    feedback_id = ref.id
    feedback_doc = feedbacks_ref.document(feedback_id).get()
    feedback_data = feedback_doc.to_dict()

    return render_template('page3.html', feedback=feedback_data)

@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('page1'))


@app.route('/page1')
def page1():
    return render_template('login.html', add=add, url_for=url_for)

@app.route('/')
def main():
    print(app)
    return redirect(url_for('page1'))


if __name__ == '__main__':
    app.run(host='localhost', port=5055)

        
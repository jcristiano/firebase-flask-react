import firebase_admin
from firebase_admin import db
import flask
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app, origins='http://localhost:3000')


firebase_admin.initialize_app(options={
    'databaseURL': 'https://prova-ic-default-rtdb.firebaseio.com'
})

PROVAIC = db.reference('/')

@app.route('/list', methods=['GET'])
def listAll():
    return PROVAIC.get()

if __name__ == '__main__':
    app.run(debug=True)

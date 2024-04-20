from flask import Flask
from flask_cors import CORS
from database import db

app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://project_user:project_password@postgres/project_database'
db.init_app(app)


from routes.person_router import person_router
from routes.assignment_router import assignment_router
from routes.task_router import task_router

app.register_blueprint(person_router)
app.register_blueprint(assignment_router)
app.register_blueprint(task_router)






if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0")
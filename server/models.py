from database import db

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), unique=True, nullable=False)
    def serialize(self):
        return {
            'id': self.id,
            'full_name': self.full_name
        }

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    deadline = db.Column(db.DateTime)
    notes = db.Column(db.Text)
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'deadline': self.deadline.strftime('%Y-%m-%d %H:%M:%S') if self.deadline else None,
            'notes': self.notes
        }

class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    person = db.relationship('Person', backref='assignments')
    task = db.relationship('Task', backref='assignments')
    def serialize(self):
        return {
            'id': self.id,
            'person': self.person.serialize(),
            'task': self.task.serialize()
        }
    

    

# --------------------------------------------------------------------------------------------- INITIAL DATA

from sqlalchemy import event
from sqlalchemy.sql import insert

def add_initial_data(con):
    con.execute(insert(Person.__table__).values(full_name="Joe Smith"))
    con.execute(insert(Person.__table__).values(full_name="Charles Brown"))
    con.execute(insert(Person.__table__).values(full_name="Anne Williams"))
    con.execute(insert(Person.__table__).values(full_name="Mia Jones"))
    con.execute(insert(Task.__table__).values(title="Fix the login form", notes="Last name validator is broken and needs to be fixed."))
    con.execute(insert(Task.__table__).values(title="Add global chat", notes="We need to implement websockets for the chat to work."))
    con.execute(insert(Assignment.__table__).values(person_id=1, task_id=1))

@event.listens_for(Assignment.__table__, 'after_create')
def receive_after_create(t, connection, **kw):
    add_initial_data(connection)

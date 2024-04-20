from flask import Blueprint, jsonify, abort
from models import Person

person_router = Blueprint('person_router', __name__)

@person_router.route('/persons', methods=['GET'])
def get_all():
    persons = Person.query.all()
    return jsonify([person.serialize() for person in persons])

@person_router.route('/persons/<int:id>', methods=['GET'])
def get_one(id):
    person = Person.query.get(id)
    if person is None:
        abort(404)
    return jsonify(person.serialize())
from flask import Blueprint, jsonify, abort
from models import Assignment

assignment_router = Blueprint('assignment_router', __name__)

@assignment_router.route('/assignments', methods=['GET'])
def get_all():
    assigments = Assignment.query.all()
    return jsonify([assigment.serialize() for assigment in assigments])
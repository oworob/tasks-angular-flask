from flask import Blueprint, jsonify, abort
from models import Task

task_router = Blueprint('task_router', __name__)

@task_router.route('/tasks', methods=['GET'])
def get_all():
    tasks = Task.query.all()
    return jsonify([task.serialize() for task in tasks])
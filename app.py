"""Main app module."""
from flask import Flask, jsonify
from flask_restplus import Api

from api.models import db

try:
    from .config import configuration
except ImportError:
    from config import configuration


# initilize api
api = Api(
    default='Api',
    default_label="Available Endpoints",
    title='🗣️ Open-Platform Api 😱',
    version='1.0',
    description="""Open-Platform Api Endpoint Documentation 📚""")


def create_app(enviroment="Development"):
    """Factory Method that creates an instance of the app with the given config.

    Args:
        enviroment (str): Specify the configuration to initilize app with.
    Returns:
        app (Flask): it returns an instance of Flask.
    """
    app = Flask(__name__)
    app.config.from_object(configuration[enviroment])
    db.init_app(app)

    # all urls/routes should be configured/added here
    from api.points_endpoint import PointResource
    api.add_resource(PointResource, '/points/')

    # initialize api after adding routes
    api.init_app(app)

    # handle default 404 exceptions with a custom response
    @app.errorhandler(404)
    def resource_not_found(error):
        response = jsonify(dict(
            error='Not found',
            message='The requested URL was not found on the server.'))
        response.status_code = 404
        return response

    # handle default 500 exceptions with a custom response
    @app.errorhandler(500)
    def internal_server_error(error):
        response = jsonify(dict(
            error='Internal server error',
            message="The server encountered an internal error."))
        response.status_code = 500
        return response

    return app

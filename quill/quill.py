# -*- coding: utf-8 -*-
from flask import Blueprint, Flask
from inkwell.inkwell import api

def bootstrap(configuration=None):
    """ A factory that creates an instance of the Quill server. This allows
    one create multiple instances running different configurations
    simultaneously.

    Arguments::
        configuration `object or None` A configuration object for the resulting
        instance of Inkwell.

    Returns::
        An instance of an Inkwell server.
    """
    app = Flask(__name__)

    @app.route('/')
    def index():
        return 'hi'

    app.config.from_object(configuration or 'inkwell.config.LocalConfig')
    app.register_blueprint(api)

    return app
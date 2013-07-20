# -*- coding: utf-8 -*-
import os
from flask import Blueprint, Flask, render_template
from inkwell.inkwell import api

def bootstrap(configuration=None):
    """ A factory that creates an instance of the Quill server. This allows
    one create multiple instances running different configurations
    simultaneously.

    Arguments::
        configuration `object or None` A configuration object for the resulting
        instance of Quill.

    Returns::
        An instance of an Quill server.
    """
    app = Flask(__name__)

    @app.route('/')
    def index():
        return render_template('layout.html')

    app.config.from_object(configuration or 'config.LocalConfig')
    app.register_blueprint(api)

    return app

app = bootstrap(os.environ.get('QUILL_CONFIG_MODULE', None))

if __name__ == '__main__':
    print "{} running in {} on port {}...".format(
          app.config['THEME']
        , app.config['ENVIRONMENT']
        , app.config['PORT']
    )

    app.run(
          host=app.config['HOST']
        , port=app.config['PORT']
        , debug=app.config['DEBUG']
    )
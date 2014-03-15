# -*- coding: utf-8 -*-
import os
from flask import Flask, render_template
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
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        variable_start_string='<%',
        variable_end_string='%>'
    ))

    Flask.jinja_options = jinja_options

    app = Flask(__name__, template_folder='static/html')

    @app.route('/')
    @app.route('/<int:year>')
    @app.route('/<int:year>/<int:month>')
    @app.route('/<int:year>/<int:month>/<int:day>')
    @app.route('/<int:year>/<int:month>/<int:day>/<title>')
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
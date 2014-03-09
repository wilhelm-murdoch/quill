# -*- coding: utf-8 -*-
import os
from flask import Blueprint, Flask, render_template
from flask.ext.assets import Environment, Bundle
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
    @app.route('/<int:year>')
    @app.route('/<int:year>/<int:month>')
    @app.route('/<int:year>/<int:month>/<int:day>')
    @app.route('/<int:year>/<int:month>/<int:day>/<title>')
    def index(year=None, month=None, day=None, title=None):
        return render_template('layout.html')

    app.config.from_object(configuration or 'config.LocalConfig')
    app.register_blueprint(api)

    # Automatically add all static css and javascript assets. This allows them
    # to be minified, combined and compressed in production mode and included
    # in development mode.
    assets = Environment(app)

    assets.debug = app.config['DEBUG'] or False

    assets.register('js', Bundle(
          'js/jquery.min.js'
        , 'js/moment.min.js'
        , 'js/underscore.min.js'
        , 'js/angular.min.js'
        , 'js/angular-resource.js'
        , 'js/app/app.js'
        , 'js/app/controllers.js'
        , 'js/app/directives.js'
        , 'js/app/factories.js'
        , 'js/app/services.js'
        , filters='jsmin'
        , output='js/assets.js'
    ))

    assets.register('css', Bundle(
          'css/normalize.css'
        , 'css/screen.css'
        , filters='cssmin'
        , output='css/assets.css'
    ))

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
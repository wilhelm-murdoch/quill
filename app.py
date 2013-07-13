# -*- coding: utf-8 -*-
import os
from quill import quill

app = quill.bootstrap('inkwell.config.LocalConfig')

if __name__ == '__main__':
    print "Quill running in {0} ...".format(app.config['ENVIRONMENT'])
    app.run(
          host=app.config['HOST']
        , port=app.config['PORT']
        , debug=app.config['DEBUG']
    )
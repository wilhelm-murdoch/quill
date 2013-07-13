# -*- coding: utf-8 -*-
import os
from quill import quill

app = quill.bootstrap(os.environ.get('QUILL_CONFIG_MODULE', None))

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
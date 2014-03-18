run:
	env QUILL_CONFIG_MODULE=config.LocalConfig python app.py

gunicorn:
	gunicorn app:app

install:
	npm install
	bower install
	pip install -U -r requirements.txt

clean:
	find . -name \*.pyc -exec rm {\} \; ; rm -rf src/ static/.bower node_modules/ build/ dist/ *.egg-info *.egg
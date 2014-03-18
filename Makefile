run:
	env QUILL_CONFIG_MODULE=config.LocalConfig python app.py

gunicorn:
	gunicorn app:app

install:
	pip install -U -r requirements.txt

clean:
	find . -name \*.pyc -exec rm {\} \; ; rm -rf node_modules/ build/ dist/ *.egg-info *.egg
run:
	env QUILL_CONFIG_MODULE=quill.config.LocalConfig python app.py

install:
	pip install -U -r requirements.txt

clean:
	find . -name \*.pyc -exec rm {\} \; ; rm -rf build/ dist/ *.egg-info *.egg
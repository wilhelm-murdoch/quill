# -*- coding: utf-8 -*-
from inkwell import Config

class LocalConfig(Config):
    PORT = 8080
    THEME = 'Quill'
    SITE_TITLE = 'Quill'
    SITE_DESCRIPTION = ''

class TestConfig(LocalConfig):
    TESTING = True
    ENVIRONMENT = 'testing'

class ProductionConfig(LocalConfig):
    DEBUG = False
    ENVIRONMENT = 'production'

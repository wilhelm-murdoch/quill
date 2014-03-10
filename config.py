# -*- coding: utf-8 -*-
from inkwell import Config

class LocalConfig(Config):
    PORT = 8080
    THEME = 'Quill'
    SITE_TITLE = 'devilmayco.de'
    SITE_DESCRIPTION = 'just a blogging platform.'
    ARTICLES_FOLDER = '../inkwell-pokedex/articles'
    AUTHOR = 'devilmayco.de'
    PER_PAGE = 5
    DISQUS = 'thedrunkenepic'

class TestConfig(LocalConfig):
    TESTING = True
    ENVIRONMENT = 'testing'

class ProductionConfig(LocalConfig):
    DEBUG = False
    ENVIRONMENT = 'production'

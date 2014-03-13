# -*- coding: utf-8 -*-
from inkwell.config import Config

class LocalConfig(Config):
    PORT = 8080
    THEME = 'Vapor'
    SITE_TITLE = 'My Inkwell Site'
    SITE_DESCRIPTION = 'A teensy blog powered by Inkwell.'
    ARTICLES_FOLDER = 'articles'
    AUTHOR_NAME = 'Wilhelm Murdoch'
    AUTHOR_AVATAR = ''
    AUTHOR_BIO = ''
    PER_PAGE = 5
    DISQUS = None

class TestConfig(LocalConfig):
    TESTING = True
    ENVIRONMENT = 'testing'

class ProductionConfig(LocalConfig):
    DEBUG = False
    ENVIRONMENT = 'production'

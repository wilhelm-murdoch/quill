# -*- coding: utf-8 -*-
from inkwell.config import Config

class LocalConfig(Config):
    PORT = 8080
    THEME = 'Inkwell - Vapor'
    SITE_TITLE = 'devilmayco.de'
    SITE_DESCRIPTION = 'Drunken ramblings from a code monkey'
    ARTICLES_FOLDER = 'articles'
    AUTHOR_NAME = 'Wilhelm Murdoch'
    AUTHOR_AVATAR = 'http://www.gravatar.com/avatar/cbb57ea48be31179eabc9a79c524ad5b.png?size=150'
    AUTHOR_BIO = 'Resident code monkey at @localmeasure.'
    PER_PAGE = 5
    DISQUS = 'thedrunkenepic'

class TestConfig(LocalConfig):
    TESTING = True
    ENVIRONMENT = 'testing'

class ProductionConfig(LocalConfig):
    DEBUG = False
    ENVIRONMENT = 'production'

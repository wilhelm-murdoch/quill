# -*- coding: utf-8 -*-
from inkwell import Config

class LocalConfig(Config):
    PORT = 8080
    THEME = 'Quill'
    SITE_TITLE = 'devilmayco.de'
    SITE_DESCRIPTION = 'Lover. Fighter. Gentleman. Coder.'
    ARTICLES_FOLDER = '../inkwell-pokedex/articles'
    AUTHOR_NAME = 'Wilhelm Murdoch'
    AUTHOR_AVATAR = 'https://en.gravatar.com/userimage/1306786/bfb15f8dc0075bd96472d7ec3c908794.jpg?size=200'
    AUTHOR_BIO = 'Resident code monkey at @localmeasure!'
    PER_PAGE = 5
    DISQUS = 'thedrunkenepic'

class TestConfig(LocalConfig):
    TESTING = True
    ENVIRONMENT = 'testing'

class ProductionConfig(LocalConfig):
    DEBUG = False
    ENVIRONMENT = 'production'

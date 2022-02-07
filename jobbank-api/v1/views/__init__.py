#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/v1')

from v1.views.index import *
from v1.views.students import *
from v1.views.partners import *
from v1.views.jobs import *
from v1.views.admins import *
from v1.views.login import *
from v1.views.skills import *
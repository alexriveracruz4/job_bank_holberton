#!/usr/bin/python3
"""
initialize the models package
"""

from v1.models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()

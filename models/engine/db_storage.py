#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models
from models.base_model import BaseModel, Base
from models.student import Student
from models.partner import Partner
from models.job import Job
from models.admin import Admin
from models.application import Application
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {"Student": Student, "Partner": Partner, "Job": Job, "Admin": Admin,
           "Application": Application}


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        JBH_MYSQL_USER = getenv('JBH_MYSQL_USER')
        JBH_MYSQL_PWD = getenv('JBH_MYSQL_PWD')
        JBH_MYSQL_HOST = getenv('JBH_MYSQL_HOST')
        JBH_MYSQL_DB = getenv('JBH_MYSQL_DB')

        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(JBH_MYSQL_USER,
                                             JBH_MYSQL_PWD,
                                             JBH_MYSQL_HOST,
                                             JBH_MYSQL_DB))

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        if cls == classes["Job"]:
            objs = self.__session.query(Job).all()
            for obj in objs:
                key = obj.__class__.__name__ + '.' + str(obj.partner_id) + str(obj.id)
                new_dict[key] = obj
        elif cls == classes["Application"]:
            objs = self.__session.query(Application).all()
            for obj in objs:
                key = obj.__class__.__name__ + '.' + str(obj.partner_id) + str(obj.job_id) + str(obj.student_id)
                new_dict[key] = obj
        else:
            for clss in classes:
                if cls is None or cls is classes[clss] or cls is clss:
                    objs = self.__session.query(classes[clss]).all()
                    for obj in objs:
                        key = obj.__class__.__name__ + '.' + str(obj.id)
                        new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == int(id)):
                return value

        return None

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count

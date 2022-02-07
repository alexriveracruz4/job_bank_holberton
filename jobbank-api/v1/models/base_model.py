#!/usr/bin/python3
"""
Contains class BaseModel
"""

from datetime import datetime
import v1.models
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
import uuid

time = "%Y-%m-%dT%H:%M:%S.%f"

Base = declarative_base()

class BaseModel:
    """The BaseModel class from which future classes will be derived"""

    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)
    deleted_at = Column(DateTime, default=None)

    def __init__(self, *args, **kwargs):
        """Initialization of the base model"""
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)
            if kwargs.get("created_at", None) and type(self.created_at) is str:
                self.created_at = datetime.strptime(kwargs["created_at"], time)
            else:
                self.created_at = datetime.now()
            if kwargs.get("updated_at", None) and type(self.updated_at) is str:
                self.updated_at = datetime.strptime(kwargs["updated_at"], time)
            else:
                self.updated_at = datetime.now()
            if kwargs.get("deleted_at", None) and type(self.deleted_at) is str:
                self.deleted_at = datetime.strptime(kwargs["deleted_at"], time)
            else:
                self.deleted_at = None
        else:
            self.created_at = datetime.now()
            self.updated_at = self.created_at
            self.deleted_at = None

    def __str__(self):
        """String representation of the BaseModel class"""
        if (hasattr(self, 'id')):
            return "[{:s}] ({:s}) {}".format(self.__class__.__name__, str(self.id),
                                         self.__dict__)

        classname_id = str(self.__class__.__name__).lower() + '_id'
        if (hasattr(self, classname_id)):
            return "[{:s}] ({:s}) {}".format(self.__class__.__name__, str(getattr(self, classname_id)),
                                         self.__dict__)
        else:
            return "[{:s}] {}".format(self.__class__.__name__,
                                        self.__dict__)

    def save(self):
        """updates the attribute 'updated_at' with the current datetime"""
        self.updated_at = datetime.now()
        v1.models.storage.new(self)
        v1.models.storage.save()

    def to_dict(self, save_fs=None):
        """returns a dictionary containing all keys/values of the instance"""
        new_dict = self.__dict__.copy()
        if "created_at" in new_dict:
            new_dict["created_at"] = new_dict["created_at"].strftime(time)
        if "updated_at" in new_dict:
            new_dict["updated_at"] = new_dict["updated_at"].strftime(time)
        if "deleted_at" in new_dict and new_dict["deleted_at"] != None:
            new_dict["deleted_at"] = new_dict["deleted_at"].strftime(time)
        new_dict["__class__"] = self.__class__.__name__
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        if save_fs is None:
            if "password" in new_dict:
                del new_dict["password"]
        return new_dict

    def delete(self):
        """delete the current instance from the storage"""
        self.deleted_at = datetime.now()
        v1.models.storage.delete(self)

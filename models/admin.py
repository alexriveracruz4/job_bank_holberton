#!/usr/bin/python3
""" Users Module for Job Bank Holberton """
from sqlalchemy.sql.expression import null
from models.base_model import BaseModel, Base
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import backref, relationship
import uuid


class Admin(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'admins'
    id = Column(Integer, primary_key=True, nullable=False)
    firstname = Column(String(45), nullable=False)
    lastname = Column(String(45), nullable=False)
    email= Column(String(45), nullable=False)
    password = Column(String(255), nullable=False)
    token = Column(String(60), nullable=True)
    students = relationship("Student", backref="admicreate", foreign_keys="Student.created_by")
    students = relationship("Student", backref="admidelete", foreign_keys="Student.deleted_by")
    partners = relationship("Partner", backref="admicreate",  foreign_keys="Partner.created_by")
    partners = relationship("Partner", backref="admidelete",  foreign_keys="Partner.deleted_by")

    def __init__(self, *args, **kwargs):
        """initializes admin"""
        self.token = str(uuid.uuid4())
        super().__init__(*args, **kwargs)

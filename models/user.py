#!/usr/bin/python3
""" Users Module for Job Bank Holberton """
from sqlalchemy.sql.expression import null
from models.base_model import BaseModel, Base
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.user_type import UserType


class User(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'users'
    user_type_id = Column(Integer, ForeignKey('user_types.id'), primary_key=True, autoincrement=False)
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=False)
    firstname = Column(String(45), nullable=False)
    lastname = Column(String(45), nullable=False)
    password = Column(String(255), nullable=False)
    deleted = Column(TINYINT(1), default=0, nullable=False)
    students = relationship("Student", backref="user")
    partners = relationship("Partner", backref="user")
    jobs = relationship("Job", backref="user")

    def __init__(self, *args, **kwargs):
        """initializes job"""
        super().__init__(*args, **kwargs)

#!/usr/bin/python3
""" Student Module for Job Bank Holberton """
from sqlalchemy.sql.sqltypes import Numeric
from v1.models.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, ForeignKeyConstraint
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import backref, relationship
import uuid


class Student(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True, nullable=False)
    pres_or_remot = Column(String(60), nullable=True)
    availability = Column(String(60), nullable=True)
    firstname = Column(String(45), nullable=False)
    lastname = Column(String(45), nullable=False)
    email = Column(String(45), nullable=False)
    phonenumber = Column(String(15), nullable=True)
    age = Column(Integer, nullable=True)
    nationality = Column(String(45), nullable=True)
    description = Column(String(1000), nullable=True)
    disp_travel = Column(String(45), nullable=True)
    linkedin = Column(String(70), nullable=True)
    github = Column(String(70), nullable=True)
    twitter = Column(String(70), nullable=True)
    password = Column(String(255), nullable=False)
    cv_filename_physical = Column(String(250), nullable=True)
    cv_filename_logical = Column(String(250), nullable=True)
    deleted = Column(TINYINT(1), default=0, nullable=False)
    created_by = Column(Integer, ForeignKey("admins.id") ,nullable=False)
    updated_by = Column(Integer, nullable=True)
    deleted_by = Column(Integer, ForeignKey("admins.id"), nullable=True)
    token = Column(String(60), nullable=True)
    photo_filename_physical = Column(String(250), nullable=True)
    photo_filename_logical = Column(String(250), nullable=True)
    applications = relationship("Application", backref='student')

    def __init__(self, *args, **kwargs):
        """initializes student"""
        self.token = str(uuid.uuid4())
        super().__init__(*args, **kwargs)

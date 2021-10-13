#!/usr/bin/python3
""" Student Module for Job Bank Holberton """
from sqlalchemy.sql.sqltypes import Numeric
from models.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import backref, relationship
from models.availability import Availability
from models.pres_or_remote import PresOrRemot
from models.users import Users


class Students(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = "STUDENTS"
    id = Column(Integer, primary_key=True, nullable=False)
    firstname = Column(String(128), nullable=False)
    lastname = Column(String(128), nullable=False)
    email = Column(String(45), nullable=False)
    phonenumber = Column(Integer, nullable=True)
    age = Column(Integer, nullable=True)
    nationality = Column(String(45), nullable=True)
    description = Column(String(1000), nullable=True)
    disp_travel = Column(TINYINT(1), nullable=True)
    linkedin = Column(String(70), nullable=True)
    github = Column(String(70), nullable=True)
    twitter = Column(String(70), nullable=True)
    password = Column(String(255), nullable=False)
    cv_filename_physical = Column(String(250), nullable=True)
    cv_filename_logical = Column(String(250), nullable=True)
    deleted = Column(TINYINT(1), default=0, nullable=False)
    deleted_At = Column(DateTime, default=datetime.utcnow(), nullable=False)
    created_by = relationship("Users", backref="STUDENTS", uselist=False)
    updated_by = relationship("Users", backref="STUDENTS", uselist=False)
    deleted_by = relationship("Users", backref="STUDENTS", uselist=False)
    ava_id = relationship("Availability", backref="STUDENTS", uselist=False)
    pres_or_remote_id = relationship("PresOrRemot", backref="STUDENTS", uselist=False)
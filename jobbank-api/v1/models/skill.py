#!/usr/bin/python3
""" Skill Module for Job Bank Holberton """
from sqlalchemy.sql.sqltypes import Numeric
from v1.models.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import backref, relationship
from sqlalchemy.schema import ForeignKeyConstraint
from v1.models.application import Application


class Skill(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'skills'
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    name = Column(String(45), nullable=False)
    type = Column(String(45), nullable=False)
    students = relationship('Student', secondary='studentskills', back_populates='skills')

    def __init__(self, *args, **kwargs):
        """initializes skill"""
        super().__init__(*args, **kwargs)

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


class StudentSkill(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'studentskills'
    student_id = Column(Integer, ForeignKey('students.student_id'), primary_key=True, autoincrement=False)
    skill_id = Column(Integer, ForeignKey("skills.id"), primary_key=True, autoincrement=False)

    def __init__(self, *args, **kwargs):
        """initializes skill"""
        super().__init__(*args, **kwargs)

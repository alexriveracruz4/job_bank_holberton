#!/usr/bin/python3
""" pres_or_remote Module for Job Bank Holberton """
from sqlalchemy.sql.expression import null
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey


class PresOrRemot(BaseModel, Base):
    """ In person or remote inherits from BaseModel and Base """
    __tablename__ = "PresOrRemot"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(45), nullable=False)
    student_id = Column(Integer, ForeignKey("Students.id"), nullable=False)
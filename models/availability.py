#!/usr/bin/python3
""" Availability Module for Job Bank Holberton """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey


class Availability(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = "Availability"
    id = Column(Integer, primary_key=True, nullable=False)
    type = Column(String(45), nullable=False)
    student_id = Column(Integer, ForeignKey("Students.id"), nullable=False)
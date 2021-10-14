#!/usr/bin/python3
""" Availability Module for Job Bank Holberton """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import backref, relationship


class Availability(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'availabilities'
    id = Column(Integer, primary_key=True, nullable=False)
    type = Column(String(45), nullable=False)
    students = relationship('Student', backref='availability')

    def __init__(self, *args, **kwargs):
        """initializes job"""
        super().__init__(*args, **kwargs)

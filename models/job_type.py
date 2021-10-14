#!/usr/bin/python3
""" Availability Module for Job Bank Holberton """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import backref, relationship


class Job_type(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'job_types'
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(45), nullable=False)
    sequence = Column(Integer, nullable=False)
    deleted = deleted = Column(TINYINT(1), default=0, nullable=False)
    jobs = relationship('Job', backref='jobtype')

    def __init__(self, *args, **kwargs):
        """initializes contract type"""
        super().__init__(*args, **kwargs)

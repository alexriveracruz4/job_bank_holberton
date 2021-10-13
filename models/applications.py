#!/usr/bin/python3
""" Availability Module for Job Bank Holberton """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, ForeignKey


class Applications(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = "Applications"
    job_id = Column(Integer, ForeignKey("Jobs.id"),  primary_key=True, nullable=False)
    partner_id = Column(Integer, ForeignKey("Partners.id"), primary_key=True, nullable=False)
    student_id = Column(Integer, ForeignKey("Students.id"), primary_key=True, nullable=False)
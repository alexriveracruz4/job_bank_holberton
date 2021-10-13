#!/usr/bin/python3
""" Availability Module for Job Bank Holberton """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, ForeignKey


class Application(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = "applications"
    job_id = Column(Integer, ForeignKey("jobs.id"),  primary_key=True, nullable=False, autoincrement=False)
    partner_id = Column(Integer, ForeignKey("partners.id"), primary_key=True, nullable=False, autoincrement=False)
    student_id = Column(Integer, ForeignKey("students.id"), primary_key=True, nullable=False, autoincrement=False)

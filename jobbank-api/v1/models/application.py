#!/usr/bin/python3
""" Availability Module for Job Bank Holberton """
from v1.models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.schema import ForeignKeyConstraint


class Application(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = "applications"

    partner_id = Column(Integer, primary_key=True, nullable=False, autoincrement=False)
    job_id = Column(Integer, primary_key=True, nullable=False, autoincrement=False)
    student_id = Column(Integer, ForeignKey("students.student_id"), primary_key=True, nullable=False, autoincrement=False)
    __table_args__ = (
        ForeignKeyConstraint(['partner_id', 'job_id'], ['jobs.partner_id', 'jobs.id']),
    )


    def __init__(self, *args, **kwargs):
        """initializes job"""
        super().__init__(*args, **kwargs)

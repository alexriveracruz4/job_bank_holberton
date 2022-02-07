#!/usr/bin/python3
""" Job Module for Job Bank Holberton """
from sqlalchemy.sql.sqltypes import Numeric
from v1.models.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import backref, relationship
from sqlalchemy.schema import ForeignKeyConstraint
from v1.models.application import Application


class Job(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'jobs'
    partner_id = Column(Integer, ForeignKey('partners.partner_id'), primary_key=True, autoincrement=False)
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=False)
    job_type = Column(String(45), nullable=True)
    code = Column(String(255), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(String(3000), nullable=True)
    city = Column(String(45), nullable=True)
    country = Column(String(45), nullable=True)
    pres_or_remote = Column(String(45), nullable=True)
    experience = Column(String(45), nullable=True)
    travel_availability = Column(String(45), nullable=True)
    salary = Column(String(45), nullable=True)
    deleted = Column(TINYINT(1), default=0, nullable=False)
    created_by = Column(Integer, nullable=True)
    updated_by = Column(Integer, nullable=True)
    deleted_by = Column(Integer, nullable=True)

    applications = relationship('Application', backref='job')

    def __init__(self, *args, **kwargs):
        """initializes job"""
        super().__init__(*args, **kwargs)

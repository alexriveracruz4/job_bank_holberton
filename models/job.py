#!/usr/bin/python3
""" Partner Module for Job Bank Holberton """
from sqlalchemy.sql.sqltypes import Numeric
from models.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import backref, relationship


class Job(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'jobs'
    partner_id = Column(Integer, ForeignKey('partners.id'), primary_key=True, autoincrement=False)
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=False)
    contract_type = Column(Integer, ForeignKey('contract_types.id'), nullable=False)
    job_type = Column(Integer, ForeignKey('job_types.id'), nullable=False)
    code = Column(String(255), nullable=False)
    title = Column(String(45), nullable=False)
    description = Column(String(2000), nullable=True)
    city = Column(String(45), nullable=True)
    country = Column(String(45), nullable=True)
    pres_or_remote = Column(String(60), ForeignKey('pres_or_remots.id'), nullable=False)
    experience = Column(String(45), nullable=False)
    travel_availability = Column(TINYINT(1), default=0, nullable=False)
    age_min = Column(Integer, nullable=False)
    age_max =  Column(Integer, nullable=False)
    salary = Column(String(45), nullable=True)
    deleted = Column(TINYINT(1), default=0, nullable=False)
    created_by = Column(Integer, ForeignKey('users.id'), nullable=True)
    updated_by = Column(Integer, ForeignKey('users.id'), nullable=True)
    deleted_by = Column(Integer, ForeignKey('users.id'), nullable=True)
    applications = relationship("Application", backref='job')

    def __init__(self, *args, **kwargs):
        """initializes job"""
        super().__init__(*args, **kwargs)

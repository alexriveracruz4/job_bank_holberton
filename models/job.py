#!/usr/bin/python3
""" Job Module for Job Bank Holberton """
from sqlalchemy.sql.sqltypes import Numeric
from models.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import backref, relationship
from sqlalchemy.schema import ForeignKeyConstraint
from models.application import Application


class Job(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'jobs'
    partner_id = Column(Integer, ForeignKey('partners.id'), primary_key=True, autoincrement=False)
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=False)
    contract_type = Column(Integer, ForeignKey("contract_types.id"), nullable=False)
    job_type = Column(Integer, ForeignKey("job_types.id"), nullable=False)
    code = Column(String(255), nullable=False)
    title = Column(String(45), nullable=False)
    description = Column(String(2000), nullable=True)
    city = Column(String(45), nullable=True)
    country = Column(String(45), nullable=True)
    pres_or_remote = Column(Integer, ForeignKey("pres_or_remots.id"), nullable=False)
    experience = Column(String(45), nullable=False)
    travel_availability = Column(TINYINT(1), default=0, nullable=False)
    age_min = Column(Integer, nullable=False)
    age_max =  Column(Integer, nullable=False)
    salary = Column(String(45), nullable=True)
    deleted = Column(TINYINT(1), default=0, nullable=False)
    created_by_ustype = Column(Integer, nullable=True)
    updated_by_ustype = Column(Integer, nullable=True)
    deleted_by_ustype = Column(Integer, nullable=True)
    created_by_id = Column(Integer, nullable=True)
    updated_by_id = Column(Integer, nullable=True)
    deleted_by_id = Column(Integer, nullable=True)
    __table_args__ = (
        ForeignKeyConstraint(['created_by_ustype', 'created_by_id'],
                             ['users.user_type_id', 'users.id']),
        ForeignKeyConstraint(['updated_by_ustype', 'updated_by_id'],
                             ['users.user_type_id', 'users.id']),
        ForeignKeyConstraint(['deleted_by_ustype', 'deleted_by_id'],
                             ['users.user_type_id', 'users.id'])
    )
    applications = relationship('Application', backref='job')

    def __init__(self, *args, **kwargs):
        """initializes job"""
        super().__init__(*args, **kwargs)

#!/usr/bin/python3
""" Partner Module for Job Bank Holberton """
from sqlalchemy.sql.sqltypes import Numeric
from models.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import backref, relationship
from sqlalchemy.schema import ForeignKeyConstraint


class Partner(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'partners'
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(45), nullable=False)
    phonenumber = Column(Integer, nullable=True)
    nation = Column(String(45), nullable=True)
    region = Column(String(45), nullable=True)
    description = Column(String(1000), nullable=True)
    email = Column(String(45), nullable=False)
    web = Column(String(70), nullable=True)
    password = Column(String(255), nullable=False)
    logo_filename_physical = Column(String(250), nullable=True)
    logo_filename_logical = Column(String(250), nullable=True)
    deleted = Column(TINYINT(1), default=0, nullable=False)
    created_by_ustype = Column(Integer, nullable=True)
    updated_by_ustype = Column(Integer, nullable=True)
    deleted_by_ustype = Column(Integer, nullable=True)
    created_by_id = Column(Integer, nullable=True)
    updated_by_id = Column(Integer, nullable=True)
    deleted_by_id = Column(Integer, nullable=True)
    __table_args__ = (
        ForeignKeyConstraint(['created_by_ustype', 'created_by_id'],
                             ['users.user_type_id', 'users.id'], name="fk_cr"),
        ForeignKeyConstraint(['updated_by_ustype', 'updated_by_id'],
                             ['users.user_type_id', 'users.id'], name="fk_up"),
        ForeignKeyConstraint(['deleted_by_ustype', 'deleted_by_id'],
                             ['users.user_type_id', 'users.id'], name="fk_de")
    )
    jobs = relationship('Job', backref='partner')


    def __init__(self, *args, **kwargs):
        """initializes partner"""
        super().__init__(*args, **kwargs)

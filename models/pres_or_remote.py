#!/usr/bin/python3
""" pres_or_remote Module for Job Bank Holberton """
from sqlalchemy.sql.expression import null
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey


class Pres_or_remot(BaseModel, Base):
    """ In person or remote inherits from BaseModel and Base """
    __tablename__ = "pres_or_remots"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(45), nullable=False)
    students = relationship('Student', backref='pres_or_remot')

    def __init__(self, *args, **kwargs):
        """initializes pres_or_remote"""
        super().__init__(*args, **kwargs)

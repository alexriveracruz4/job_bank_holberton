#!/usr/bin/python3
""" user_type Module for Job Bank Holberton """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey


class User_type(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = "user_types"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(55), nullable=False)
    users = relationship("User", backref="user_type")

    def __init__(self, *args, **kwargs):
        """initializes job"""
        super().__init__(*args, **kwargs)

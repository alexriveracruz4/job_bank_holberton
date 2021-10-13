#!/usr/bin/python3
""" Users Module for Job Bank Holberton """
from sqlalchemy.sql.expression import null
from models.base_model import BaseModel, Base
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from models.user_type import UserType


class Users(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = "USERS"
    id = Column(Integer, primary_key=True, nullable=False)
    firstname = Column(String(45), nullable=False)
    lastname = Column(String(45), nullable=False)
    password = Column(String(255), nullable=False)
    deleted = Column(TINYINT(1), default=0, nullable=False)
    usertype_id = relationship("UserType", backref="Users", uselist=False)
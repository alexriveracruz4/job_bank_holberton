#!/usr/bin/python3
""" Users Module for Job Bank Holberton """
from sqlalchemy.sql.expression import null
from models.base_model import BaseModel, Base
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import backref, relationship


class User(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = 'users'
    user_type_id = Column(Integer, ForeignKey('user_types.id'), primary_key=True, autoincrement=False)
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=False)
    firstname = Column(String(45), nullable=False)
    lastname = Column(String(45), nullable=False)
    password = Column(String(255), nullable=False)
    deleted = Column(TINYINT(1), default=0, nullable=False)
    students1 = relationship("Student", backref="user", foreign_keys="Student.created_by_ustype")
    students2 = relationship("Student", backref="user2", foreign_keys="Student.created_by_id")
    students3 = relationship("Student", backref="user3", foreign_keys="Student.updated_by_ustype")
    students4 = relationship("Student", backref="user4", foreign_keys="Student.updated_by_id")
    students5 = relationship("Student", backref="user5", foreign_keys="Student.deleted_by_ustype")
    students6 = relationship("Student", backref="user6", foreign_keys="Student.deleted_by_id")
    partners1 = relationship("Partner", backref="user", foreign_keys="Partner.created_by_ustype")
    partners2 = relationship("Partner", backref="user2", foreign_keys="Partner.created_by_id")
    partners3 = relationship("Partner", backref="user3", foreign_keys="Partner.updated_by_ustype")
    partners4 = relationship("Partner", backref="user4", foreign_keys="Partner.updated_by_id")
    partners5 = relationship("Partner", backref="user5", foreign_keys="Partner.deleted_by_ustype")
    partners6 = relationship("Partner", backref="user6", foreign_keys="Partner.deleted_by_id")
    job1 = relationship("Job", backref="user", foreign_keys="Job.created_by_ustype")
    job2 = relationship("Job", backref="user2", foreign_keys="Job.created_by_id")
    job3 = relationship("Job", backref="user3", foreign_keys="Job.updated_by_ustype")
    job4 = relationship("Job", backref="user4", foreign_keys="Job.updated_by_id")
    job5 = relationship("Job", backref="user5", foreign_keys="Job.deleted_by_ustype")
    job6 = relationship("Job", backref="user6", foreign_keys="Job.deleted_by_id")

    def __init__(self, *args, **kwargs):
        """initializes job"""
        super().__init__(*args, **kwargs)

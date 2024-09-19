import datetime
import uuid
import pymysql
from config.db import *
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import expression



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    u_fullname = db.Column(db.String(128), nullable=False)
    u_username = db.Column(db.String(128), nullable=False)
    u_mobile = db.Column(db.String(128), nullable=False)
    u_address = db.Column(db.String(128), nullable=False)
    u_email = db.Column(db.String(128), nullable=False)
    u_password = db.Column(db.String(128), nullable=False)
    u_city = db.Column(db.String(128), nullable=False)
    u_uid = db.Column(db.String(128), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    update_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

class Teller(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    t_fullname = db.Column(db.String(128), nullable=False)
    t_username = db.Column(db.String(128), nullable=False)
    t_mobile = db.Column(db.String(128), nullable=False)
    t_address = db.Column(db.String(128), nullable=False)
    t_email = db.Column(db.String(128), nullable=False)
    t_password = db.Column(db.String(128), nullable=False)
    t_city = db.Column(db.String(128), nullable=False)
    t_uid = db.Column(db.String(128), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    update_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

class Advertisement(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ad_uid = db.Column(db.String(128), unique=True, default=lambda: str(uuid.uuid4()))
    ad_type = db.Column(db.String(128), nullable=False)
    ad_title = db.Column(db.String(128), nullable=False)
    ad_email = db.Column(db.String(128), nullable=False)
    ad_description = db.Column(db.String(128))
    ad_mobile = db.Column(db.String(128), nullable=False)
    ad_address = db.Column(db.String(128))
    number_broadcasts = db.Column(db.String(128), nullable=False)
    ad_start_date = db.Column(db.String(128), nullable=False)
    ad_end_date = db.Column(db.String(128))
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    update_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)


class Business(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    bu_uid = db.Column(db.String(128), nullable=False)
    bu_categories = db.Column(db.String(128), nullable=False)
    bu_type = db.Column(db.String(128), nullable=False)
    bu_name = db.Column(db.String(128), nullable=False, unique=True)
    bu_description = db.Column(db.String(128), nullable=False)
    bu_email = db.Column(db.String(128), nullable=False)
    bu_city = db.Column(db.String(128), nullable=False)
    bu_address = db.Column(db.String(128), nullable=False)
    bu_mobile = db.Column(db.String(128), nullable=False)
    bu_image1 = db.Column(db.String(128), nullable=False)
    bu_image2 = db.Column(db.String(128), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    update_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

class Categories(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ca_name = db.Column(db.String(128), nullable=False)
    ca_description = db.Column(db.String(250), nullable=False)
    ca_uid = db.Column(db.String(128), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    update_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

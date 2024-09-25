from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta
from flask import request, jsonify
import uuid
from config.db import db
from model.tt import *
import bcrypt, jwt
from werkzeug.security import check_password_hash


def CreateAdmin():
    reponse = {}

    try:
        ad_fullname = 'Kraye Roland Landry'
        ad_username = 'foleykant01'
        ad_mobile = '0702653594'      
        ad_email = 'krayediego@gmail.com'
        ad_password = 'Krl0574530290'
        hashed_password = bcrypt.hashpw(ad_password.encode('utf-8'), bcrypt.gensalt())
        
        new_admin = Admin()
        new_admin.ad_fullname = ad_fullname
        new_admin.ad_username = ad_username
        new_admin.ad_mobile = ad_mobile
        new_admin.ad_email = ad_email
        new_admin.ad_password = hashed_password
        
        db.session.add(new_admin)
        db.session.commit()

        reponse['status'] = 'Succes'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def LoginAdmin():

    response = {}
    try:
        username = request.json.get('ad_username')
        password = request.json.get('ad_password')
        login_admin = Admin.query.filter_by(t_username=username).first()

        if login_admin and bcrypt.checkpw(password.encode('utf-8'), login_admin.t_password.encode('utf-8')):
            expires = timedelta(hours=1)
            access_token = create_access_token(identity=username)

            response['status'] = 'success'
            response['message'] = 'Login successful'
            response['access_token'] = access_token

        else:
            response['status'] = 'error'
            response['message'] = 'Invalid username or password'

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response
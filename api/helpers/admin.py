from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta
from flask import request, jsonify
from config.db import db
from model.tt import *
import bcrypt
from werkzeug.security import check_password_hash


def CreateAdmin():
    response = {}

    try:
        ad_fullname = (request.json.get('ad_fullname'))
        ad_username = (request.json.get('ad_username'))      
        ad_mobile = (request.json.get('ad_mobile'))
        ad_email = (request.json.get('ad_email'))
        ad_password = (request.json.get('ad_password'))
        hashed_password = bcrypt.hashpw(ad_password.encode('utf-8'), bcrypt.gensalt())
        
        new_admin = Admin()
        new_admin.ad_fullname = ad_fullname
        new_admin.ad_username = ad_username
        new_admin.ad_mobile = ad_mobile
        new_admin.ad_email = ad_email
        new_admin.ad_password = hashed_password
        
        db.session.add(new_admin)
        db.session.commit()

        response['status'] = 'Succes'

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response



def LoginAdmin():
    reponse = {}

    try:
        identifiant = request.json.get('identifiant')
        password = request.json.get('ad_password')

        login_admin = Admin.query.filter((Admin.ad_email == identifiant) | (Admin.ad_username == identifiant)).first()

        if login_admin and bcrypt.checkpw(password.encode('utf-8'), login_admin.ad_password.encode('utf-8')):
            expires = timedelta(hours=1)
            access_token = create_access_token(identity=identifiant)

            reponse['status'] = 'success'
            reponse['message'] = 'Login successful'
            reponse['access_token'] = access_token

        else:
            reponse['status'] = 'error'
            reponse['message'] = 'Invalid username or password'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse

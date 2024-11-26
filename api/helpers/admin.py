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
        ad_password = "foley123"
        hashed_password = bcrypt.hashpw(ad_password.encode('utf-8'), bcrypt.gensalt())
        
        new_admin = Admin()
        new_admin.ad_fullname = "Kraye Roland Landry"
        new_admin.ad_username = "foleykant01"
        new_admin.ad_mobile = "0702653594"
        new_admin.ad_email = "krayediego@gmail.com"
        new_admin.ad_password = hashed_password
        
        db.session.add(new_admin)
        db.session.commit()

        response['status'] = 'Succes'

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response



def ReadAllAdmin():

    reponse = {}
    try:
        all_admin = Admin.query.all()
        if all_admin:
            admin_informations = []
            for admin in all_admin:
                admin_infos = {
                    'ad_uid': admin.ad_uid,
                    'ad_fullname': admin.ad_fullname,
                    'ad_username': admin.ad_username,
                    'ad_mobile': admin.ad_mobile,                    
                    'ad_email': admin.ad_email, 
                    'ad_password': admin.ad_password,
                }
                admin_informations.append(admin_infos)
            reponse['status'] = 'success'
            reponse ['admins'] = admin_informations
        else:
            reponse['status'] = 'erreur'
            reponse['motif'] = 'aucun'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def LoginAdmin():
    reponse = {}

    try:
        identifiant = request.json.get('identifiant')
        password = request.json.get('ad_password')
        login_admin = Admin.query.filter((Admin.ad_email == identifiant) | (Admin.ad_username == identifiant)).first()

        if login_admin and bcrypt.checkpw(password.encode('utf-8'), login_admin.ad_password.encode('utf-8')):
            expires = timedelta(hours=1)
            access_token = create_access_token(identity=identifiant)
            rs = {}
            rs['ad_uid'] = login_admin.ad_uid
            rs['ad_fullname'] = login_admin.ad_fullname
            rs['ad_username'] = login_admin.ad_username
            rs['ad_mobile'] = login_admin.ad_mobile
            rs['ad_email'] = login_admin.ad_email

            reponse['status'] = 'success'
            reponse['message'] = 'Login successful'
            reponse['admin_infos'] = rs
            reponse['access_token'] = access_token

        else:
            reponse['status'] = 'error'
            reponse['message'] = 'Invalid username or password'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse

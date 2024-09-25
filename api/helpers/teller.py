from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta
from flask import request, jsonify
import uuid
from config.db import db
from model.tt import *
import bcrypt, jwt
from werkzeug.security import check_password_hash

def CreateTeller():
    rseponse = {}

    try:
        t_fullname = (request.json.get('t_fullname'))
        t_username = (request.json.get('t_username'))
        t_mobile = (request.json.get('t_mobile'))      
        t_address = (request.json.get('t_address'))
        t_email = (request.json.get('t_email'))
        t_password = (request.json.get('t_password'))
        t_city = (request.json.get('t_city'))

        hashed_password = bcrypt.hashpw(t_password.encode('utf-8'), bcrypt.gensalt())
        
        new_teller = Teller()
        new_teller.t_fullname = t_fullname
        new_teller.t_username = t_username
        new_teller.t_mobile = t_mobile
        new_teller.t_address = t_address
        new_teller.t_email = t_email
        new_teller.t_password = hashed_password
        new_teller.t_city = t_city
        
        db.session.add(new_teller)
        db.session.commit()

        rs = {}
        rs['t_fullname'] = t_fullname
        rs['t_username'] = t_username
        rs['t_mobile'] = t_mobile
        rs['t_address'] = t_address
        rs['t_email'] = t_email
        rs['t_city'] = t_city
        rs['t_uid'] = new_teller.t_uid

        rseponse['status'] = 'Succes'
        rseponse['status'] = rs


    except Exception as e:
        rseponse['error_description'] = str(e)
        rseponse['status'] = 'error'

    return rseponse



def ReadAllTeller():
    reponse = {}

    try:
        all_user = Teller.query.all()
        if all_user:
            teller_informations = []

            for teller in all_user:
                teller_infos = {
                    't_fullname': teller.t_fullname,
                    't_username': teller.t_username,
                    't_mobile': teller.t_mobile,
                    't_address': teller.t_address,
                    't_email': teller.t_email,
                    't_city': teller.t_city,                    
                    't_uid': teller.t_uid, 
                }
                teller_informations.append(teller_infos)

            reponse['status'] = 'success'
            reponse ['teller'] = teller_informations
        else:
            reponse['status'] = 'erreur'
            reponse['motif'] = 'aucun'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def ReadSingleTeller():

    reponse = {}
    try:
        uid = request.json.get('t_uid')
        single_teller = Teller.query.filter_by(t_uid = uid).first()

        if single_teller:
            teller_infos = {
                't_fullname': single_teller.t_fullname,
                't_username': single_teller.t_username,
                't_mobile': single_teller.t_mobile,
                't_address': single_teller.t_address,
                't_email': single_teller.t_email,
                't_city': single_teller.t_city,                    
                't_uid': single_teller.t_uid, 
            }
            reponse['status'] = 'success'
            reponse['teller'] = teller_infos
        else:
            reponse['status'] = 'erreur'
            reponse['motif'] = 'aucun'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def UpdateTeller  ():

    reponse = {}
    try:
        uid = request.json.get('t_uid')
        update_teller = Teller.query.filter_by(t_uid = uid).first()

        if update_teller:
            update_teller.t_fullname = request.json.get('t_fullname', update_teller.t_fullname)
            update_teller.t_username = request.json.get('t_username', update_teller.t_username)            
            update_teller.t_mobile = request.json.get('t_mobile', update_teller.t_mobile)
            update_teller.t_address = request.json.get('t_address', update_teller.t_address)
            update_teller.t_email = request.json.get('t_email', update_teller.t_email)
            update_teller.t_city = request.json.get('t_city', update_teller.t_city)
            update_teller.t_uid = request.json.get('t_uid', update_teller.t_uid)

            db.session.add(update_teller)
            db.session.commit()

            reponse['status'] = 'Succes'
            reponse['teller'] = update_teller
        else:
            reponse['status'] = 'Teller not found'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse


def DeleteTeller():

    reponse = {}
    try:
        uid = request.json.get('t_uid')
        delete_teller = Teller.query.filter_by(t_uid=uid).first()
        if delete_teller:
            db.session.delete(delete_teller)
            db.session.commit()
            reponse['status'] = 'success'
        else:
            reponse['status'] = 'error'
            reponse['motif'] = 'Teller not found'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def LoginTeller():

    reponse = {}
    try:
        username = request.json.get('t_username')
        password = request.json.get('t_password')
        login_teller = Teller.query.filter_by(t_username=username).first()
        if login_teller and bcrypt.checkpw(password.encode('utf-8'), login_teller.t_password.encode('utf-8')):
            expires = timedelta(hours=1)
            access_token = create_access_token(identity=username)

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
from flask import request
from config.db import db
from model.tt import *
from flask import request


def SaveHistorique():

    reponse = {}
    try:
        textSearch = (request.json.get('textSearch'))
        bu_uid = (request.json.get('bu_uid'))
        u_uid = (request.json.get('u_uid'))
        
        new_historiques = Historiques()
        new_historiques.textSearch = textSearch
        new_historiques.bu_uid = bu_uid
        new_historiques.u_uid = u_uid
        
        db.session.add(new_historiques)
        db.session.commit()

        rs = {}
        rs['h_uid'] = new_historiques.h_uid
        rs['textSearch'] = new_historiques.textSearch
        rs['bu_uid'] = new_historiques.bu_uid
        rs['u_uid'] = new_historiques.u_uid
        rs['visited_at'] = str(new_historiques.visited_at)

        reponse['status'] = 'success'
        reponse['histo_infos'] = rs

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse


def ReadAllHistoriqueByUser():

    reponse = {}
    try:
        user_id = request.json.get('user_id')
        all_histo = Historiques.query.filter_by(u_uid = user_id).all()
        if all_histo:
            print('histo found')
            histo_informations = []
            for user in all_histo:
                single_business = Business.query.filter_by(bu_uid = user.bu_uid).first()
                histo_infos = {
                    'h_uid': user.h_uid,
                    'textSearch': user.textSearch,
                    'bu_uid': single_business.bu_uid, 
                    'bu_name': single_business.bu_name, 
                    'bu_description': single_business.bu_description, 
                    'u_uid': user.u_uid, 
                    'visited_at': str(user.visited_at),
                }
                histo_informations.append(histo_infos)
            reponse['status'] = 'success'
            reponse ['histo_informations'] = histo_informations
        else:
            reponse['status'] = 'erreur'
            reponse['motif'] = 'aucun'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse


def DeleteHistoriques():
    reponse = {}
    try:
        user_id = request.json.get('user_id')
        delete_histo = Historiques.query.filter_by(u_uid=user_id).first()
        db.session.delete(delete_histo)
        db.session.commit()
        reponse['status'] = 'success'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse
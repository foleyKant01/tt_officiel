from flask import request
from config.db import db
from model.tt import *
from flask import request


def SaveHistorique():

    reponse = {}
    try:
        textSearch = (request.json.get('textSearch'))
        bu_name = (request.json.get('bu_name'))      
        bu_city = (request.json.get('bu_city'))
        bu_uid = (request.json.get('bu_uid'))
        u_uid = (request.json.get('u_uid'))
        
        new_historiques = Historiques()
        new_historiques.textSearch = textSearch
        new_historiques.bu_name = bu_name
        new_historiques.bu_city = bu_city
        new_historiques.bu_uid = bu_uid
        new_historiques.u_uid = u_uid
        
        db.session.add(new_historiques)
        db.session.commit()

        rs = {}
        rs['h_uid'] = new_historiques.h_uid
        rs['textSearch'] = new_historiques.textSearch
        rs['bu_name'] = new_historiques.bu_name
        rs['bu_city'] = new_historiques.bu_city
        rs['bu_uid'] = new_historiques.bu_uid
        rs['u_uid'] = new_historiques.u_uid
        rs['visited_at'] = new_historiques.visited_at

        reponse['status'] = 'Succes'
        reponse['histo_infos'] = rs

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse


def ReadAllHistoriqueByUser():

    reponse = {}
    try:
        u_uid = request.json.get('u_uid')
        all_histo = Historiques.query.filter_by(u_uid = u_uid).first_or_404()
        if all_histo:
            histo_informations = []
            for user in all_histo:
                histo_infos = {
                    'h_uid': user.h_uid,
                    'textSearch': user.textSearch,
                    'bu_name': user.bu_name,
                    'bu_city': user.bu_city,                    
                    'bu_uid': user.bu_uid, 
                    'u_uid': user.u_uid, 
                    'visited_at': user.visited_at,
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
        h_uid = request.json.get('h_uid')
        delete_histo = Historiques.query.filter_by(h_uid=h_uid).first_or_404()
        db.session.delete(delete_histo)
        db.session.commit()
        reponse['status'] = 'success'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse
from flask import request
from config.db import db
from model.tt import *
from flask import request

def SaveFavoris():

    reponse = {}
    try:
        bu_name = (request.json.get('bu_name'))
        bu_city = (request.json.get('bu_city'))      
        bu_uid = (request.json.get('bu_uid'))
        u_uid = (request.json.get('u_uid'))
        
        new_fav = Favoris()
        new_fav.bu_name = bu_name
        new_fav.bu_city = bu_city
        new_fav.bu_uid = bu_uid
        new_fav.u_uid = u_uid
        
        db.session.add(new_fav)
        db.session.commit()

        rs = {}
        rs['fa_uid'] = new_fav.fa_uid
        rs['bu_name'] = new_fav.bu_name
        rs['bu_city'] = new_fav.bu_city
        rs['bu_uid'] = new_fav.bu_uid
        rs['u_uid'] = new_fav.u_uid
        rs['creation_date'] = str(new_fav.creation_date)

        reponse['status'] = 'Succes'
        reponse['fav_infos'] = rs

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse


def ReadAllFavorisByUser():

    reponse = {}
    try:
        u_uid = request.json.get('u_uid')
        all_favs = Favoris.query.filter_by(u_uid = u_uid).first_or_404()
        if all_favs:
            favs_informations = []
            for user in all_favs:
                favs_infos = {
                    'fa_uid': user.fa_uid,
                    'bu_name': user.bu_name,
                    'bu_city': user.bu_city,
                    'bu_uid': user.bu_uid,                    
                    'u_uid': user.u_uid, 
                    'creation_date': str(user.creation_date),
                }
                favs_informations.append(favs_infos)
            reponse['status'] = 'success'
            reponse ['favs_informations'] = favs_informations
        else:
            reponse['status'] = 'erreur'
            reponse['motif'] = 'aucun'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse


def DeleteFavoris():

    reponse = {}
    try:
        fa_uid = request.json.get('fa_uid')
        delete_fav = Favoris.query.filter_by(fa_uid=fa_uid).first_or_404()
        db.session.delete(delete_fav)
        db.session.commit()
        reponse['status'] = 'success'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse
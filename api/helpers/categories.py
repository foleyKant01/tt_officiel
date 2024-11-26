from flask import request
import uuid
from config.db import db
from model.tt import Categories



def CreateCategories():
    
    response = {}
    try:
        ca_name = request.json.get('name')
        ca_description = request.json.get('description')
        ca_uid = str(uuid.uuid4())

        new_categories = Categories()
        new_categories.ca_name = ca_name
        new_categories.ca_description = ca_description
        new_categories.ca_uid = ca_uid
        
        db.session.add(new_categories)
        db.session.commit()

        response['satus'] = 'success'
        response['ca_uid'] = ca_uid
        response['ca_name'] = ca_name
        response['ca_description'] = ca_description

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response


def UpdateCategories():

    response = {}
    try:
        ca_uid = request.json.get('ca_uid')
        update_categories = Categories.query.filter_by(ca_uid = ca_uid).first_or_404()
        update_categories.ca_name = request.json.get('name', update_categories.ca_name)
        update_categories.ca_description = request.json.get('description', update_categories.ca_description)
     
        db.session.add(update_categories)
        db.session.commit() 

        rs  = {}
        rs['ca_uid'] = ca_uid
        rs['name'] = update_categories.ca_name
        rs['description'] = update_categories.ca_description
        
        response['status'] = 'success'
        response['categorie'] = rs

    except Exception as e:
        response['status'] = 'error'
        response['error_description'] = str(e)

    return response


def DeleteCategories():

    response = {}
    try:
        ca_uid = request.json.get('ca_uid')
        delete_categories = Categories.query.filter_by(ca_uid=ca_uid).first_or_404()
        db.session.delete(delete_categories)
        db.session.commit()

        response['status'] = 'success'

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error' + str(e)

    return response



def ReadAllCategories():

    response = {}
    try:
        all_categirie = Categories.query.all()
        categories_info = []
        categorie_name = []
        for categorie in all_categirie:
            categorie_infos = {
                'ca_uid': categorie.ca_uid,
                'name': categorie.ca_name,              
                'description': categorie.ca_description,              
            }
            categories_info.append(categorie_infos)

        for categorie in all_categirie:
            categorie_infos = {
                'name': categorie.ca_name,              
            }
            categorie_name.append(categorie_infos)
        response['status'] = 'success'
        response ['categorie_name'] = categorie_name
        response ['categories'] = categories_info

    except Exception as e:
        response['status'] = 'error'
        response['error_description'] = str(e)

    return response



# def ReadSingleCategories():

#     response = {}
#     try:
#         ca_uid = request.json.get('ca_uid')
#         single_categories = Categories.query.filter_by(ca_uid=ca_uid).first_or_404()
#         categories_infos = {
#             'ca_uid': single_categories.ca_uid,
#             'name': single_categories.ca_name,  
#             'description': single_categories.ca_description,              
#         }
#         response['status'] = 'success'
#         response['categorie'] = categories_infos

#     except Exception as e:
#         response['status'] = 'error'
#         response['error_description'] = str(e)

#     return response


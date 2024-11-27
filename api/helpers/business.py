from flask import jsonify, request
import uuid
from config.db import db
from model.tt import Business


def CreateBusiness():
    
    response = {}   
    try:
        new_business = Business()
        new_business.bu_categorie = request.json.get('categorie')
        new_business.bu_type = request.json.get('type')
        new_business.bu_name = request.json.get('name')
        new_business.bu_description = request.json.get('description')
        new_business.bu_city = request.json.get('city')
        new_business.bu_address = request.json.get('address')
        new_business.bu_image1 = request.json.get('image1')
        new_business.bu_image2 = request.json.get('image2')
        new_business.t_uid = request.json.get('t_uid')
        new_business.bu_status = 'Active'
        # new_business.latitude = request.json.get('latitude')
        # new_business.longitude = request.json.get('longitude')
        new_business.bu_uid = str(uuid.uuid4())
        
        db.session.add(new_business)
        db.session.commit()

        rs = {}
        rs['bu_uid'] = new_business.bu_uid
        rs['bu_categorie'] = new_business.bu_categorie
        rs['bu_type'] = new_business.bu_type
        rs['bu_name'] = new_business.bu_name
        rs['bu_description'] = new_business.bu_description
        rs['bu_city'] = new_business.bu_city
        rs['bu_address'] = new_business.bu_address
        rs['bu_image1'] = new_business.bu_image1
        rs['bu_image2'] = new_business.bu_image2
        rs['t_uid'] = new_business.t_uid
        rs['bu_status'] = new_business.bu_status
        # rs['latitude'] = new_business.latitude
        # rs['longitude'] = new_business.longitude

        response['satus'] = 'success'
        response['business_infos'] = rs

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response



def UpdateBusiness():
    response = {}

    try:
        bu_uid = request.json.get('bu_uid')
        update_business = Business.query.filter_by(bu_uid = bu_uid).first_or_404()
        if update_business:
            update_business.bu_type = request.json.get('type', update_business.bu_type)
            update_business.bu_name = request.json.get('name', update_business.bu_name)
            update_business.bu_description = request.json.get('description', update_business.bu_description)            
            update_business.bu_city = request.json.get('city', update_business.bu_city)
            update_business.bu_address = request.json.get('address', update_business.bu_address)
            update_business.bu_image1 = request.json.get('image1', update_business.bu_image1)
            update_business.bu_image1 = request.json.get('image2', update_business.bu_image1)
            # update_business.latitude = request.json.get('latitude', update_business.latitude)
            # update_business.longitude = request.json.get('longitude', update_business.longitude)
            update_business.t_uid = update_business.t_uid
            update_business.bu_status = update_business.bu_status

        db.session.add(update_business)
        db.session.commit() 
        
        response['status'] = 'success'
        response['business'] = update_business

    except Exception as e:
        response['status'] = 'error'
        response['error_description'] = str(e)

    return response



def UpdateStatusBusiness():
    response = {}

    try:
        bu_uid = request.json.get('bu_uid')
        update_business = Business.query.filter_by(bu_uid = bu_uid).first_or_404()
        if update_business:
            update_business.bu_status = request.json.get('bu_status', update_business.bu_status)
        
        db.session.add(update_business)
        db.session.commit() 
        
        response['status'] = 'success'
        response['business'] = update_business

    except Exception as e:
        response['status'] = 'error'
        response['error_description'] = str(e)

    return response



def DeleteBusiness():

    response = {}
    try:
        uid = request.json.get('bu_uid')
        deletebusiness = Business.query.filter_by(bu_uid=uid).first_or_404()
        if deletebusiness:
            db.session.delete(deletebusiness)
            db.session.commit()

            response['status'] = 'success'

        else:
            response['status'] = 'error'
            response['motif'] = 'utilisateur non trouvé'

    except Exception as e:
        response['error_description'] = str(e)
        response['status'] = 'error'

    return response



def ReadAllBusiness():

    response = {}
    try:
        all_business = Business.query.all()
        business_infos = []
        for business in all_business:
            business_info = {
                'bu_uid': business.bu_uid,              
                'bu_categorie': business.bu_categorie,              
                'bu_type': business.bu_type,              
                'bu_name': business.bu_name,              
                'bu_description': business.bu_description,              
                'bu_city': business.bu_city,              
                'bu_address': business.bu_address,              
                'bu_image1': business.bu_image1,              
                'bu_image2': business.bu_image2,              
                't_uid': business.t_uid,              
                'bu_status': business.bu_status,              
                # 'latitude': business.latitude,              
                # 'longitude': business.longitude,              
            }
            business_infos.append(business_info)

        response['status'] = 'success'
        response ['business'] = business_infos

    except Exception as e:
        response['status'] = 'error'
        response['error_description'] = str(e)

    return response



def ReadSingleBusiness():

    response = {}
    try:
        business_uid = request.json.get('bu_uid')
        single_business = Business.query.filter_by(bu_uid=business_uid).first_or_404()
        business_info = {
                'bu_uid': single_business.bu_uid,              
                'bu_categorie': single_business.bu_categorie,              
                'bu_type': single_business.bu_type,              
                'bu_name': single_business.bu_name,              
                'bu_description': single_business.bu_description,              
                'bu_city': single_business.bu_city,              
                'bu_address': single_business.bu_address,              
                'bu_image1': single_business.bu_image1,              
                'bu_image2': single_business.bu_image2,              
                't_uid': single_business.t_uid,                   
                'bu_status': single_business.bu_status,                   
                # 'latitude': single_business.latitude,              
                # 'longitude': single_business.longitude,                   
        }

        response['status'] = 'success'
        response['business'] = business_info

    except Exception as e:
        response['status'] = 'error'
        response['error_description'] = str(e)

    return response



def ReadAllBusinessByCategories():

    response = {}
    try:
        bu_categorie = request.json.get('bu_categorie')
        all_business = Business.query.filter_by(bu_categorie=bu_categorie).all()
        business_infos = []
        for business in all_business:
            business_info = {
                'bu_uid': business.bu_uid,              
                'bu_categorie': business.bu_categorie,              
                'bu_type': business.bu_type,              
                'bu_name': business.bu_name,              
                'bu_description': business.bu_description,              
                'bu_city': business.bu_city,              
                'bu_address': business.bu_address,              
                'bu_image1': business.bu_image1,              
                'bu_image2': business.bu_image2,              
                't_uid': business.t_uid,              
                'bu_status': business.bu_status,              
                # 'latitude': business.latitude,              
                # 'longitude': business.longitude,               
            }
            business_infos.append(business_info)

        response['status'] = 'success'
        response ['business'] = business_infos

    except Exception as e:
        response['status'] = 'error'
        response['error_description'] = str(e)

    return response



def ReadAllBusinessByTeller():

    response = {}
    try:
        t_uid = request.json.get('t_uid')
        all_business = Business.query.filter_by(t_uid=t_uid).all()
        business_infos = []
        for business in all_business:
            business_info = {
                'bu_uid': business.bu_uid,              
                'bu_categorie': business.bu_categorie,              
                'bu_type': business.bu_type,              
                'bu_name': business.bu_name,              
                'bu_description': business.bu_description,              
                'bu_city': business.bu_city,              
                'bu_address': business.bu_address,              
                'bu_image1': business.bu_image1,              
                'bu_image2': business.bu_image2,              
                't_uid': business.t_uid,              
                'bu_status': business.bu_status,              
                # 'latitude': business.latitude,              
                # 'longitude': business.longitude,               
            }
            business_infos.append(business_info)

        response['status'] = 'success'
        response ['business'] = business_infos

    except Exception as e:
        response['status'] = 'error'
        response['error_description'] = str(e)

    return response

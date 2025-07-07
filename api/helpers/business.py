from flask import jsonify, request
import uuid
from config.db import db
from model.tt import Business, Favoris

from flask import request, jsonify, current_app as app
from sqlalchemy import or_, func
import re
import unicodedata



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

        response['status'] = 'success'
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

        if single_business:
            business_info = {
                'bu_uid': single_business.bu_uid,
                'bu_categorie': single_business.bu_categorie,
                'bu_type': single_business.bu_type,
                'bu_name': single_business.bu_name,
                'bu_description': single_business.bu_description,
                'bu_city': single_business.bu_city,
                'bu_address': single_business.bu_address,
                'bu_image1': str(single_business.bu_image1),
                'bu_image2': str(single_business.bu_image2),
                't_uid': single_business.t_uid,
                'bu_status': single_business.bu_status,
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


def remove_accents(input_str):
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    return ''.join([c for c in nfkd_form if not unicodedata.combining(c)])


def normalize_text(text):
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text).lower()
    return text.split()


import math

def haversine_distance(lat1, lon1, lat2, lon2):
    # Rayon de la Terre en kilomètres
    R = 6371.0

    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c  # distance en km


def SearchBusinessByCategorie():
    response = {}
    try:
        data = request.json
        user_id = data.get('user_id')
        user_latitude = float(data.get('latitude'))
        user_longitude = float(data.get('longitude'))
        text = data.get('textSearch', '').strip()
        print(f"Original text: {text}")
        
        textSearch = remove_accents(text)
        print(f"Text after accent removal: {textSearch}") 
        
        page = int(data.get('page', 1))
        per_page = int(data.get('per_page', 10))

        if not textSearch:
            return jsonify({'status': 'error', 'error_description': 'textSearch is required'}), 400

        normalized_search = [w for w in normalize_text(textSearch) if len(w) > 2]
        print(f"Normalized search terms (len > 2): {normalized_search}")

        matched_businesses = []
        for word in normalized_search:
            word_search = f"%{word}%"
            print(f"Recherche de : {word_search}")
            all_business = Business.query.filter(
                Business.bu_status == 'active',
                or_(
                    Business.bu_categorie.ilike(word_search),
                    Business.bu_name.ilike(word_search),
                    Business.bu_description.ilike(word_search),
                    Business.bu_city.ilike(word_search)
                )
            ).all()
            print(f"{len(all_business)} résultat(s) pour le mot : {word}")
            matched_businesses.extend(all_business)

        matched_businesses = list({business.bu_uid: business for business in matched_businesses}.values())

        if matched_businesses:
            # Ajouter la distance à chaque business
            business_with_distance = []
            for business in matched_businesses:
                if business.latitude is not None and business.longitude is not None:
                    distance = haversine_distance(user_latitude, user_longitude, business.latitude, business.longitude)
                else:
                    distance = 999999.0  # Valeur arbitrairement grande
                business_with_distance.append((business, distance))

            # Trier par distance croissante
            business_with_distance.sort(key=lambda x: x[1])
            total = len(business_with_distance)
            start = (page - 1) * per_page
            end = start + per_page
            paginated_businesses = business_with_distance[start:end]

            business_infos = []
            for business, distance in paginated_businesses:
                all_favs = Favoris.query.filter_by(bu_uid=business.bu_uid, u_uid=user_id).first()
                is_favs = 1 if all_favs else 0
                business_infos.append({
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
                    'is_favs': is_favs,
                    'bu_status': business.bu_status,
                    'latitude': business.latitude,
                    'longitude': business.longitude,
                    'distance_km': round(distance, 2)
                })
            response['status'] = 'success'
            response['business'] = business_infos
            response['textSearch'] = textSearch
            response['total'] = total
            response['pages'] = (total + per_page - 1) // per_page
            response['current_page'] = page
        else:
            response['status'] = 'Not found'
            response['textSearch'] = textSearch

    except Exception as e:
        app.logger.error(f"Error in searchBusinessByCategorie: {str(e)}")
        response['status'] = 'error'
        response['error_description'] = 'An unexpected error occurred.'

    return response, 200

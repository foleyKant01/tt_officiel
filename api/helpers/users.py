from flask_jwt_extended import create_access_token
from datetime import timedelta
from flask import request, jsonify
from helpers.send_mail import send_mailer_pincode
from config.db import db
from model.tt import *
from helpers.business import ReadAllBusinessByCategories
import bcrypt
from flask import request, jsonify
import bcrypt
import random
import string
from geopy.distance import distance, geodesic
from typing import List, Tuple

def calculate_coordinates_within_radius(latitude: float, longitude: float, radius_meters: float, num_points: int) -> List[Tuple[float, float]]:
    """
    Calcule les coordonnées dans un rayon donné autour d'un point central.

    :param latitude: Latitude du point central
    :param longitude: Longitude du point central
    :param radius_meters: Rayon en mètres
    :param num_points: Nombre de points à générer autour du point central
    :return: Liste de tuples contenant les coordonnées (latitude, longitude)
    """
    # Liste pour stocker les coordonnées générées
    coordinates = []

    # Calcul de l'angle entre chaque point
    angle_step = 360 / num_points

    for i in range(num_points):
        # Calcul de l'angle
        angle = i * angle_step

        # Calcul de la nouvelle position
        destination = distance(meters=radius_meters).destination((latitude, longitude), angle)
        coordinates.append((destination.latitude, destination.longitude))

    return coordinates


def find_coordinates_within_interval(
    center_latitude: float,
    center_longitude: float,
    max_radius_meters: float,
    coordinates: List[Tuple[float, float]],
    min_radius_meters: float = 0,
) -> List[Tuple[float, float]]:
    """
    Trouve les coordonnées qui se situent dans un intervalle de distance autour d'un point central.

    :param center_latitude: Latitude du point central
    :param center_longitude: Longitude du point central
    :param coordinates: Liste de tuples contenant les coordonnées (latitude, longitude) à vérifier
    :param min_radius_meters: Distance minimale en mètres (incluse)
    :param max_radius_meters: Distance maximale en mètres (incluse)
    :return: Liste de tuples contenant les coordonnées (latitude, longitude) qui se trouvent dans l'intervalle spécifié
    """
    within_interval = []

    # Point central
    center_point = (center_latitude, center_longitude)

    for coord in coordinates:
        # Coordonnée à vérifier
        point = (coord[0], coord[1])
        
        # Calcul de la distance
        distance = geodesic(center_point, point).meters

        # Vérifier si la distance est dans l'intervalle spécifié
        if min_radius_meters <= distance <= max_radius_meters:
            within_interval.append(coord)

    return within_interval



def test():

    response = {}

    bu_categories = request.json.get('bu_categories')
    ReadAllBusinessByCategories(bu_categories)
    
    # Exemple d'utilisation
    # center_latitude = 5.3587526
    # center_longitude = -3.9253285
    # coordinates = [
    #     (5.3596535, -3.9253285),  # A environ 100 mètres
    #     (5.3578517, -3.9253285),  # A environ 150 mètres (hors de l'intervalle)
    #     (5.3587526, -3.9244276),  # A environ 50 mètres
    #     (5.3587526, -3.9262294),  # A environ 50 mètres
    #     (5.3600000, -3.9250000)   # A environ 200 mètres (hors de l'intervalle)
    # ]

    # result = find_coordinates_within_interval(center_latitude, center_longitude, coordinates)

    # for coord in result:
    #     print(f"Latitude: {coord[0]}, Longitude: {coord[1]}")




    # Exemple d'utilisation
    # latitude = 5.3587526
    # longitude = -3.9253285
    # radius_meters = 100
    # num_points = 5  # Nombre de points à générer autour du cercle

    # coordinates = calculate_coordinates_within_radius(latitude, longitude, radius_meters, num_points)

    # for coord in coordinates:
    #     print(f"Latitude: {coord[0]}, Longitude: {coord[1]}")

    return True



def SaveLocation():
    # Vérifie si le contenu est en JSON
    if request.is_json:
        data = request.get_json()
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        categories = data.get('bu_categories')
        coordinates = Business.query.filter_by(bu_categories = categories).first()
        max_radius_meters = data.get('max_radius_meters')

        if latitude and longitude:
            # result = find_coordinates_within_interval(latitude, longitude, coordinates, max_radius_meters)
            print(f"Latitude: {latitude}, Longitude: {longitude}")
            return jsonify({"status": "Location received", "latitude": latitude, "longitude": longitude})
        else:
            return jsonify({"status": "error", "message": "Missing latitude or longitude"}), 400
    else:
        return jsonify({"status": "error", "message": "Content-Type must be application/json"}), 400


   
def CreateUser():

    reponse = {}
    try:
        u_username = (request.json.get('u_username'))
        u_mobile = (request.json.get('u_mobile'))      
        u_city = (request.json.get('u_city'))
        u_address = (request.json.get('u_address'))
        u_email = (request.json.get('u_email'))
        u_password = (request.json.get('u_password'))

        hashed_password = bcrypt.hashpw(u_password.encode('utf-8'), bcrypt.gensalt())
        
        new_user = User()
        new_user.u_username = u_username
        new_user.u_mobile = u_mobile
        new_user.u_address = u_address
        new_user.u_email = u_email
        new_user.u_password = hashed_password
        new_user.u_city = u_city
        
        db.session.add(new_user)
        db.session.commit()

        rs = {}
        rs['u_username'] = u_username
        rs['u_mobile'] = u_mobile
        rs['u_address'] = u_address
        rs['u_email'] = u_email
        rs['u_city'] = u_city
        rs['u_uid'] = new_user.u_uid

        reponse['status'] = 'success'
        reponse['user_infos'] = rs

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def ReadAllUser():

    reponse = {}
    try:
        all_user = User.query.all()
        if all_user:
            user_informations = []

            for user in all_user:
                user_infos = {
                    'u_username': user.u_username,
                    'u_mobile': user.u_mobile,
                    'u_address': user.u_address,
                    'u_email': user.u_email,                    
                    'u_city': user.u_city, 
                    'u_uid': user.u_uid,
                }
                user_informations.append(user_infos)
            reponse['status'] = 'success'
            reponse ['users'] = user_informations
        else:
            reponse['status'] = 'erreur'
            reponse['motif'] = 'aucun'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def ReadSingleUser():

    reponse = {}
    try:
        uid = request.json.get('u_uid')
        single_user = User.query.filter_by(u_uid = uid).first_or_404()
        user_infos = {
            'u_username': single_user.u_username,
            'u_mobile': single_user.u_mobile,
            'u_address': single_user.u_address,
            'u_email': single_user.u_email,                    
            'u_city': single_user.u_city, 
            'u_uid': single_user.u_uid,
        }
        reponse['status'] = 'success'
        reponse['user'] = user_infos

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def UpdateUser  ():

    reponse = {}
    try:
        uid = request.json.get('u_uid')
        update_user = User.query.filter_by(u_uid = uid).first_or_404()

        update_user.u_username = request.json.get('u_username', update_user.u_username)            
        update_user.u_mobile = request.json.get('u_mobile', update_user.u_mobile)
        update_user.u_address = request.json.get('u_address', update_user.u_address)
        update_user.u_email = request.json.get('u_email', update_user.u_email)
        update_user.u_password = request.json.get('u_city', update_user.u_password)
        update_user.u_city = request.json.get('u_uid', update_user.u_city)

        db.session.add(update_user)
        db.session.commit()

        reponse['status'] = 'Succes'
        reponse['user'] = update_user


    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse


def DeleteUser():

    reponse = {}
    try:
        uid = request.json.get('u_uid')
        deleteuser = User.query.filter_by(u_uid=uid).first_or_404()

        db.session.delete(deleteuser)
        db.session.commit()
        reponse['status'] = 'success'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def LoginUser():
    reponse = {}

    try:
        username = request.json.get('username')
        password = request.json.get('password')

        login_user = User.query.filter_by(u_username=username).first()

        if login_user and bcrypt.checkpw(password.encode('utf-8'), login_user.u_password.encode('utf-8')):
            expires = timedelta(hours=1)
            access_token = create_access_token(identity=username)

            rs = {}
            rs['u_username'] = login_user.u_username
            rs['u_mobile'] = login_user.u_mobile
            rs['u_address'] = login_user.u_address
            rs['u_email'] = login_user.u_email
            rs['u_city'] = login_user.u_city
            rs['u_uid'] = login_user.u_uid

            reponse['status'] = 'success'
            reponse['message'] = 'Login successful'
            reponse['user_infos'] = rs
            reponse['access_token'] = access_token

        else:
            reponse['status'] = 'error'
            reponse['message'] = 'Invalid username or password'

    except Exception as e:
        reponse['status'] = 'error'
        reponse['message'] = str(e)

    return reponse



def generate_temp_password(length=8):
    digits = string.digits  # '0123456789'
    return ''.join(random.choice(digits) for _ in range(length))


def ForgotPassword():
    response = {}
    try:
        u_email = request.json.get('u_email')
        if not u_email:
            response['status'] = 'error'
            response['message'] = 'Adresse email manquante.'
            return response
        single_user = User.query.filter_by(u_email=u_email).first()
        if not single_user:
            response['status'] = 'error'
            response['message'] = "Aucun utilisateur trouver avec cet email."
            return response
        temp_password = generate_temp_password()
        hashed_password = bcrypt.hashpw(temp_password.encode('utf-8'), bcrypt.gensalt())

        single_user.u_password = hashed_password
        db.session.commit()

        try:
            send_mailer_pincode(single_user.u_email, temp_password)

            response['status'] = 'success'
            response['message'] = 'Envoi du code de réinitialisation réussit'
            response['u_email'] = u_email 

        except Exception as e:
            response['status'] = 'error'
            response['message'] = str(e)

    except Exception as e:
        response['status'] = 'error'
        response['message'] = str(e)

    return response


def SaveNewPassword():
    response = {}
    try:
        u_email = request.json.get('u_email')
        temp_password = request.json.get('temp_password')
        new_password = request.json.get('new_password')
        confirm_password = request.json.get('confirm_password')
        if new_password != confirm_password:
            response['status'] = 'error'
            response['message'] = "Les mots de passe ne correspondent pas."
            return response
        single_user = User.query.filter_by(u_email=u_email).first()
        if not single_user:
            response['status'] = 'error'
            response['message'] = "Aucun utilisateur avec cet email."
            return response
        if single_user and bcrypt.checkpw(temp_password.encode('utf-8'), single_user.u_password.encode('utf-8')):
            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            single_user.u_password = hashed_password
            db.session.commit()
            response['status'] = 'success'
            response['message'] = 'Mot de passe réinitialisé avec succès.'
        else:
            response['status'] = 'error'
            response['message'] = 'Code temporaire invalide'

    except Exception as e:
        response['status'] = 'error'
        response['message'] = str(e)

    return response
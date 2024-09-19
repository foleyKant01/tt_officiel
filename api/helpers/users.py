from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta
from flask import request, jsonify
import uuid
from config.db import db
from model.tt import *
from helpers.business import ReadAllBusinessByCategories
import bcrypt, jwt
from werkzeug.security import check_password_hash
from flask import Flask, request, jsonify
from geopy.geocoders import Nominatim
from flask_cors import CORS

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
        u_fullname = (request.json.get('fullname'))
        u_username = (request.json.get('username'))
        u_mobile = (request.json.get('mobile'))      
        u_address = (request.json.get('address'))
        u_email = (request.json.get('email'))
        u_password = (request.json.get('password'))
        u_city = (request.json.get('city'))
        u_uid = str(uuid.uuid4())

        hashed_password = bcrypt.hashpw(u_password.encode('utf-8'), bcrypt.gensalt())
        
        new_user = User()
        new_user.u_fullname = u_fullname
        new_user.u_username = u_username
        new_user.u_mobile = u_mobile
        new_user.u_address = u_address
        new_user.u_email = u_email
        new_user.u_password = hashed_password
        new_user.u_city = u_city
        new_user.u_uid = u_uid
        
        db.session.add(new_user)
        db.session.commit()

        reponse['status'] = 'Succes'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def ReadAllUser():
    reponse = {}

    try:
        readAllUser = User.query.all()

        if readAllUser:
            user_informations = []

            for user in readAllUser:
                user_infos = {
                    'u_uid': user.u_uid,
                    'fullname': user.u_fullname,
                    'username': user.u_username,
                    'mobile': user.u_mobile,
                    'address': user.u_address,
                    'email': user.u_email,                    
                    'city': user.u_city, 
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

        readSingleUser = User.query.filter_by(u_uid = uid).first()

        if readSingleUser:
            user_infos = {
                'u_uid': readSingleUser.u_uid,
                'fullname': readSingleUser.u_fullname,
                'username': readSingleUser.u_username,
                'mobile': readSingleUser.u_mobile,
                'address': readSingleUser.u_address,
                'email': readSingleUser.u_email,                    
                'city': readSingleUser.u_city, 
            }

            reponse['status'] = 'success'
            reponse['user'] = user_infos
        else:
            reponse['status'] = 'erreur'
            reponse['motif'] = 'aucun'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def UpdateUser  ():
    reponse = {}

    try:
        uid = request.json.get('u_uid')
        
        updateuser = User.query.filter_by(u_uid = uid).first()

        if updateuser:
            updateuser.u_fullname = request.json.get('fullname', updateuser.u_fullname)
            updateuser.u_username = request.json.get('username', updateuser.u_username)            
            updateuser.u_mobile = request.json.get('mobile', updateuser.u_mobile)
            updateuser.u_address = request.json.get('address', updateuser.u_address)
            updateuser.u_email = request.json.get('email', updateuser.u_email)
            updateuser.u_password = request.json.get('password', updateuser.u_password)
            updateuser.u_city = request.json.get('city', updateuser.u_city)

            db.session.add(updateuser)
            db.session.commit()

            reponse['status'] = 'Succes'
        else:
            reponse['status'] = 'User not found'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse


def DeleteUser():
    reponse = {}

    try:
        uid = request.json.get('u_uid')

        deleteuser = User.query.filter_by(u_uid=uid).first()

        if deleteuser:
            db.session.delete(deleteuser)
            db.session.commit()
            reponse['status'] = 'success'
        else:
            reponse['status'] = 'error'
            reponse['motif'] = 'utilisateur non trouvé'

    except Exception as e:
        reponse['error_description'] = str(e)
        reponse['status'] = 'error'

    return reponse



def LoginUser():
    reponse = {}
    reponses = {}

    try:
        username = request.json.get('username')
        password = request.json.get('password')

        login_user = User.query.filter_by(u_username=username).first()

        if login_user and bcrypt.checkpw(password.encode('utf-8'), login_user.u_password.encode('utf-8')):
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

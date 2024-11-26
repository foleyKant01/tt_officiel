from ipaddress import ip_address
from flask_restful import Resource
from helpers.admin import *
from flask import request


class AdminApi(Resource):
    def post(self, route):
        if route == "create":
            return CreateAdmin()
        
        if route == "login":
            return LoginAdmin()
        
        # if route == "readsingle":
        #     return ReadSinglAdmin()

    
    def get(self, route):
        if route == "readall":
            return ReadAllAdmin

    
    # def delete(self, route):
    #      if route == "delete":
    #         return DeletAdmin()
         
    # def patch(self, route):
    #     if route == "update":
    #         return UpdatAdmin()
        
from flask_restful import Resource
from helpers.business import *
from flask import request


class BusinessApi(Resource):
    def post(self, route):
        if route == "createbusiness":
            return CreateBusiness()
    
    def get(self, route):
        if route == "readallbusiness":
            return ReadAllBusiness()

        if route == "readsinglebusiness":
            return ReadSingleBusiness()
        
        if route == "readsinglebusinessbycategories":
            return ReadAllBusinessByCategories()
    
    def delete(self, route):
         if route == "deletebusiness":
            return DeleteBusiness()
         
    def patch(self, route):
        if route == "updatebusiness":
            return UpdateBusiness()
        
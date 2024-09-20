from flask_restful import Resource
from helpers.business import *
from flask import request


class BusinessApi(Resource):
    def post(self, route):
        if route == "createbusiness":
            return CreateBusiness()
        
        if route == "readsinglebusiness":
            return ReadSingleBusiness()
        
        if route == "readsinglebusinessbycategories":
            return ReadAllBusinessByCategories()

        if route == "deletebusiness":
            return DeleteBusiness()
        
        if route == "updatebusiness":
            return UpdateBusiness()
    
    def get(self, route):
        if route == "readallbusiness":
            return ReadAllBusiness()
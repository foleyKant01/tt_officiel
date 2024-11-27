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
            
        if route == "readallbusinessbyteller":
            return ReadAllBusinessByTeller()

        
    def get(self, route):
        if route == "readallbusiness":
            return ReadAllBusiness()
        
        
    def delete(self, route):
        if route == "deletebusiness":
            return DeleteBusiness()

         
    def patch(self, route):
        if route == "updatebusiness":
            return UpdateBusiness()
        
        if route == "updatestatusbusiness":
            return UpdateStatusBusiness()
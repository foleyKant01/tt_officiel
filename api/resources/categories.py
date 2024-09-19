from flask_restful import Resource
import json
from helpers.categories import *
from flask import request


class CategoriesApi(Resource):
    def post(self, route):
        if route == "createcategorie":
            return CreateCategories()
    
        if route == "readsinglecategorie":
            return ReadSingleCategories()
        
        
    def get(self, route):
        if route == "readallcategorie":
            return ReadAllCategories()

    
    def delete(self, route):
         if route == "deletecategorie":
            return DeleteCategories()
         
    def patch(self, route):
        if route == "updatecategorie":
            return UpdateCategories()
        
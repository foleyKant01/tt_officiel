from flask_restful import Resource, Api
import json
from helpers.advertisement import *
from flask import request


class AdvertisementApi(Resource):
    def post(self, route):
        if route == "createadvertisement":
            return CreateAdvertisement()
    
    def get(self, route):
        if route == "readalladvertisement":
            return ReadAllAdvertisement()

        if route == "readsingleadvertisement":
            return ReadSingleAdvertisement()
    
    def delete(self, route):
         if route == "deleteadvertisement":
            return DeleteAdvertisement()
         
    def patch(self, route):
        if route == "updateadvertisement":
            return UpdateAdvertisement()
        
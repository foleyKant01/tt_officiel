from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask import Flask, render_template
import os
from flask_restful import Resource, Api
from config.db import db
from config.constant import *
from model.tt import *
from resources.admin import AdminApi
from resources.users import UsersApi
from resources.teller import TellerApi
from resources.advertisement import AdvertisementApi 
from resources.business import BusinessApi
from resources.categories import CategoriesApi
from resources.historiques import HistoriquesApi
from flask_migrate import Migrate
from flask_cors import CORS



app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'super-secret'
jwt = JWTManager(app)

app.secret_key = os.urandom(24)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = LIEN_BASE_DE_DONNEES
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False


db.init_app(app)

migrate = Migrate(app, db)
api = Api(app)



@app.route('/a')    
def home():
    print('Trouvez Tous Officiel')
    return render_template('index.html')

CORS(app)

api.add_resource(AdminApi, '/api/admin/<string:route>', endpoint='all_admin', methods=['GET', 'POST', 'DELETE', 'PATCH'])
api.add_resource(UsersApi, '/api/user/<string:route>', endpoint='all_user', methods=['GET', 'POST', 'DELETE', 'PATCH'])
api.add_resource(TellerApi, '/api/teller/<string:route>', endpoint='all_teller', methods=['GET', 'POST', 'DELETE', 'PATCH'])
api.add_resource(AdvertisementApi, '/api/advertisement/<string:route>', endpoint='all_advertisement', methods=['GET', 'POST', 'DELETE', 'PATCH'])
api.add_resource(BusinessApi, '/api/business/<string:route>', endpoint='all_business', methods=['GET', 'POST', 'DELETE', 'PATCH'])
api.add_resource(CategoriesApi, '/api/categorie/<string:route>', endpoint='all_categiries', methods=['GET', 'POST', 'DELETE', 'PATCH'])
api.add_resource(HistoriquesApi, '/api/historiques/<string:route>', endpoint='all_historiques', methods=['GET', 'POST', 'DELETE', 'PATCH'])

if __name__ == '__main__':
    app.run(debug=True,  host="0.0.0.0")  
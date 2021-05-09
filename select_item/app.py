from chalice import Chalice 
from chalicelib import select

app = Chalice(app_name='capstone2021')


@app.route('/')
def index():
    return {'hello': 'UtoPR'}



@app.route('/recommend')
# @app.route('/recommend')
def selectN():
    """
    default 
    query 예시 
    http://127.0.0.1:8000/recommend?psc=winter&category=lip
    """
    psc = ""
    category = ""
    N = 3

    params = app.current_request.query_params

    try:
        if 'psc' in params:
            psc = params['psc']
        if 'category' in params :
            category = params['category']
    except:
        pass
    print(psc , " : ",category)
    show_info = select.select_act(N,psc,category)

    return show_info



# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @app.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#

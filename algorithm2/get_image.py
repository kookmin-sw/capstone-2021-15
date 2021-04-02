import os
import json
import requests

with open('./images/items.json') as f:
    json_data = json.load(f)
    for data in json_data:
        image_url = data["img-url"]

        image = requests.get(image_url)
        img = Image.open(BytesIO(res.content))

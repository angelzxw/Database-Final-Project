import requests
import json

from api_key import client_id, client_secret

api_url = "https://api.artsy.net/api"


def get_token():
    token_url = "{}/tokens/xapp_token".format(api_url)
    r = requests.post(token_url, data={"client_id": client_id, "client_secret": client_secret})
    content = r.json()
    return content["token"]


def get_artists(path,size):
    artist_url = "{}/artists".format(api_url)
    r = requests.get(artist_url, headers={"X-XAPP-Token": token}, data={"size":size})
    content = r.json()
    data = []
    fields = ["id","name","gender","biography","birthday","deathday","hometown","location","nationality","image_versions"]
    artists = content["_embedded"]["artists"]
    for artist in artists:
        item = {}
        for field in fields:
            if field in artist:
                item[field] = artist[field]
            else:
                item[field] = ""
        links = artist["_links"]
        if "image" in links:
            item["image"] = links["image"]["href"]
        else:
            item["image"] = ""
        if "thumbnail" in links:
            item["thumbnail"] = links["thumbnail"]["href"]
        else:
            item["thumbnail"] = ""
        data.append(item)
    with open(path, "w") as outfile:
        json.dump(data, outfile)
    return content


def get_artworks(path, size):
    artworks_url = "{}/artworks".format(api_url)
    data = []
    fields = ["id", "title", "category", "medium", "date", "dimensions", "collecting_institution",
              "additional_information", "image_rights","iconicity","can_inquire","can_acquire","can_share","sale_message","sold","image_versions"]
    r = requests.get(artworks_url, headers={"X-XAPP-Token": token}, data={"size": size})
    content = r.json()
    artworks = content["_embedded"]["artworks"]
    for artwork in artworks:
        item = {}
        for field in fields:
            if field in artwork:
                item[field] = artwork[field]
            else:
                item[field] = ""
        item["image"] = artwork["_links"]["image"]["href"]
        item["thumbnail"] = artwork["_links"]["thumbnail"]["href"]
        data.append(item)
    with open(path, "w") as outfile:
        json.dump(data, outfile)


if __name__ == "__main__":
    token = get_token()
    get_artworks("./artworks.json", 100)
    get_artists("./artists.json",100)

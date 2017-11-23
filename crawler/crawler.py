import requests
import json

# from api_key import client_id, client_secret
from bs4 import BeautifulSoup

api_url = "https://api.artsy.net/api"


def get_token():
    token_url = "{}/tokens/xapp_token".format(api_url)
    r = requests.post(token_url, data={"client_id": client_id, "client_secret": client_secret})
    content = r.json()
    return content["token"]


def get_artists(path, size):
    artist_url = "{}/artists".format(api_url)
    r = requests.get(artist_url, headers={"X-XAPP-Token": token}, data={"size": size})
    content = r.json()
    data = []
    fields = ["id", "name", "gender", "biography", "birthday", "deathday", "hometown", "location", "nationality",
              "image_versions"]
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
              "additional_information", "image_rights", "iconicity", "can_inquire", "can_acquire", "can_share",
              "sale_message", "sold", "image_versions"]
    next_url = ""
    count = 0
    while len(data) < size:
        if not next_url:
            r = requests.get(artworks_url, headers={"X-XAPP-Token": token}, data={"size": size})
        else:
            r = requests.get(next_url, headers={"X-XAPP-Token": token}, data={"size": size})
        content = r.json()
        artworks = content["_embedded"]["artworks"]
        if "next" in content["_links"]:
            next_url = content["_links"]["next"]["href"]
        else:
            break
        count += len(artworks)
        print count
        for artwork in artworks:
            if not artwork["sale_message"]:
                continue
            # if not artwork["sold"]:
            #     continue
            print("found")
            item = {}
            for field in fields:
                if field in artwork:
                    item[field] = artwork[field]
                else:
                    item[field] = ""
            links = artwork["_links"]
            if "image" in links:
                item["image"] = links["image"]["href"]
            else:
                item["image"] = ""
            if "thumbnail" in links:
                item["thumbnail"] = links["thumbnail"]["href"]
            else:
                item["thumbnail"] = ""
            # item["image"] = artwork["_links"]["image"]["href"]
            # item["thumbnail"] = artwork["_links"]["thumbnail"]["href"]
            data.append(item)
    # r = requests.get(artworks_url, headers={"X-XAPP-Token": token}, data={"size": size})
    # content = r.json()
    # artworks = content["_embedded"]["artworks"]
    # print(len(artworks))
    # for artwork in artworks:
    #     # if not artwork["sale_message"]:
    #     #     continue
    #     item = {}
    #     for field in fields:
    #         if field in artwork:
    #             item[field] = artwork[field]
    #         else:
    #             item[field] = ""
    #     links = artwork["_links"]
    #     if "image" in links:
    #         item["image"] = links["image"]["href"]
    #     else:
    #         item["image"] = ""
    #     if "thumbnail" in links:
    #         item["thumbnail"] = links["thumbnail"]["href"]
    #     else:
    #         item["thumbnail"] = ""
    #     # item["image"] = artwork["_links"]["image"]["href"]
    #     # item["thumbnail"] = artwork["_links"]["thumbnail"]["href"]
    #     data.append(item)
    with open(path, "w") as outfile:
        json.dump(data, outfile)

artists = set([])
def get_artworks_from_zatista(path,size):
    data = []
    page = 1
    fields = ["height","width","size","is_sold","img","title","type","price","artist_unique_name","artist_name","medium","product_id","artist_id"]
    while len(data) < size:
        r = requests.post("https://www.zatista.com/search/searchProducts",data={"type":"Painting","page":page,"sort":"Closest Match","price[min_price]":0,"price[max_price]":1000050,"source":"search"})
        content = r.json()
        artworks = content["products"]
        page += 1
        if len(artworks) == 0:
            break
        for artwork in artworks:
            item = {}
            for field in fields:
                item[field] = artwork[field]
            artists.add((item["artist_unique_name"],item["artist_id"]))
            data.append(item)
    # print(len(data))
    with open(path, "w") as outfile:
        json.dump(data, outfile)

def get_artists_from_zatista(path):
    data = []
    for artist,artist_id in artists:
        try:
            r = requests.get("https://www.zatista.com/artist/{}".format(artist))
            soup = BeautifulSoup(r.content, 'html.parser')
            artist_content = soup.find(class_="artist-content")
        # avator = soup.find(class_="artist-image").find("img")["src"]
        # name = artist_content.find(class_="name").get_text(strip=True)
        # address = artist_content.find(class_="address").get_text(strip=True)
        # self_intro = artist_content.find("p").get_text(strip=True)
            artist_about = soup.find(class_="about-artist-block")
        # gender = artist_about.contents[1].contents[3].get_text(strip=True)
        # statement = artist_about.contents[3].contents[3].get_text(strip=True)
        # education = artist_about.contents[5].contents[3].get_text(strip=True)
        # tags = artist_about.contents[7].contents[3].get_text(strip=True).split(",")
            about = {}
            about_title_nodes = artist_about.find_all(class_="artist-block-head")
            about_content_nodes = artist_about.find_all(class_="artist-block-content")
            for title,content in zip(about_title_nodes,about_content_nodes):
                title = title.get_text(strip=True).rstrip(":")
                content = content.get_text(strip=True)
                about[title] = content
            item = {
                "artist_id":artist_id,
                "avator":soup.find(class_="artist-image").find("img")["src"],
                "name":artist_content.find(class_="name").get_text(strip=True),
                "address":artist_content.find(class_="address").get_text(strip=True),
                "self_intro":artist_content.find("p").get_text(strip=True),
            }
            item.update(about)
            data.append(item)
        except AttributeError:
            print("could not fetch artists {}".format(artist))
    with open(path, "w") as outfile:
        json.dump(data, outfile)
if __name__ == "__main__":
    #token = get_token()
    get_artworks_from_zatista("./artworks.json",100)
    f = open("./artist_list.json","w")
    json.dump(artists, f)
    get_artists_from_zatista("./artists.json")
    # get_artworks("./artworks.json", 1000)
    # get_artists("./artists.json",100)

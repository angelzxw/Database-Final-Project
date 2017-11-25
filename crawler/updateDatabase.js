/**
 * Created by kai on 25/11/2017.
 */

const { addArtist,addPainting }  = require("../controllers/database");
var fs = require('fs');

function updateArtists() {
    fs.readFile("./artists.json","utf8",function (err,data) {
        if(err)
            throw err;
        const artists = JSON.parse(data);
        for(let artist of artists){
            //console.log(artist);
            addArtist(artist["artist_id"],artist["avator"],artist["name"],artist["address"],artist["self_intro"],artist["Gender"]);
        }
    });
}

function updateArtworks() {
    fs.readFile("./artworks.json","utf8",function (err,data) {
        if(err)
            throw err;
        const artworks = JSON.parse(data);
        for(let artwork of artworks){
            //console.log(artist);
            const height = artwork["height"].replace("\"","");
            const width = artwork["width"].replace("\"","");
            addPainting(artwork["product_id"],artwork["artist_id"],artwork["price"],height,width,artwork["img"],artwork["title"],artwork["type"]);
        }
    });
}
updateArtworks();


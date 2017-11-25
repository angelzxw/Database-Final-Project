/**
 * Created by kai on 25/11/2017.
 */

const { addArtist,addPainting }  = require("../controllers/database");
var fs = require('fs');

fs.readFile("./artists.json","utf8",function (err,data) {
   if(err)
       throw err;
   const artists = JSON.parse(data);
   for(let artist of artists){
	//console.log(artist);
       addArtist(artist["artist_id"],artist["avator"],artist["name"],artist["address"],artist["self_intro"],artist["Gender"]);
   }
});



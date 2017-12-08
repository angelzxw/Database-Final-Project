const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg');
const cryptType = 'bf';
const connectionString = 'dbuser://localhost:5432/gallery';
const {dbuser,dbpassword} = require("../dbconfig");
//const pool = new Pool({
//    connectionString: connectionString,
//});
const pool = new Pool({
  user: dbuser,
  host: 'ec2-13-58-21-188.us-east-2.compute.amazonaws.com',
  database: 'gallery',
  password: dbpassword,
  port: 5432,
  ssl:true
});

function addArtist(artist_id, avator, name, address, self_intro, gender){
    pool.connect((err, client, done) => {
        if(err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in addArtist', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;

            const insertArtist = 'INSERT INTO Artist(artist_id, avator, name, address, self_intro, gender) VALUES($1, $2, $3, $4, $5, $6)';
            const insertValues = [artist_id, avator, name, address, self_intro, gender];
            client.query(insertArtist, insertValues, (err, res) => {
                if (shouldAbort(err)) return;

                client.query('COMMIT', (err) => {
                    if (err) {
                        console.error('Error committing transaction: insert artist', err.stack);
                    }
                    done();
                })
            })
        });
    });
}

function addPainting(painting_id, artist_id, price, height, width, img, title, type){
    pool.connect((err, client, done) => {
        if (err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in addPainting', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;

            const insertPainting = 'INSERT INTO Painting(painting_id, artist_id, price, height, width, img, title, type) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
            const insertValues = [painting_id, artist_id, price, height, width, img, title, type];
            client.query(insertPainting, insertValues, (err, res) => {
                if (shouldAbort(err)) return;

                client.query('COMMIT', (err) => {
                    if (err) {
                        console.error('Error committing transaction: insert painting', err.stack);
                    }
                    done();
                })
            })
        });
    });
}

function addCustomer(name, email, password){
    pool.connect((err, client, done) => {
        if (err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in addCustomer', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;

            const insertCustomer = 'INSERT INTO Customer(name, email, password) VALUES($1, $2, crypt($3, gen_salt($4)))';
            const insertValues = [name, email, password, cryptType];
            client.query(insertCustomer, insertValues, (err, res) => {
                if (shouldAbort(err)) return;

                client.query('COMMIT', (err) => {
                    if (err) {
                        console.error('Error committing transaction: insert painting', err.stack);
                    }
                    done();
                })
            })
        });
    });
}

function addBuy(customer_id, painting_id){
    pool.connect((err, client, done) => {
        if (err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in addBuy', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;

            const insertBuy = 'INSERT INTO Buy(customer_id, painting_id) VALUES($1, $2)';
            const insertValues = [customer_id, painting_id];
            client.query(insertBuy, insertValues, (err, res) => {
                if (shouldAbort(err)) return;

                client.query('COMMIT', (err) => {
                    if (err) {
                        console.error('Error committing transaction: insert buy', err.stack);
                    }
                    done();
                })
            })
        });
    });
}
//pool.end();
// getAllArtists(function (err,data) {
//     console.log(data);
// });
function getAllArtists(callback) {
    pool.connect((err, client, done) => {
        if(err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in getAllArtists', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };


        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;
            const query = "SELECT * FROM ARTIST";
            const values = [];
            client.query(query, values, (err, res) => {
                 if (shouldAbort(err)) return;
                 data = res.rows;
                 data.sort(function (a,b) {
                     return a.name.localeCompare(b.name);
                 });
                callback(err, err ? [] : data);
            })
        });

    });
}


getNArtists(1,5,function (err,data) {
    console.log(data);
});

function getNArtists(page,n,callback) {
    pool.connect((err, client, done) => {
        if(err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in getAllArtists', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };


        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;
            const query = "SELECT DISTINCT(a.artist_id),a.avator,a.name,a.self_intro,p.img FROM ARTIST as a join Painting as p on a.artist_id = p.artist_id LIMIT $1 OFFSET $2";
            //const query = "SELECT * FROM ARTIST LIMIT $1 OFFSET $2";
            const values = [n,page*n];
            client.query(query, values, (err, res) => {
                if (shouldAbort(err)) return;
                data = res.rows;
                console.log(data);
                data.sort(function (a,b) {
                    return a.name.localeCompare(b.name);
                });
                callback(err, err ? [] : data);
            })
        });

    });
}

//getArtsByID(9208);

function getArtistByID(artist_id, callback) {
    pool.connect((err, client, done) => {
        if(err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in getArtistByID', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;
            const query = "SELECT * FROM ARTIST WHERE artist_id = $1";
            const values = [artist_id];
            client.query(query, values, (err, res) => {
                if (shouldAbort(err)) return;
                callback(err, res.rows);
            })
        });
    });
}

// getAllArts(function (err,data) {
//     console.log(data);
// });
function getAllArts(callback) {
    pool.connect((err, client, done) => {
        if(err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in getAllArts', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;
            const query = "SELECT * FROM Painting as p join ARTIST as a on p.artist_id = a.artist_id";
            const values = [];
            client.query(query, values, (err, res) => {
                if (shouldAbort(err)) return;
                data = res.rows;
                data.sort(function (a,b) {
                    return a.title.localeCompare(b.title);
                });
               callback(err, data);
            })
        });
    });
}

// getNArts(1,5,function (err,data) {
//    console.log(data);
// });
function getNArts(page,n,callback) {
    pool.connect((err, client, done) => {
        if(err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in getAllArts', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;
            const query = "SELECT * FROM Painting as p join ARTIST as a on p.artist_id = a.artist_id LIMIT $1 OFFSET $2";
            const values = [n,n*page];
            client.query(query, values, (err, res) => {
                if (shouldAbort(err)) return;
                data = res.rows;
                data.sort(function (a,b) {
                    return a.title.localeCompare(b.title);
                });
                callback(err, data);
            })
        });
    });
}
//getArtByArtistID(9208);
function getArtByArtistID(artist_id, callback) {
    pool.connect((err, client, done) => {
        if(err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in getArtByArtistID', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;
            const query = "SELECT p.painting_id, p.artist_id, p.price, p.height, p.width, p.img, p.title, p.type FROM ARTIST as a join Painting as p on a.artist_id=p.artist_id WHERE a.artist_id = $1";
            const values = [artist_id];
            client.query(query, values, (err, res) => {
                if (shouldAbort(err)) return;
                callback(err, err ? [] : data);
            })
        });
    });
}

function getArtByID(painting_id, callback) {
    pool.connect((err, client, done) => {
        if(err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in getArtistByID', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;

            const query = "SELECT * FROM Painting as p join ARTIST as a on p.artist_id = a.artist_id WHERE p.painting_id = $1";
            const values = [painting_id];
            client.query(query, values, (err, res) => {
                if (shouldAbort(err)) return;
                // console.log("query result", res.rows);
                callback(err, res.rows);
            })
        });
    });
}

//getNArtByArtistID(10,9208);
function getNArtByArtistID(n,artist_id, exclude_id, callback) {
    exclude_id = exclude_id == undefined ? -1 : exclude_id;
    pool.connect((err, client, done) => {
        if(err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in getArtByArtistID', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;
            const query = "SELECT p.painting_id, p.artist_id, p.price, p.height, p.width, p.img, p.title, p.type FROM ARTIST as a join Painting as p on a.artist_id=p.artist_id WHERE a.artist_id = $1 AND p.painting_id != $2 LIMIT $3";
            console.log("query is :", query);
            const values = [artist_id, exclude_id, n];
            console.log("get nArtUsingID params", values);
            client.query(query, values, (err, res) => {
                if (shouldAbort(err)) return;
                console.log("model getnartfromaritstid result: ", res.rows);
                callback(err, res.rows);
            })
        });
    });
}


// getArtByKeyword("Me",function (err,data) {
//     console.log(data);
// });

function getArtByKeyword(keyword,callback) {
    pool.connect((err, client, done) => {
        if(err) throw err;

        client.query('BEGIN', (err) => {
            // if (shouldAbort(err)) return;
            const query = `SELECT p FROM Painting as p join Artist as a on p.artist_id = a.artist_id WHERE p.title ~* '.*${keyword}.*' or a.name ~* '.*${keyword}.*'`;
            const values = [];
            client.query(query, values, (err, res) => {
                //console.log(err);
                callback(err, err?[]:res.rows);
            })
        });
    });
}
module.exports = {
    router,addArtist,addPainting,addCustomer,addBuy,getAllArtists,getArtistByID,getAllArts,getArtByID,getArtByArtistID,getNArtByArtistID,getArtByKeyword,getNArts,getNArtists
};

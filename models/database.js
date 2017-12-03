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
  host: 'localhost',
  database: 'gallery',
  password: dbpassword,
  port: 5432,
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


function getAllArtists(){
    console.log("model getAllArtists");
    pool.connect((err, client, done) => {
        if (err) throw err;

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

            const insertBuy = 'SELECT * FROM Artist';
            console.log("call function");
            client.query(insertBuy, (err, res) => {
                return res;
            })
        });
    });
}

//pool.end();

module.exports = {
    router,addArtist,addPainting,addCustomer,addBuy, getAllArtists,
};

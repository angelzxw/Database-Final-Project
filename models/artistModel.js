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

module.exports = {
    router,addArtist,getAllArtists
};
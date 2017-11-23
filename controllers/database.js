const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg');
const cryptType = 'bf';
const connectionString = 'postgres://localhost:5432/gallery';

const pool = new Pool({
    connectionString: connectionString,
});

function addArtist(name, url, address){
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

        const insertArtist = 'INSERT INTO Artist(name, url, address) VALUES($1, $2, $3)';
        const insertValues = [name, url, address];
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
}

function addPainting(name, year, price){
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

        const insertPainting = 'INSERT INTO Painting(name, year, price) VALUES($1, $2, $3)';
        const insertValues = [name, year, price];
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
}

function addCustomer(name, email, password){
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
        const insertValues = [name, year, price, cryptType];
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
}

pool.end();


module.exports = router;
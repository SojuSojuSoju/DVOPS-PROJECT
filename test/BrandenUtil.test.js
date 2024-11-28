const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let baseUrl;

describe('BrandenUtil Api', () => {
    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address == '::' ? 'localhost' : address}:${port}`;
    });
    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });
    let count = 0

    describe('GET /view-blog', () => {
        it('should return all blogs', (done) => {
            chai.request(baseUrl)
                .get('/view-blog')
                .end((err, res) => {
                    count = res.body.length;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
    
});

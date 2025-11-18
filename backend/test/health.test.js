import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Health Route', () => {
    it('should return server running message', (done) => {
        chai.request(app)
            .get('/health')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Server is running');
                done();
            });
    });
});

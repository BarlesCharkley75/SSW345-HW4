const chai = require('chai');

const { assert } = chai;
const { expect } = chai;

process.env.NODE_ENV = 'test';
const github = require('../index');

// Turn off logging
console.log = function () {};

describe('GitHub EndPoint Tests', function () {
  this.timeout(5000);
  it('listAuthenicatedUserRepos returns repo objects', async () => {
    const repos = await github.listAuthenicatedUserRepos();
    expect(repos).to.be.an('array').that.have.nested.property('[1].owner.login');
  });

  it('listBranches returns list branches', async () => {
    const user = await github.getUser();
    const repos = await github.listBranches(user, 'SSW345-HW4');
    expect(repos).to.be.an('array').that.have.nested.property('[0].name').equals('main');
  });

  it('createRepo successfully creates repo', async () => {
    const user = await github.getUser();
    const status = await github.createRepo(user, 'test-SSW345-HW4');
    expect(status).to.equal(201);
  });

  it('createIssue successfully creates issue', async () => {
    const user = await github.getUser();
    const status = await github.createIssue(user, 'SSW345-HW4', 'issue name', 'issue body');
    expect(status).to.equal(201);
  });

  it('enableWikiSupport successfully enables wiki support', async () => {
    const user = await github.getUser();
    const response = await github.enableWikiSupport(user, 'SSW345-HW4');

    expect(response).to.have.property('has_wiki');
    expect(response.has_wiki).to.equal(true);
  });
});

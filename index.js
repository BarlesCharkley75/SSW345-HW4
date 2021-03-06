let request = require('request');
const chalk = require('chalk');
let urlRoot = 'https://api.github.com';
let userId = 'BarlesCharkley75';
var config = {};

// Retrieve our api token from the environment variables.
config.token = process.env.GITHUBTOKEN;

if (!config.token)
{
	console.log(chalk`{red.bold GITHUBTOKEN is not defined!}`);
	console.log('Please set your environment variables with appropriate token.');
	console.log(chalk`{italic You may need to refresh your shell in order for your changes to take place.}`);
	process.exit(1);
}

console.log(chalk.green(`Your token is: ${config.token.substring(0, 4)}...`));

if (process.env.NODE_ENV != 'test')
{
	(async () => {
		await listAuthenicatedUserRepos();
		await listBranches(userId, "your repo");
		await createRepo(userId,newrepo);
		await createIssue(userId, repo, issue);
		await enableWikiSupport(userId,repo);

  })();
}

function getDefaultOptions(endpoint, method)
{
	let options = {
		url: urlRoot + endpoint,
		method,
		headers: {
			'User-Agent': 'ssw345-REST-lab',
			'content-type': 'application/json',
			Authorization: `token ${config.token}`,
    },
  };
	return options;
}

async function getUser()
{
	const options = getDefaultOptions(`/user`, 'GET');

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise((resolve, reject) => {
		request(options, (error, response, body) => {

      resolve(JSON.parse(body).login);
		});
	});
}

function listAuthenicatedUserRepos()
{
	const options = getDefaultOptions(`/user/repos?visibility=all`, 'GET');

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise((resolve, reject)
	=> {
		request(options, (error, response, body) 
		=> {
			if (error)
			{
				console.log(chalk.red(error));
				reject(error);
				return; // Terminate execution.
			}

      var obj = JSON.parse(body);
			for (var i = 0; i < obj.length; i++)
			{
				let {name} = obj[i];
				console.log(name);
			}

      // Return object for people calling our method.
			resolve(obj);
		});
	});

}

// 1. Write code for listBranches in a given repo under an owner. See list branches
async function listBranches(owner, repo) {
    const options = getDefaultOptions(`/repos/${owner}/${repo}/branches`, 'GET');
  // Send a http request to url and specify a callback that will be called upon its return.
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            const x = JSON.parse(body);
      for (let i = 0; i < x.length; i++) {
                const name = x[i].name;
        console.log(name);
            }
            resolve(x);
        });
    });
}

// 2. Write code to create a new repo
async function createRepo(owner, repo) {
    const options = getDefaultOptions("/user/repos", 'POST');
  options.body = JSON.stringify({ name: repo });
    // Send a http request to url and specify a callback that will be called upon its return.
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            resolve(response.statusCode);
        });
    });
}

// 3. Write code for creating an issue for an existing repo.
async function createIssue(owner, repo, issueName, issueBody) {
    const options = getDefaultOptions(`/repos/${owner}/${repo}/issues`, 'POST');
  options.body = JSON.stringify({ title: issueName, body: issueBody });
    // Send a http request to url and specify a callback that will be called upon its return.
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            resolve(response.statusCode);
        });
    });
}

// 4. Write code for editing a repo to enable wiki support.
async function enableWikiSupport(owner, repo) {
    const options = getDefaultOptions(`/repos/${owner}/${repo}`, 'PATCH');
  options.body = JSON.stringify({ has_wiki: true });
    // Send a http request to url and specify a callback that will be called upon its return.
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            resolve(JSON.parse(body));
        });
    });
}

module.exports.getUser = getUser;
module.exports.listAuthenicatedUserRepos = listAuthenicatedUserRepos;
module.exports.listBranches = listBranches;
module.exports.createRepo = createRepo;
module.exports.createIssue = createIssue;
module.exports.enableWikiSupport = enableWikiSupport;

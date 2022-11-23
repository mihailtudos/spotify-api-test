require("dotenv").config();
const express = require("express");
const cors = require("cors")
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const request = require('request')
const {response} = require("express");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(__dirname + "/public"))
	.use(cors())
	.use(cookieParser())
	.use(express.json());

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const stateKey = 'spotify_auth_state';

function getToken() {
	const data = {
		data: '',
		error: false
	};
	const options = {
		url: `https://accounts.spotify.com/api/token`,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: 'grant_type=client_credentials&client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.SECRET
	}

	return new Promise(function (resolve, reject) {
		request(options, function callback(error, response, body) {
			if (!error && response.statusCode === 200) {
				const info = JSON.parse(body);
				process.env.ACCESS_TOKEN = info.access_token;
				data.data = {access_token: info.access_token};
				resolve(data);
			} else {
				data.error = true;
				reject(data);
			}
		})
	});
}

app.get('/login', function(req, res) {
	getToken()
		.then(result => res.json(result));
});

app.post('/api/search', function(req, res) {
	if (!process.env.ACCESS_TOKEN) {
		getToken()
			.then(result => {
				if (result.data.access_token) {
					requestData(req.body.albumTitle).then(({items})=> res.json(items))
				}
			});
	} else {
		requestData(req.body.albumTitle).then(({items})=> res.json(items))
	}
});

function requestData(albumTitle) {
	const options = {
		method: 'GET',
		url: `https://api.spotify.com/v1/search?q=${albumTitle}&type=album`,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
		}
	};

	return new Promise(function (resolve, reject) {
		request(options, function callback(error, response, body) {
			if (!error && response.statusCode === 200) {
				const {albums} = JSON.parse(body);
				resolve(albums);
			} else {
				reject(error);
			}
		})
	});
}



//start server
app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`)
})

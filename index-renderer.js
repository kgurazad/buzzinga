var $ = require('jquery');
var fs = require('fs');
var ews = require('express-ws');
var {remote} = require('electron');
var addr;
var express = require('express');
var app = express();
var wss = ews(app);
var notifier = require('node-notifier');
var players = {};
var queue = []; // who is buzzing
app.use(express.urlencoded());
app.use(express.json());
function newGame () {
    var config = String(fs.readFileSync('./buzzinga.conf')).split('\n');
    var team = "";
    $('#team-list').empty();
    for (var line of config) {
	if (line.charAt(line.length - 1) === ":") { // team
	    team = line.substring(0, line.length - 1);
	    players[team] = [];
	} else {
	    players[team].push(line);
	}
    }
    for (var team in players) {
	var cteam = team.replace(/ /g, '');
	$('#team-list').append('<tr id="' + cteam + '"><td class="table-secondary">' + team + '</td></tr>');
	for (var player of players[team]) {
	    var cplayer = player.replace(/ /g, '');
	    $('tr#' + cteam).append('<td class="table-danger" id="' + cplayer + '">' + player + '</td>'); 
	}
    }
}
function reset () {
    for (ws of queue) {
	$('td#' + ws.name).removeClass('table-success');
        $('td#' + ws.name).empty();
	$('td#' + ws.name).text(ws.fullName);
    }
    queue = [];
}
$(document).ready(function () {
    $('#reset').on('click', function () {
	reset();
    });
    $('#game').on('click', function () {
	newGame();
    })
    app.get('/', function (req, res) {
	res.sendFile(__dirname+'/client.html')
    });
    app.get('/client.css', function (req, res) {
	res.sendFile(__dirname+'/client.css');
    });
    app.get('/client.js', function (req, res) {
	res.sendFile(__dirname+'/client.js');
    });
    app.ws('/', function (ws, req) {
	ws.name = '';
	ws.team = '';
	ws.fullName = '';
	ws.on('message', function (msg) {
	    try {
		msg = JSON.parse(msg);
		if (msg.name != null) {
		    this.name = msg.name.replace(/ /g, '');
		    this.fullName = msg.name;
		    this.team = msg.team;
		    $('td#' + this.name).removeClass('table-danger');
		} else if (msg.content === 'buzz') {
		    $('td#' + this.name).addClass('table-success');
		    queue.push(this);
		    $('td#' + this.name).append(' <b>[' + queue.length + ']</b>');
		    if (queue.length === 1) {
			notifier.notify({
			    title: 'buzzinga',
			    message: 'buzz by ' + this.fullName,
			    sound: true
			});
		    }
		}
	    } catch (e) {
		return;
	    }
	});
	ws.on('close', function () {
	    $('td#' + this.name).removeClass();
	    $('td#' + this.name).addClass('table-danger');
	});
    });
    require('dns').lookup(require('os').hostname(), function (error, address, f) {
	addr = address;
	$('#ip').html('Address: <code>' + addr + ':22126</code>');
	app.listen(22126);
    });
    newGame();
});

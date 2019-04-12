$(document).ready(function () {
    $('#buzz-div').hide();
    console.log("up!");
    window.ws = null;
    $('#join').click(function () {
	alert("joining!");
	window.ws = new WebSocket(window.location.href.replace('http', 'ws'));
	window.ws.addEventListener('open', function () {
	    this.send(JSON.stringify({name: $('#name').val(), team: $('#team').val()}));
	});
	setInterval(function () {
	    window.ws.send('ping');
	}, 30000);
	$('#login-div').hide();
	$('#buzz-div').show();
    });
    $('#buzz').click(function () {
	alert("buzzing!");
	window.ws.send(JSON.stringify({content: 'buzz'}));
    });
});

$(document).ready(function () {
    var buzzerLightInterval = null;
    $('#buzz-div').hide();
    $('#buzzer-light').hide();
    console.log("up!");
    window.ws = null;
    $('#join').click(function () {
	window.ws = new WebSocket(window.location.href.replace('http', 'ws'));
	window.ws.addEventListener('open', function () {
	    this.send(JSON.stringify({name: $('#name').val(), team: $('#team').val()}));
	});
        window.ws.addEventListener('message', function (event) {
            try {
                msg = JSON.parse(event.data);
                if (msg.content === 'buzz') {
                    buzzerLightInterval = setInterval(function () {
                        $('#buzzer-light').toggle();
                    }, 300);
                } else if (msg.content === 'reset') {
                    if (buzzerLightInterval !== null) {
                        clearInterval(buzzerLightInterval);
                    }
                    $('#buzzer-light').hide();
                }
            } catch (e) {}
        });
	setInterval(function () {
	    window.ws.send('ping');
	}, 30000);
	$('#login-div').hide();
	$('#buzz-div').show();
    });
    $('#buzz').click(function () {
	window.ws.send(JSON.stringify({content: 'buzz'}));
    });
});

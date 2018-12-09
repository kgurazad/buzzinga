$ = require('jquery')
const newGame = function () {
    alert('making a new game! right?');
    global.mainWindow.loadFile('newGame.html')
    global.mainWindow.once('ready-to-show', function () {
	win.show();
    });
}
const calcBuzzPoints = function (tu, wordID) {
}
$(global.document).ready(function () {
    $('#reset').on('click', function () {
	alert('resetting buzzer!');
    });
    $('#game').on('click', function () {
	newGame();
    })
    $('#tuarea').attr('contentEditable', true)
    sz = function (num) {
	alert(num)
    }
    $('#cleartu').on('click', function() {
	$('#tuarea').html('');
    });
    $('#loadtu').on('click', function () {
	var tu = $('#tuarea').html();
	var tusplit = tu.split(' ');
	var newtu = '';
	for (word in tusplit) {
	    newtu += '<a class="word" onclick="sz(this.id);" id="' + (100*word/tusplit.length) + '">' + tusplit[word] + '</a> ' 
	}
	newtu += '<a class="word" onclick="sz(this.id)" id="100">>end<</a>' 
	alert(newtu);
	$('#tuarea').html(newtu);
    });
});

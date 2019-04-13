var $ = require(`jquery`);
var {remote} = require(`electron`);
var dialogs = require('dialogs')();
var numTeams = 1;

$(document).ready(function () {
    $('body').keyup(function () {
        if (event.which === 73 && document.activeElement.tagName === 'BODY') {
            remote.getCurrentWindow().toggleDevTools();
        }
    });
    $(`#add-team`).on(`click`, function () {
        numTeams++;
        $(`#buttons`).before(`<div class="section" id="define-team` + numTeams + `">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Team ` + numTeams + ` Name</span>
                </div>
                <input id="name` + numTeams + `" type="text" class="form-control">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Team ` + numTeams + ` Players</span>
                </div>
                <textarea id="players` + numTeams + `" class="form-control"></textarea>
            </div>
        </div>`);
    });
    $('#del-team').on('click', function () {
        dialogs.prompt('Which number team would you like to delete?', numTeams, function (resp) {
            $('#define-team' + resp.trim()).remove();
        });
    });
    $('#start').on('click', function () {
        var players = {};
        for (var i = 1; i <= numTeams; i++) {
            var name = $('#name' + i).val().trim();
            var thesePlayers = $('#players' + i).val().trim().split(/,\s*/g);
            if (thesePlayers.length !== 0) {
                players[name] = thesePlayers;
            } 
        }
        console.log(players);
        remote.getGlobal('opsVariables').players = players;
        remote.getCurrentWindow().close();
    });
});

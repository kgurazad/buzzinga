var $ = require(`jquery`);
var {remote} = require(`electron`);
var {BrowserWindow} = remote;
var numTeams = 1;

$(document).ready(function () {
    $(`#add-team`).on(`click`, function () {
        numTeams++;
        $(`#buttons`).before(`<div class="section define-team">
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
    $('#start').on('click', function () {
        var players = {};
        for (var i = 1; i <= numTeams; i++) {
            var name = $('#name' + i).val().trim();
            var thesePlayers = $('#players' + i).val().trim().split(/,\s*/g);
            if (thesePlayers.length === 0) {
                players[name] = thesePlayers;
            } 
        }
        console.log(players);
        remote.getGlobal('opsVariables').players = players;
        remote.getCurrentWindow().close();
    });
});

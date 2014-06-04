/// <reference path="minecraft_enemies.ts" />
/*
* splitted namespace,
* divided into two source files
*/
var minecraft;
(function (minecraft) {
    (function (player) {
        var goodboy = (function () {
            function goodboy() {
            }
            return goodboy;
        })();
        player.goodboy = goodboy;
    })(minecraft.player || (minecraft.player = {}));
    var player = minecraft.player;
})(minecraft || (minecraft = {}));
//# sourceMappingURL=minecraft_player.js.map

// declares an internal module
var minecraft;
(function (minecraft) {
    // declares a module inside an internal module
    // with modifier "export" which is equivalent to public
    (function (enemies) {
        var skeleton = (function () {
            function skeleton() {
            }
            return skeleton;
        })();
        enemies.skeleton = skeleton;

        var creeper = (function () {
            function creeper() {
                this.power = 100;
            }
            return creeper;
        })();
        enemies.creeper = creeper;
    })(minecraft.enemies || (minecraft.enemies = {}));
    var enemies = minecraft.enemies;
})(minecraft || (minecraft = {}));
//# sourceMappingURL=minecraft_enemies.js.map

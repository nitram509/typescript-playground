define(["require", "exports"], function(require, exports) {
    // declares an internal module
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
    })(exports.minecraft || (exports.minecraft = {}));
    var minecraft = exports.minecraft;
});
//# sourceMappingURL=minecraft_enemies.js.map

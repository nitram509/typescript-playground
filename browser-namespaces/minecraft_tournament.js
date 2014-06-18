/// <reference path="minecraft_hypermedia" />
/// <reference path="minecraft_model" />
/// <reference path="minecraft_viewcontroller" />
/// <reference path="jquery.d" />
/*
* splitted namespace,
* divided into two source files
*/
var minecraft;
(function (minecraft) {
    (function (tournament) {
        

        var App = (function () {
            function App() {
                this.attendees = new minecraft.viewcontroller.Attendees();
                this.opponents = new minecraft.viewcontroller.Opponents();
            }
            App.prototype.start = function () {
                this.attendees.clear();
                this.attendees.bindTo($("li.attendee").toArray());
                this.opponents.bindTo($("li.opponent").toArray());
                this.opponents.bindToButton($("#btnOpponentsFight")[0]);
                this.loadMobData();
            };

            App.prototype.loadMobData = function () {
                var _this = this;
                $.get("/mobs", function (data) {
                    // we ignore the 'data' return Type, thus using 'any'
                    var hyperMediaDocument = new minecraft.hypermedia.HyperMediaDocument(data);
                    var mobs = hyperMediaDocument.getEmbedded();
                    if (mobs.mobList) {
                        window.console.log("Added mobs (" + mobs.mobList.length + ")");
                        _this.attendees.add(mobs.mobList);
                    }
                    if (mobs.aggressiveMobList) {
                        window.console.log("Added aggressiveMobs (" + mobs.aggressiveMobList.length + ")");
                        _this.attendees.add(mobs.aggressiveMobList);
                    }
                });
            };
            return App;
        })();
        tournament.App = App;
    })(minecraft.tournament || (minecraft.tournament = {}));
    var tournament = minecraft.tournament;
})(minecraft || (minecraft = {}));
//# sourceMappingURL=minecraft_tournament.js.map

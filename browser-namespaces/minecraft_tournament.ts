/// <reference path="minecraft_hypermedia" />
/// <reference path="minecraft_model" />
/// <reference path="minecraft_viewcontroller" />
/// <reference path="jquery.d" />

/*
 * splitted namespace,
 * divided into two source files
 */
module minecraft {

  export module tournament {

    // Creating local module 'window' which overlays global window in Typescripts type system
    // VeryHacky! For debugging purpose only  ;-)
    declare module window {
      export class console {
        static log(x:any):any;
      }
    }

    // shortcut, it's easier to write than the full qualified name ;-)
    // Hint: will not generated into Javascript
    import Mob = minecraft.model.Mob;
    import MobCollection = minecraft.model.MobCollection;

    export class App {

      public attendees : minecraft.viewcontroller.Attendees = new minecraft.viewcontroller.Attendees();
      public opponents : minecraft.viewcontroller.Opponents = new minecraft.viewcontroller.Opponents();

      start(): void {
        this.attendees.clear();
        this.attendees.bindTo($("li.attendee").toArray());
        this.opponents.bindTo($("li.opponent").toArray());
        this.opponents.bindToButton($("#btnOpponentsFight")[0]);
        this.loadMobData();
      }

      private loadMobData() {
        $.get("/mobs", (data) => {
          // we ignore the 'data' return Type, thus using 'any'
          var hyperMediaDocument = new minecraft.hypermedia.HyperMediaDocument<any, MobCollection>(data);
          var mobs: MobCollection = hyperMediaDocument.getEmbedded();
          if (mobs.mobList) {
            window.console.log("Added mobs (" + mobs.mobList.length + ")");
            this.attendees.add(mobs.mobList);
          }
          if (mobs.aggressiveMobList) {
            window.console.log("Added aggressiveMobs (" + mobs.aggressiveMobList.length + ")");
            this.attendees.add(mobs.aggressiveMobList);
          }
        })
      }

    }

  }

}
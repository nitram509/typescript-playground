///<reference path="minecraft/MobType.ts"/>

import Mob = require("./minecraft/Mob");

export = GoldenTestData;
class GoldenTestData {
  public static CHICKEN_ID:number = 1001;

  public create():Mob[] {
    let mobs = [];
    this.addPassiveMobs(mobs);
    return mobs;
  }

  private addPassiveMobs(mobs:Mob[]) {
    var chicken:Mob = new Mob(GoldenTestData.CHICKEN_ID);
    chicken.name = "Chicken";
    chicken.healthPoints = 4;
    chicken.imagePath = "/images/Chicken.png";
    mobs.push(chicken);
  }

}

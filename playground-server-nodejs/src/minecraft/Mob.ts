export = Mob;
class Mob {
  private _mobId:number;
  private _name:string;
  private _healthPoints:number;
  private _imagePath:string;


  constructor(mobId:number) {
    this._mobId = mobId;
  }
  
  get mobId():number {
    return this._mobId;
  }

  get name():string {
    return this._name;
  }

  set name(value:string) {
    this._name = value;
  }

  get healthPoints():number {
    return this._healthPoints;
  }

  set healthPoints(value:number) {
    this._healthPoints = value;
  }

  get imagePath():string {
    return this._imagePath;
  }

  set imagePath(value:string) {
    this._imagePath = value;
  }
}
module minecraft {

  export module model {

    export enum MobType {
      PASSIVE = 1,
      NEUTRAL = 2,
      HOSTILE = 3
    }

    export class MobTypeResolver {
      static toName(mobType: MobType): string {
        switch (mobType) {
          case MobType.PASSIVE: return "Passive";
          case MobType.NEUTRAL: return "Neutral";
          case MobType.HOSTILE: return "Hostile";
        }
        return "Unknown";
      }
    }

    export interface Mob {
      name: string;
      healthPoints: number;
      imagePath: string;
      mobType: MobType;
    }

    export interface AggressiveMob extends Mob {
      attackStrength: number;
    }

    export interface MobCollection {
      mobList: Mob[];
      aggressiveMobList: AggressiveMob[];
    }

  }

}
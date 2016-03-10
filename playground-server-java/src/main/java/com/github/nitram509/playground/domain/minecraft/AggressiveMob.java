package com.github.nitram509.playground.domain.minecraft;

import com.github.nitram509.playground.domain.primitives.MobId;

import static com.github.nitram509.playground.domain.minecraft.MobType.HOSTILE;

public class AggressiveMob extends Mob implements IsAggressiveMob {

  private int attackStrength;

  private AggressiveMob() {
    super(MobId.class, HOSTILE);
  }

  public AggressiveMob(Class<MobId> identifierClass) {
    super(identifierClass, HOSTILE);
  }

  public AggressiveMob(MobId id) {
    super(id, HOSTILE);
  }

  @Override
  public int getAttackStrength() {
    return attackStrength;
  }

  public void setAttackStrength(int attackStrength) {
    this.attackStrength = attackStrength;
  }
}

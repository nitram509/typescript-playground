package com.github.nitram509.playground.domain.minecraft;

public enum MobType {

  PASSIVE(1),
  NEUTRAL(2),
  HOSTILE(3);

  public final int typeId;

  MobType(int typeId) {
    this.typeId = typeId;
  }

}

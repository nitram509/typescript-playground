package com.github.nitram509.playground.domain.minecraft;

import com.github.nitram509.playground.domain.primitives.Entity;
import com.github.nitram509.playground.domain.primitives.Identifier;

public abstract class TypedMobEntity<IdentifierType extends Identifier> extends Entity<IdentifierType> {

  private final MobType mobType;

  public TypedMobEntity(Class<IdentifierType> identifierClass, MobType mobType) {
    super(identifierClass);
    this.mobType = mobType;
  }

  public TypedMobEntity(IdentifierType id, MobType mobType) {
    super(id);
    this.mobType = mobType;
  }

  public MobType getMobType() {
    return mobType;
  }

}

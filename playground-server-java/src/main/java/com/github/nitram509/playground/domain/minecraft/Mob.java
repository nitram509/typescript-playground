package com.github.nitram509.playground.domain.minecraft;

import com.github.nitram509.playground.domain.primitives.MobId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mobs")
public class Mob extends TypedMobEntity<MobId> {

  private String name;
  private int healthPoints;
  private String imagePath;

  private Mob() {
    super(MobId.class, MobType.PASSIVE);
  }

  public Mob(Class<MobId> identifierClass) {
    super(identifierClass, MobType.PASSIVE);
  }

  public Mob(MobId id) {
    super(id, MobType.PASSIVE);
  }

  public Mob(Class<MobId> identifierClass, MobType mobType) {
    super(identifierClass, mobType);
  }

  public Mob(MobId id, MobType mobType) {
    super(id, mobType);
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getHealthPoints() {
    return healthPoints;
  }

  public void setHealthPoints(int healthPoints) {
    this.healthPoints = healthPoints;
  }

  public String getImagePath() {
    return imagePath;
  }

  public void setImagePath(String imagePath) {
    this.imagePath = imagePath;
  }
}

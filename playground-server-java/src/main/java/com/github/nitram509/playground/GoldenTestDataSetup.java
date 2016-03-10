package com.github.nitram509.playground;

import com.github.nitram509.playground.domain.minecraft.AggressiveMob;
import com.github.nitram509.playground.domain.minecraft.Mob;
import com.github.nitram509.playground.domain.minecraft.MobRepository;
import com.github.nitram509.playground.domain.primitives.MobId;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import static com.github.nitram509.playground.domain.minecraft.MobType.NEUTRAL;

@Component
public class GoldenTestDataSetup {

  public static final MobId CHICKEN_ID = new MobId("1001");
  public static final MobId WOLF_ID = new MobId("1002");
  public static final MobId WOLF_AGRESSIVE_ID = new MobId("1003");
  public static final MobId ZOMBIE_ID = new MobId("1004");
  public static final MobId CREEPER_ID = new MobId("1005");

  @Inject
  MobRepository mobRepository;

  @PostConstruct
  public void persistGoldenTestData() {
    createPassiveMobs();
    createNeutralMobs();
    createHostileMobs();
  }

  private void createPassiveMobs() {
    Mob chicken = new Mob(CHICKEN_ID);
    chicken.setName("Chicken");
    chicken.setHealthPoints(4);
    chicken.setImagePath("/images/Chicken.png");
    mobRepository.save(chicken);
  }

  private void createNeutralMobs() {
    Mob wolf = new Mob(WOLF_ID, NEUTRAL);
    wolf.setHealthPoints(8);
    wolf.setName("Wolf");
    wolf.setImagePath("/images/Wolf.png");
    mobRepository.save(wolf);

    AggressiveMob aggressiveWolf = new AggressiveMob(WOLF_AGRESSIVE_ID);
    aggressiveWolf.setHealthPoints(8);
    aggressiveWolf.setName("Wolf (Aggressive)");
    aggressiveWolf.setAttackStrength(2);
    aggressiveWolf.setImagePath("/images/Wolf_Aggressive.png");
    mobRepository.save(aggressiveWolf);
  }

  private void createHostileMobs() {
    AggressiveMob zombie = new AggressiveMob(ZOMBIE_ID);
    zombie.setName("Zombie");
    zombie.setHealthPoints(20);
    zombie.setAttackStrength(4);
    zombie.setImagePath("/images/Zombie.png");
    mobRepository.save(zombie);

    AggressiveMob creeper = new AggressiveMob(CREEPER_ID);
    creeper.setName("Creeper");
    creeper.setHealthPoints(20);
    creeper.setAttackStrength(15);
    creeper.setImagePath("/images/Creeper.png");
    mobRepository.save(creeper);
  }

}

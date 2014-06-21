package com.github.nitram509.playground.domain.minecraft;

import com.github.nitram509.playground.domain.primitives.MobId;
import org.springframework.data.repository.CrudRepository;

public interface MobRepository extends CrudRepository<Mob, MobId> {

}

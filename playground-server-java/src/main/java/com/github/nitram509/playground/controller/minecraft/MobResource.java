package com.github.nitram509.playground.controller.minecraft;

import com.github.nitram509.playground.domain.minecraft.Mob;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

class MobResource extends Resource<Mob> {

  public MobResource(Mob content, Link... links) {
    super(content, links);
  }

  public MobResource(Mob content, Iterable<Link> links) {
    super(content, links);
  }
}

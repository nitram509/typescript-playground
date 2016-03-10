package com.github.nitram509.playground.controller.minecraft;

import org.springframework.hateoas.Resources;

class MobCollectionResource extends Resources<MobResource> {

  public MobCollectionResource(Iterable<MobResource> resourceIterable) {
    super(resourceIterable);
  }
}

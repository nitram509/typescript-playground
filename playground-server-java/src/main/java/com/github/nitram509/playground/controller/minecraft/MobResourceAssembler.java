package com.github.nitram509.playground.controller.minecraft;

import com.github.nitram509.playground.domain.minecraft.Mob;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

@Component
class MobResourceAssembler extends ResourceAssemblerSupport<Mob, MobResource> {

  public MobResourceAssembler() {
    super(MobCollectionController.class, MobResource.class);
  }

  @Override
  public MobResource toResource(Mob entity) {
    MobResource resource = createResourceWithId(entity.getId(), entity);

    return resource;
  }

  @Override
  protected MobResource instantiateResource(Mob entity) {
    return new MobResource(entity);
  }
}

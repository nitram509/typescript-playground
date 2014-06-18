package com.github.nitram509.playground.controller.minecraft;

import com.github.nitram509.playground.controller.LinkRelations;
import com.github.nitram509.playground.controller.infrastructure.HalLink;
import com.github.nitram509.playground.domain.minecraft.Mob;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.ArrayList;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Component
public class MobCollectionResourceAssembler extends ResourceAssemblerSupport<Iterable<Mob>, MobCollectionResource> {

  @Inject
  MobResourceAssembler resourceAssembler;

  public MobCollectionResourceAssembler() {
    super(MobCollectionController.class, MobCollectionResource.class);
  }

  @Override
  public MobCollectionResource toResource(Iterable<Mob> mobs) {
    ArrayList<MobResource> resourceList = new ArrayList<>();
    for (Mob mob : mobs) {
      MobResource resource = resourceAssembler.toResource(mob);
      resourceList.add(resource);
    }

    MobCollectionResource resource = new MobCollectionResource(resourceList);

    Link self = linkTo(methodOn(MobCollectionController.class).get()).withRel(Link.REL_SELF);
    resource.add(new HalLink(self, LinkRelations.shortRel(Link.REL_SELF)));

    return resource;
  }

}

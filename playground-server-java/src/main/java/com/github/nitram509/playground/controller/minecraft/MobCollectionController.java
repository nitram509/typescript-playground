package com.github.nitram509.playground.controller.minecraft;

import com.github.nitram509.playground.controller.LinkRelations;
import com.github.nitram509.playground.domain.minecraft.Mob;
import com.github.nitram509.playground.domain.minecraft.MobRepository;
import org.springframework.hateoas.core.Relation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.inject.Inject;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
@Relation(collectionRelation = LinkRelations.MOBS)
@RequestMapping("/mobs")
public class MobCollectionController {

  @Inject
  MobRepository repository;

  @Inject
  MobCollectionResourceAssembler resourcesAssembler;

  @RequestMapping(method = GET)
  @ResponseStatus(OK)
  @ResponseBody
  public MobCollectionResource get() {
    Iterable<Mob> mobs = repository.findAll();
    return resourcesAssembler.toResource(mobs);
  }
}

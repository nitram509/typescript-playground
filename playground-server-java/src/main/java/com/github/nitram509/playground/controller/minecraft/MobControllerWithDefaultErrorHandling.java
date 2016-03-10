package com.github.nitram509.playground.controller.minecraft;

import com.github.nitram509.playground.controller.infrastructure.ControllerWithDefaultErrorHandling;
import com.github.nitram509.playground.domain.minecraft.Mob;
import com.github.nitram509.playground.domain.minecraft.MobRepository;
import com.github.nitram509.playground.domain.primitives.MobId;
import org.springframework.hateoas.core.Relation;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.NoSuchElementException;

import static com.github.nitram509.playground.controller.LinkRelations.MOB;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@Relation(collectionRelation = MOB)
@RequestMapping("/mobs/{mobId}")
public class MobControllerWithDefaultErrorHandling extends ControllerWithDefaultErrorHandling {

  @Inject
  MobRepository repository;

  @Inject
  MobResourceAssembler resourceAssembler;

  @RequestMapping(method = PUT)
  @ResponseStatus(NO_CONTENT)
  void put(@PathVariable("mobId") MobId mobId, @RequestBody Mob newVersion) {
    Mob oldVersion = repository.findOne(mobId);
    if (oldVersion == null) {
      throw new NoSuchElementException("id=" + mobId);
    }
    newVersion.setId(mobId);
    repository.save(newVersion);
  }

  @RequestMapping(method = GET)
  @ResponseStatus(OK)
  @ResponseBody
  public MobResource get(@PathVariable("mobId") MobId mobId) {
    Mob entity = repository.findOne(mobId);
    if (entity == null) {
      throw new NoSuchElementException("id" + mobId);
    }
    return resourceAssembler.toResource(entity);
  }

  @RequestMapping(method = POST)
  @ResponseStatus(CREATED)
  public MobResource post(@RequestBody Mob mob,
                          HttpServletResponse response) throws IOException {
    if (mob != null && mob.getId() != null && repository.exists(mob.getId())) {
      throw new IllegalArgumentException("Id already exists: " + mob.getId());
    }
    repository.save(mob);
    MobResource mobResource = resourceAssembler.toResource(mob);
    response.addHeader("Location", mobResource.getId().getHref());

    return mobResource;
  }
}

package com.github.nitram509.playground.controller.minecraft;

import com.github.nitram509.playground.domain.metamodel.Class;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

class ClassResource extends Resource<Class> {

  public ClassResource(Class content, Link... links) {
    super(content, links);
  }

  public ClassResource(Class content, Iterable<Link> links) {
    super(content, links);
  }
}

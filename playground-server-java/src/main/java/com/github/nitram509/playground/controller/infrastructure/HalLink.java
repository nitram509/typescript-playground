package com.github.nitram509.playground.controller.infrastructure;

import org.springframework.hateoas.Link;

import static com.github.nitram509.playground.controller.LinkRelations.shortRel;

public class HalLink extends Link {

  String title;

  public HalLink(String href) {
    super(href);
  }

  public HalLink(String href, String rel) {
    super(href, rel);
  }

  public HalLink(Link link) {
    super(link.getHref(), link.getRel());
    title = shortRel(link.getRel());
  }

  public HalLink(Link link, String title) {
    this(link);
    this.title = title;
  }

  public HalLink(String href, String rel, String title) {
    this(href, rel);
    this.title = title;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}

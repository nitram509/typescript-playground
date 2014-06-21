package com.github.nitram509.playground.controller;

public interface LinkRelations {

  static final String MOBS = "http://nitram509.github.com/rel/mobs";
  static final String MOB = "http://nitram509.github.com/rel/mob";

  public static String shortRel(String relation) {
    if (relation == null) {
      return null;
    }
    return relation.substring(relation.lastIndexOf("/") + 1, relation.length());
  }
}

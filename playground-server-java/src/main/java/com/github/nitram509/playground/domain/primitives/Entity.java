package com.github.nitram509.playground.domain.primitives;

public abstract class Entity<IdentifierType extends Identifier> implements Identifiable<IdentifierType> {

  @org.springframework.data.annotation.Id
  IdentifierType id;

  public Entity(Class<IdentifierType> identifierClass) {
    try {
      id = identifierClass.newInstance();
    }
    catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public Entity(IdentifierType id) {
    this.id = id;
  }

  @Override
  public IdentifierType getId() {
    return id;
  }

  public void setId(IdentifierType id) {
    if (id == null) {
      throw new IllegalArgumentException("Id must not be null.");
    }
    this.id = id;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    Entity that = (Entity) o;

    if (!id.equals(that.id)) {
      return false;
    }

    return true;
  }

  @Override
  public int hashCode() {
    return id.hashCode();
  }
}

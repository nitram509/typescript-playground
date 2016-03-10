package com.github.nitram509.playground.domain.primitives;

import java.io.Serializable;
import java.util.UUID;

public class Identifier implements Serializable {

  String value;

  public static Identifier idOrNull(String value) {
    if (value == null || value.isEmpty()) {
      return null;
    }
    else {
      return new Identifier(value);
    }
  }

  public Identifier() {
    value = UUID.randomUUID().toString();
  }

  public Identifier(String value) {
    if (value == null || value.isEmpty()) {
      throw new IllegalArgumentException("Identifier value must not be null.");
    }
    this.value = value;
  }

  public boolean isValid() {
    if (value == null) {
      return false;
    }
    try {
      UUID.fromString(value);
    }
    catch (IllegalArgumentException iValid) {
      return false;
    }
    return true;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  @Override
  public String toString() {
    return value;
  }
}

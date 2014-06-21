package com.github.nitram509.playground.controller.infrastructure.json;

import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.FromStringDeserializer;
import com.github.nitram509.playground.domain.primitives.ElementId;

import java.io.IOException;

public class ElementIdDeserializer extends FromStringDeserializer<ElementId> {
  public ElementIdDeserializer() {
    super(ElementId.class);
  }

  @Override
  protected ElementId _deserialize(String value, DeserializationContext ctxt) throws IOException {
    return new ElementId(value);
  }
}

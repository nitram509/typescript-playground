package com.github.nitram509.playground.controller.infrastructure.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.github.nitram509.playground.domain.primitives.ElementId;

import java.io.IOException;

public class ElementIdJsonSerializer extends JsonSerializer<ElementId> {
  @Override
  public void serialize(ElementId id, JsonGenerator jgen, SerializerProvider provider) throws IOException {
    if (id != null) {
      jgen.writeString(id.getValue());
    }
  }
}

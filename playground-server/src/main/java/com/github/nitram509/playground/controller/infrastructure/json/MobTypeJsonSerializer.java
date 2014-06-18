package com.github.nitram509.playground.controller.infrastructure.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.github.nitram509.playground.domain.minecraft.MobType;

import java.io.IOException;

public class MobTypeJsonSerializer extends JsonSerializer<MobType> {
  @Override
  public void serialize(MobType mobType, JsonGenerator jgen, SerializerProvider provider) throws IOException {
    if (mobType != null) {
      jgen.writeNumber(mobType.typeId);
    }
  }
}

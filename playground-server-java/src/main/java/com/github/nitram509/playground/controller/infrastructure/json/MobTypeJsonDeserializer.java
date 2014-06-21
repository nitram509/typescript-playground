package com.github.nitram509.playground.controller.infrastructure.json;

import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.FromStringDeserializer;
import com.github.nitram509.playground.domain.minecraft.MobType;

import java.io.IOException;

import static com.github.nitram509.playground.domain.minecraft.MobType.PASSIVE;

public class MobTypeJsonDeserializer extends FromStringDeserializer<MobType> {
  public MobTypeJsonDeserializer() {
    super(MobType.class);
  }

  @Override
  protected MobType _deserialize(String value, DeserializationContext ctxt) throws IOException {
    for (MobType mobType : MobType.values()) {
      if (Integer.toString(mobType.typeId).equals(value)) {
        return mobType;
      }
    }
    return PASSIVE;
  }
}

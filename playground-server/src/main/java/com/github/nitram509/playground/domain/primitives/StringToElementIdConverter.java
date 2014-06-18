package com.github.nitram509.playground.domain.primitives;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToElementIdConverter implements Converter<ElementId, String> {

  @Override
  public String convert(ElementId source) {
    return source == null ? null : source.getValue();
  }
}

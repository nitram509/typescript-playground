package com.github.nitram509.playground.infrastructure;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.util.PropertyPlaceholderHelper;

import javax.inject.Inject;

@Component
public class EnvironmentPlaceholderReplacer {

  @Inject
  Environment environment;

  PropertyPlaceholderHelper placeholderHelper = new PropertyPlaceholderHelper("${", "}");

  public String replacePlaceholder(String content) {
    return placeholderHelper.replacePlaceholders(content, environment::getProperty);
  }
}

package com.github.nitram509.playground.infrastructure;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Arrays;

@Component
public class PropertiesLogger {

  private Logger logger = LoggerFactory.getLogger(PropertiesLogger.class);

  @Inject
  Environment environment;

  @PostConstruct
  public void logProperties() {
    logger.info("spring.profiles.active=" + Arrays.toString(environment.getActiveProfiles()));
    logger.info("server.port=" + environment.getProperty("server.port"));
    logger.info("management.port=" + environment.getProperty("management.port"));
    logger.info("baseUri=" + environment.getProperty("baseUri"));
  }
}

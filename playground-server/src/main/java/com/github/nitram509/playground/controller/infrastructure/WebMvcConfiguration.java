package com.github.nitram509.playground.controller.infrastructure;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.util.ISO8601DateFormat;
import com.github.nitram509.playground.controller.infrastructure.json.ElementIdDeserializer;
import com.github.nitram509.playground.controller.infrastructure.json.ElementIdJsonSerializer;
import com.github.nitram509.playground.controller.infrastructure.json.MobTypeJsonDeserializer;
import com.github.nitram509.playground.controller.infrastructure.json.MobTypeJsonSerializer;
import com.github.nitram509.playground.domain.minecraft.MobType;
import com.github.nitram509.playground.domain.primitives.ElementId;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.config.EnableEntityLinks;
import org.springframework.hateoas.config.EnableHypermediaSupport;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.inject.Inject;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;

@Configuration
@EnableEntityLinks
@EnableHypermediaSupport(type = EnableHypermediaSupport.HypermediaType.HAL)
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {

  private ObjectMapper objectMapper;

  @Inject
  public void setObjectMapper(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
    objectMapper.registerModule(customJacksonModule());
    this.objectMapper.setSerializationInclusion(NON_EMPTY);
    this.objectMapper.configure(FAIL_ON_UNKNOWN_PROPERTIES, false);
    this.objectMapper.setDateFormat(new ISO8601DateFormat());
  }

  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
    converter.setObjectMapper(objectMapper);
    converters.add(converter);
  }

  private Module customJacksonModule() {
    final SimpleModule module = new SimpleModule("playground");
    module.addDeserializer(ElementId.class, new ElementIdDeserializer());
    module.addSerializer(ElementId.class, new ElementIdJsonSerializer());
    module.addDeserializer(MobType.class, new MobTypeJsonDeserializer());
    module.addSerializer(MobType.class, new MobTypeJsonSerializer());
    return module;
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**")
        .addResourceLocations("classpath:/static/", "file:d:/projects/typescript-playground/browser-namespaces/");
  }

}

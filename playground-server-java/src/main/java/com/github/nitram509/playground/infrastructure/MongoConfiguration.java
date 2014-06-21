package com.github.nitram509.playground.infrastructure;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.github.nitram509.playground.domain.primitives.ElementIdToStringConverter;
import com.github.nitram509.playground.domain.primitives.StringToElementIdConverter;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.convert.CustomConversions;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import java.util.ArrayList;

@Configuration
public class MongoConfiguration {

  private static final Logger LOG = Logger.getLogger(MongoConfiguration.class);

  @Value("${mongoUri}")
  String mongoUri;

  @Bean
  public MongoTemplate mongoTemplate() throws Exception {
    MongoClientURI clientUri = new MongoClientURI(mongoUri);
    LOG.info("Mongo Database: " + clientUri.getDatabase());
    SimpleMongoDbFactory dbFactory = new SimpleMongoDbFactory(new MongoClient(clientUri), clientUri.getDatabase());
    DbRefResolver dbRefResolver = new DefaultDbRefResolver(dbFactory);
    MongoMappingContext mappingContext = new MongoMappingContext();
    MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mappingContext);

    ArrayList<Object> converters = new ArrayList<>();
    converters.add(new StringToElementIdConverter());
    converters.add(new ElementIdToStringConverter());
    converter.setCustomConversions(new CustomConversions(converters));

    return new MongoTemplate(dbFactory, converter);
  }

}

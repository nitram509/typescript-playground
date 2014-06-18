package com.github.nitram509.playground.infrastructure;

import org.springframework.cassandra.config.java.AbstractSessionConfiguration;
import org.springframework.cassandra.core.CqlOperations;
import org.springframework.cassandra.core.CqlTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.convert.MappingCassandraConverter;
import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.data.cassandra.mapping.BasicCassandraMappingContext;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;

@Configuration
@EnableCassandraRepositories(basePackages = {"com.github.nitram509"})
public class CassandraConfiguration extends AbstractSessionConfiguration {

  @Override
  protected String getKeyspaceName() {
    return "playground";
  }

  @Bean
  public CqlOperations cqlTemplate() throws Exception {
    return new CqlTemplate(session().getObject());
  }

  @Bean
  public CassandraTemplate cassandraTemplate() throws Exception {
    BasicCassandraMappingContext mappingContext = new BasicCassandraMappingContext();
    MappingCassandraConverter converter = new MappingCassandraConverter(mappingContext);
    return new CassandraTemplate(session().getObject(), converter);
  }

}

package com.github.nitram509.playground.infrastructure.cassandra;

import com.github.nitram509.playground.infrastructure.EmbeddedCassandraConfiguration;
import org.apache.cassandra.service.CassandraDaemon;
import org.apache.thrift.transport.TTransportException;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.annotation.Configuration;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.File;
import java.io.IOException;

@Configuration
@AutoConfigureBefore({EmbeddedCassandraConfiguration.class})
public class EmbeddedCassandraDaemonConfiguration implements ServletContextListener {

  private EmbeddedCassandraService embeddedCassandraService;

  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {
    try {
      embeddedCassandraService = new EmbeddedCassandraService();
      embeddedCassandraService.init();
      Thread thread = new Thread(embeddedCassandraService);
      thread.setDaemon(true);
      thread.start();
    } catch (IOException | TTransportException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void contextDestroyed(ServletContextEvent servletContextEvent) {
    embeddedCassandraService.stop();
  }

  public static class EmbeddedCassandraService implements Runnable {
    private CassandraDaemon cassandraDaemon;

    public void init() throws TTransportException, IOException {
      File tempFile = File.createTempFile("cassandra", "-data");
      tempFile.delete();
      tempFile.mkdir();
      System.setProperty("storage-config", tempFile.getAbsolutePath());

      cassandraDaemon = new CassandraDaemon();
      cassandraDaemon.init(null);
    }

    public void run() {
      cassandraDaemon.start();
    }

    public void stop() {
      cassandraDaemon.stop();
    }
  }
}
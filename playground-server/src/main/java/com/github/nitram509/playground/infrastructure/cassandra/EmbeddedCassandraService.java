package com.github.nitram509.playground.infrastructure.cassandra;

import org.apache.cassandra.service.CassandraDaemon;
import org.apache.thrift.transport.TTransportException;

import java.io.File;
import java.io.IOException;

public class EmbeddedCassandraService implements Runnable {
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

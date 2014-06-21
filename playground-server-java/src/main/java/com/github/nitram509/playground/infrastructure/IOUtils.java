package com.github.nitram509.playground.infrastructure;

import com.github.nitram509.playground.controller.RootHttpController;

import java.io.IOException;
import java.io.InputStream;

public class IOUtils {
  public static String stream2String(InputStream inputStream) throws IOException {
    StringBuilder sb = new StringBuilder();
    byte[] buffer = new byte[16 * 1024];
    for (int read; (read = inputStream.read(buffer)) > 0; ) {
      sb.append(new String(buffer, 0, read, RootHttpController.UTF8));
    }
    inputStream.close();
    return sb.toString();
  }
}

package com.github.nitram509.playground.controller;

import com.github.nitram509.playground.infrastructure.EnvironmentPlaceholderReplacer;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.Charset;

import static org.springframework.http.HttpStatus.FOUND;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
@RequestMapping("/")
public class RootHttpController {

  public static final Charset UTF8 = Charset.forName("UTF-8");

  @Inject
  EnvironmentPlaceholderReplacer placeholderReplacer;

  @RequestMapping(method = GET, produces = "text/html")
  @ResponseStatus(FOUND)
  public void getIndexHtml(HttpServletResponse response) throws IOException {
    response.sendRedirect("/hal/browser.html");
  }

  @RequestMapping(method = GET, produces = "application/json")
  @ResponseStatus(OK)
  public void getServiceDocument(HttpServletResponse response) throws IOException {
    String content = IOUtils.toString(new ClassPathResource("index.hal.json").getInputStream(), UTF8);
    String contentFinal = placeholderReplacer.replacePlaceholder(content);
    response.getOutputStream().write(contentFinal.getBytes(UTF8));
  }

}

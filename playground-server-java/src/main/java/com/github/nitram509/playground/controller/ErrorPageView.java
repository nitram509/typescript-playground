package com.github.nitram509.playground.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.AbstractView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

import static org.springframework.http.MediaType.TEXT_HTML_VALUE;

@Component("error")
public class ErrorPageView extends AbstractView {

  private Logger logger = LoggerFactory.getLogger(ErrorPageView.class);

  @Override
  protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
    logger.error("Error! Model: " + model);
    response.setContentType(TEXT_HTML_VALUE);
    response.getWriter().write("<html>" +
            "<body>" +
            "Internal Error :-(<br>" +
            "This event was logged and a technical person will try to fix this problem soon.<br>" +
            "<br>" +
            "<a href=\"/\">Back to start page</a>" +
            "</body>" +
            "</html>");
  }
}

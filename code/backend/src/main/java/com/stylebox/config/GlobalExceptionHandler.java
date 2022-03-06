package com.stylebox.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import exception.RestException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RestException.class)
    @ResponseBody
    public void exceptionHandler(HttpServletResponse response, RestException exception) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setStatus(exception.getStatusCode().value());
        PrintWriter out = response.getWriter();
        HashMap<String, String> data = new HashMap<>();
        data.put("message", exception.getMessage());
        data.put("displayMessage", exception.getDisplayMessage());
        out.write(new ObjectMapper().writeValueAsString(data));
        out.flush();
        out.close();
    }
}

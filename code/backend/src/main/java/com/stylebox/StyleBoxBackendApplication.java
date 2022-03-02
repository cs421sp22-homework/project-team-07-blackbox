package com.stylebox;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class StyleBoxBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(StyleBoxBackendApplication.class, args);
    }

}

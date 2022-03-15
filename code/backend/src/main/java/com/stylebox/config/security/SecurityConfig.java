package com.stylebox.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    final RestAuthorizationEntryPoint restAuthorizationEntryPoint;

    final RestAccessDeniedHandler restAccessDeniedHandler;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
            .and()

            .csrf()
            .disable()

            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()

            .authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS).permitAll()
            .antMatchers(
                "/login",
                "/register/*"
            ).permitAll()
            .anyRequest().authenticated()
            .and()

            .headers()
            .contentTypeOptions()
            .and()
            .xssProtection()
            .and()
            .cacheControl()
            .and()
            .httpStrictTransportSecurity()
            .and()
            .frameOptions()
            .and()
            .and()

            .addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
            .accessDeniedHandler(restAccessDeniedHandler)
            .authenticationEntryPoint(restAuthorizationEntryPoint);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        // 1. Example Add CORS configuration information
        CorsConfiguration config = new CorsConfiguration();
        // Which origin are allowed
//        config.addAllowedOrigin("http://localhost:8080");
        config.addAllowedOriginPattern("*");
        // whether to send Cookie
        config.setAllowCredentials(true);
        // which request method are allowed
        config.addAllowedMethod("*");
        // Which original request headers are allowed
        config.addAllowedHeader("*");
        // Which original request headers are exposed
        config.addExposedHeader("*");
        // Setting the Expiration Time (10 minutes)
        config.setMaxAge(600L);
        // 2. Adding a Mapping Path
        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
        corsConfigurationSource.registerCorsConfiguration("/**", config);
        return corsConfigurationSource;
    }

    @Bean
    public JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter() {
        return new JwtAuthenticationTokenFilter();
    }
}

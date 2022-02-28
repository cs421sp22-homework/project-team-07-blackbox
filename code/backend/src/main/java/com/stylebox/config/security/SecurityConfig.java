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
                "/register"
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
        // 1. 添加 CORS配置信息
        CorsConfiguration config = new CorsConfiguration();
        // 放行哪些原始域
//        config.addAllowedOrigin("http://localhost:8081");
        config.addAllowedOrigin("*");
        // 是否发送 Cookie
        config.setAllowCredentials(true);
        // 放行哪些请求方式
        config.addAllowedMethod("*");
        // 放行哪些原始请求头部信息
        config.addAllowedHeader("*");
        // 暴露哪些头部信息
        config.addExposedHeader("*");
        // 设置过期时间(10分钟)
        config.setMaxAge(600L);
        // 2. 添加映射路径
        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
        corsConfigurationSource.registerCorsConfiguration("/**", config);
        return corsConfigurationSource;
    }

    @Bean
    public JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter() {
        return new JwtAuthenticationTokenFilter();
    }
}

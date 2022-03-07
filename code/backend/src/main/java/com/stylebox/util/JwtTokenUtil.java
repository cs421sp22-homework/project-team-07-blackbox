package com.stylebox.util;

import com.stylebox.entity.user.User;
import com.stylebox.repository.UserLoginRepository;
import com.stylebox.repository.UserRepository;
import exception.Rest400Exception;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class JwtTokenUtil {

    @Resource
    UserRepository userRepository;

    @Resource
    UserLoginRepository userLoginRepository;

    private static final String CLAIM_KEY_SUBJECT = "sub";

    @Value("${jwt.secret}")
    private String secret;

    private final Clock clock = DefaultClock.INSTANCE;

    @Value("${jwt.token.expiration.in.seconds}")
    private Long expiration;

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, username);
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate);

        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(createdDate)
                .setExpiration(expirationDate).signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    private Date calculateExpirationDate(Date createdDate) {
        return new Date(createdDate.getTime() + expiration * 1000);
    }

    public Long getUserIdFromToken(String token) {
        Long userId;
        try {
            Claims claims = getClaimsFromToken(token);
            String username = claims.getSubject();
            userId = userLoginRepository.findByUsername(username).get().getUser().getId();
        } catch (Exception e) {
            userId = null;
        }
        return userId;
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return claims;
    }

    private String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
            .setClaims(claims)
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }

    public String getJWTFromRequest(HttpServletRequest request) {
        Cookie[] cookieList = request.getCookies();
        String jwt = null;
        if (null != cookieList) {
            for (Cookie cookie : cookieList) {
                if (cookie.getName().equals("jwt")) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }
        return jwt;
    }

    public User getUserFromRequest(HttpServletRequest request) {
        String jwt = getJWTFromRequest(request);
        return getUserFromJwt(jwt);
    }

    public User getUserFromJwt(String jwt) {
        if (null == jwt || jwt.equals("")) {
            throw new Rest400Exception("jwt is null");
        }
        Long userId = getUserIdFromToken(jwt);
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new Rest400Exception("incorrect jwt");
        }
        return user.get();
    }
}

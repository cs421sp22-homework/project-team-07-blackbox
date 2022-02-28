package exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RestException extends RuntimeException {

    private final HttpStatus statusCode;

    private final String displayMessage;

    public RestException(HttpStatus statusCode, String displayMessage) {
        super(statusCode.getReasonPhrase());
        this.statusCode = statusCode;
        this.displayMessage = displayMessage;
    }
}

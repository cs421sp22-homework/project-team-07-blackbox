package exception;

import org.springframework.http.HttpStatus;

public class Rest403Exception extends RestException {

    /**
     * permission denied
     */
    public Rest403Exception(String displayMessage) {
        super(HttpStatus.FORBIDDEN, displayMessage);
    }
}

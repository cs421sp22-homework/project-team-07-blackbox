package exception;

import org.springframework.http.HttpStatus;

public class Rest401Exception extends RestException {

    /**
     * not login
     */
    public Rest401Exception(String displayMessage) {
        super(HttpStatus.UNAUTHORIZED, displayMessage);
    }
}

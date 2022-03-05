package exception;

import org.springframework.http.HttpStatus;


public class Rest400Exception extends RestException {

    /**
     * frontend error
     */
    public Rest400Exception(String displayMessage) {
        super(HttpStatus.BAD_REQUEST, displayMessage);
    }
}

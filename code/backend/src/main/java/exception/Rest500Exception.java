package exception;

import org.springframework.http.HttpStatus;

public class Rest500Exception extends RestException {

    /**
     * backend error
     */
    public Rest500Exception(String displayMessage) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, displayMessage);
    }
}

package exception;

import org.springframework.http.HttpStatus;

public class Rest404Exception extends RestException {

    /**
     * not found
     */
    public Rest404Exception(String displayMessage) {
        super(HttpStatus.NOT_FOUND, displayMessage);
    }
}

package exception;

import org.springframework.http.HttpStatus;

public class Rest500Exception extends RestException {

    /**
     * 后端错误
     *
     * @param displayMessage 错误信息
     */
    public Rest500Exception(String displayMessage) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, displayMessage);
    }
}

package exception;

import org.springframework.http.HttpStatus;


public class Rest400Exception extends RestException {

    /**
     * 前端错误
     *
     * @param displayMessage 错误信息
     */
    public Rest400Exception(String displayMessage) {
        super(HttpStatus.BAD_REQUEST, displayMessage);
    }
}

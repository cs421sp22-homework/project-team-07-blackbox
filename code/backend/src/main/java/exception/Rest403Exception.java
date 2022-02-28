package exception;

import org.springframework.http.HttpStatus;

public class Rest403Exception extends RestException {

    /**
     * 没有权限
     *
     * @param displayMessage 错误信息
     */
    public Rest403Exception(String displayMessage) {
        super(HttpStatus.FORBIDDEN, displayMessage);
    }
}

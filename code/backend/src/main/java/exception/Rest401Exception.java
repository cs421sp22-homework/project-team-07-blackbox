package exception;

import org.springframework.http.HttpStatus;

public class Rest401Exception extends RestException {

    /**
     * 未登录
     *
     * @param displayMessage 错误信息
     */
    public Rest401Exception(String displayMessage) {
        super(HttpStatus.UNAUTHORIZED, displayMessage);
    }
}

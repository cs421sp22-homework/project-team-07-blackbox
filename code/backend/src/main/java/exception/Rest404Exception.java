package exception;

import org.springframework.http.HttpStatus;

public class Rest404Exception extends RestException {

    /**
     * 没有找到资源
     *
     * @param displayMessage 错误信息
     */
    public Rest404Exception(String displayMessage) {
        super(HttpStatus.NOT_FOUND, displayMessage);
    }
}

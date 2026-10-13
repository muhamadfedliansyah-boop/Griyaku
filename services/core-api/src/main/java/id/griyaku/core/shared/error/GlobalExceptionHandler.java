package id.griyaku.core.shared.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.util.UUID;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGenericException(Exception ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ex.getMessage()
        );
        problem.setType(URI.create("https://api.griyaku.id/errors/internal-server-error"));
        problem.setTitle("Internal Server Error");
        problem.setProperty("traceId", "err-" + UUID.randomUUID().toString().substring(0, 8));
        return problem;
    }
}

package id.griyaku.core.shared.ping;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/v1")
public class PingController {

    private final JdbcTemplate jdbcTemplate;

    public PingController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/ping")
    public PingResponse ping() {
        String dbVersion;
        try {
            dbVersion = jdbcTemplate.queryForObject("SELECT version()", String.class);
            if (dbVersion != null && dbVersion.length() > 60) {
                dbVersion = dbVersion.substring(0, 60) + "...";
            }
        } catch (Exception e) {
            dbVersion = "Database query fallback: " + e.getMessage();
        }

        return new PingResponse(
            "ok",
            "griyaku-core-api",
            "griyaku-gateway-go",
            dbVersion,
            Instant.now()
        );
    }
}

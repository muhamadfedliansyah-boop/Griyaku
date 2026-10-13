package id.griyaku.core.shared.ping;

import java.time.Instant;

public record PingResponse(
    String status,
    String service,
    String gateway,
    String database,
    Instant timestamp
) {}

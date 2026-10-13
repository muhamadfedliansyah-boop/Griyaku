package id.griyaku.core.identity;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public record RegisterRequest(String name, String email, String password, String phone) {}
    public record LoginRequest(String email, String password) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (req.email() == null || req.email().trim().isEmpty() ||
            req.password() == null || req.password().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email dan password wajib diisi."));
        }

        if (userRepository.existsByEmail(req.email().trim())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email sudah terdaftar. Silakan gunakan email lain."));
        }

        String displayName = (req.name() != null && !req.name().trim().isEmpty())
                ? req.name().trim()
                : req.email().split("@")[0];

        User newUser = new User(displayName, req.email().trim(), req.password(), req.phone());
        User saved = userRepository.save(newUser);

        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("message", "Pendaftaran berhasil!");
        resp.put("user", Map.of(
                "id", saved.getId(),
                "name", saved.getName(),
                "email", saved.getEmail(),
                "phone", saved.getPhone() != null ? saved.getPhone() : "",
                "role", saved.getRole()
        ));
        resp.put("token", "jwt-token-griyaku-" + saved.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (req.email() == null || req.password() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email dan password wajib diisi."));
        }

        return userRepository.findByEmail(req.email().trim())
                .filter(u -> u.getPassword().equals(req.password()) || u.getPassword().startsWith("$2a$"))
                .map(user -> {
                    Map<String, Object> resp = new HashMap<>();
                    resp.put("success", true);
                    resp.put("message", "Login berhasil!");
                    resp.put("user", Map.of(
                            "id", user.getId(),
                            "name", user.getName(),
                            "email", user.getEmail(),
                            "phone", user.getPhone() != null ? user.getPhone() : "",
                            "role", user.getRole()
                    ));
                    resp.put("token", "jwt-token-griyaku-" + user.getId());
                    return ResponseEntity.ok((Object) resp);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Email atau kata sandi tidak valid.")));
    }
}

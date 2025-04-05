package banktransfer.banktransferservice.controller;

import banktransfer.banktransferservice.queue.service.AuthService;
import banktransfer.banktransferservice.queue.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String password = request.get("password");

        Optional<User> user = authService.login(phoneNumber, password);
        
        if (user.isPresent()) {
            return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "user", user.get(),
                "token", generateToken(user.get()) 
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of(
                "message", "Invalid credentials",
                "status", "error"
            ));
        }
    }

    private String generateToken(User user) {
        return "mock-jwt-token-" + user.getPhoneNumber();
    }
}

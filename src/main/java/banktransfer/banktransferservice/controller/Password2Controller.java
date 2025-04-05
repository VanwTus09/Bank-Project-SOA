package banktransfer.banktransferservice.controller;

import banktransfer.banktransferservice.queue.service.Password2Service;
import banktransfer.banktransferservice.queue.model.Password2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/password2")
public class Password2Controller {
    @Autowired
    private Password2Service password2Service;

    @PostMapping("/pass2")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String password2 = request.get("password2");

        Optional<Password2> password= password2Service.enterpassword2(phoneNumber, password2);
        
        if (password.isPresent()) {
            return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "password", password.get(),
                "token", generateToken(password.get()) 
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of(
                "message", "Invalid credentials",
                "status", "error"
            ));
        }
    }

    private String generateToken(Password2 password2) {
        return "mock-jwt-token-" + password2.getPhoneNumber();
    }
}

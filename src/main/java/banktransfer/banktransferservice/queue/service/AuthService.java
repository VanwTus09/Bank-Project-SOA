package banktransfer.banktransferservice.queue.service;

import banktransfer.banktransferservice.event.channel.AuthEvent;
import banktransfer.banktransferservice.event.channel.LoginHistoryEvent;
import banktransfer.banktransferservice.queue.model.LoginHistory;
import banktransfer.banktransferservice.queue.model.User;
import banktransfer.banktransferservice.queue.repository.AuthRepository;
import banktransfer.banktransferservice.queue.repository.LoginHistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private LoginHistoryRepository loginHistoryRepository;

    @Autowired
    private EventService eventService; 

    public Optional<User> login(String phoneNumber, String password) {
        Optional<User> user = authRepository.findByPhoneNumber(phoneNumber);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            LocalDateTime loginTime = LocalDateTime.now();
            LoginHistory history = new LoginHistory(LocalDateTime.now(), phoneNumber);
            loginHistoryRepository.save(history);
            eventService.publishAuthEvent(new AuthEvent("login_success", user.get(), Map.of("status", "success")));
            eventService.publishLoginHistoryEvent(new LoginHistoryEvent(phoneNumber, loginTime));
            return user; 
        }
         eventService.publishAuthEvent(new AuthEvent("login_failure", null, Map.of("status", "failure", "phoneNumber", phoneNumber)));
         return Optional.empty();
    }
}
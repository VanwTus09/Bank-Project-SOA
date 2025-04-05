package banktransfer.banktransferservice.queue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import banktransfer.banktransferservice.event.channel.AuthEvent;
import banktransfer.banktransferservice.event.channel.Password2Event;
import java.util.Optional;
import java.util.Map;
import banktransfer.banktransferservice.queue.model.Password2;
import banktransfer.banktransferservice.queue.repository.Password2Repository;

@Service
public class Password2Service {
    @Autowired
    private EventService eventService; 
    @Autowired
    private Password2Repository password2Repository;

    public Optional<Password2> enterpassword2(String phoneNumber, String password2) {
        Optional<Password2> password = password2Repository.findByPhoneNumber(phoneNumber);
        if (password.isPresent() && password.get().getPassword2().equals(password2)) {
            eventService.publishPassword2Event(new Password2Event("login_success", password.get(), Map.of("status", "success")));
            return password; 
        }
         eventService.publishAuthEvent(new AuthEvent("login_failure", null, Map.of("status", "failure", "phoneNumber", phoneNumber)));
         return Optional.empty();
    }
}

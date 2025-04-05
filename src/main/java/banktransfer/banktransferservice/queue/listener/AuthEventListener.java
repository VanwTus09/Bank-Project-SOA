package banktransfer.banktransferservice.queue.listener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import banktransfer.banktransferservice.event.channel.AuthEvent;
import banktransfer.banktransferservice.event.mediator.EventMediator;
import jakarta.annotation.PostConstruct;

@Component
public class AuthEventListener {
    @Autowired
    private EventMediator eventMediator;

    @PostConstruct
    public void init() {
        eventMediator.registerAuthListener(this::handleAuthEvent); // ✅ Đăng ký listener
    }

    @EventListener
    public void handleAuthEvent(AuthEvent event) {
        System.out.println("Event received: " + event.getEventType() + " for user: " + (event.getUser() != null ? event.getUser().getPhoneNumber() : "Unknown"));
    }
}
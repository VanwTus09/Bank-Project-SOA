package banktransfer.banktransferservice.queue.listener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import banktransfer.banktransferservice.event.channel.LoginHistoryEvent;
import banktransfer.banktransferservice.event.mediator.EventMediator;
import jakarta.annotation.PostConstruct;

@Component
public class LoginHistoryEventListener {
    @Autowired
    private EventMediator eventMediator;

    @PostConstruct
    public void init() {
        eventMediator.registerLoginHistoryListener(this::handleLoginHistoryEvent);
    }

    @EventListener
    public void handleLoginHistoryEvent(LoginHistoryEvent event) {
        System.out.println("Login history saved: User " + event.getPhoneNumber() + " logged in at " + event.getLoginTime());
    }
}

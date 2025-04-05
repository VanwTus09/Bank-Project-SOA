package banktransfer.banktransferservice.queue.listener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import banktransfer.banktransferservice.event.channel.Password2Event;
import banktransfer.banktransferservice.event.mediator.EventMediator;
import jakarta.annotation.PostConstruct;

@Component
public class Password2EventListener {
    @Autowired
    private EventMediator eventMediator;

    @PostConstruct
    public void init() {
        eventMediator.registerPassword2Listener(this::handlePassword2Event);
    }

    @EventListener
    public void handlePassword2Event(Password2Event event) {
        System.out.println("Event received: " + event.getEventType() + " for user: " + (event.getPassword2() != null ? event.getPassword2().getPhoneNumber() : "Unknown"));
    }
}

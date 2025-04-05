package banktransfer.banktransferservice.queue.listener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;

import banktransfer.banktransferservice.event.channel.ContactEvent;
import banktransfer.banktransferservice.event.mediator.EventMediator;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
@Component
public class ContactListener {
    @Autowired
    private EventMediator eventMediator;

    @PostConstruct
    public void init() {
        eventMediator.registerContactListener(this::handleContactEvent); 
        eventMediator.registerContactExistsListener(this::handleContactExistsEvent); 
    }
    @EventListener
    public void handleContactEvent(ContactEvent event) {
        System.out.println("New contact created: " + event.getContact().getContactName() + " - nameBank:" + event.getContact().getBankName() + " - phoneNumber:" + event.getContact().getPhoneNumber() + " - contactAccount: "+event.getContact().getContactAccount());
    }
    @EventListener
    public void handleContactExistsEvent(ContactEvent event) {
        System.out.println("Contact already exists: " + event.getContact().getContactName());
    }
}

package banktransfer.banktransferservice.event.channel;

import banktransfer.banktransferservice.queue.model.Contact;

public class ContactEvent {
    private final String eventType;
    private final Contact contact;

    public ContactEvent(String eventType, Contact contact) {
        this.eventType = eventType;
        this.contact = contact;
    }

    public String getEventType() {
        return eventType;
    }

    public Contact getContact() {
        return contact;
    }
}

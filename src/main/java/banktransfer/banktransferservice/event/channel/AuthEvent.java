package banktransfer.banktransferservice.event.channel;

import banktransfer.banktransferservice.queue.model.User;

import java.util.Map;

public class AuthEvent { 
    private final String eventType; 
    private final User user;
    private final Map<String, Object> metadata; 

    public AuthEvent(String eventType, User user, Map<String, Object> metadata) {
        this.eventType = eventType;
        this.user = user;
        this.metadata = metadata;
    }
    public String getEventType() {
        return eventType;
    }

    public User getUser() {
        return user;
    }
    public Map<String, Object> getMetadata() {
        return metadata;
    }
}

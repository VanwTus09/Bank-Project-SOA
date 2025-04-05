package banktransfer.banktransferservice.event.channel;

import java.util.Map;

import banktransfer.banktransferservice.queue.model.Password2;

public class Password2Event {
    private final String eventType; // Loại sự kiện (login_success, login_failure,...)
    private final Password2 password2;
    private final Map<String, Object> metadata; // Dữ liệu bổ sung

    public Password2Event(String eventType, Password2 password2, Map<String, Object> metadata) {
        this.eventType = eventType;
        this.password2 = password2;
        this.metadata = metadata;
    }

    public String getEventType() {
        return eventType;
    }

    public Password2 getPassword2() {
        return password2;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }
}

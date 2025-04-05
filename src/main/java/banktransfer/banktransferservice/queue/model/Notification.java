package banktransfer.banktransferservice.queue.model;

import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "notifications")
public class Notification {
    private String phoneNumber;
    private String title;
    private String description;
    private LocalDateTime createdAt;

    public String getphoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public Notification(String phoneNumber, String title, String description) {
        this.phoneNumber = phoneNumber;
        this.title = title;
        this.description = description;
        this.createdAt = LocalDateTime.now();
    }
}

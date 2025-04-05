package banktransfer.banktransferservice.queue.model;

import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "transactions")
public class Transaction {
    private String phoneNumber;
    private String toFullName;
    private String description;
    private LocalDateTime completedAt;
    private double money;


    public Transaction(String phoneNumber, String toFullName, String description, LocalDateTime completedAt, double money) {
        this.phoneNumber = phoneNumber;
        this.toFullName = toFullName;
        this.description = description; 
        this.completedAt = completedAt;
        this.money = money;
    }
    public double getMoney() {
        return money;
    }
    public void setMoney(double money) {
        this.money = money;
    }
    public String getToFullName() {
        return toFullName;
    }

    public void setToFullName(String toFullName) {
        this.toFullName = toFullName;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
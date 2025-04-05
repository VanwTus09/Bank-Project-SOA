package banktransfer.banktransferservice.queue.model;

import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "loginhistory")
public class LoginHistory {
    private LocalDateTime loginTime;
    private String phoneNumber;

    public LoginHistory(LocalDateTime loginTime, String phoneNumber) {
        this.loginTime = loginTime;
        this.phoneNumber = phoneNumber;
    }
    public LocalDateTime getLoginTime() { return loginTime; }
    public void setLoginTime(LocalDateTime loginTime) { this.loginTime = loginTime; }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
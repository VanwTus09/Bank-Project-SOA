package banktransfer.banktransferservice.event.channel;

import java.time.LocalDateTime;

public class LoginHistoryEvent {
    private final String phoneNumber;
    private final LocalDateTime loginTime;

    public LoginHistoryEvent(String phoneNumber, LocalDateTime loginTime) {
        this.phoneNumber = phoneNumber;
        this.loginTime = loginTime;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public LocalDateTime getLoginTime() {
        return loginTime;
    }
}

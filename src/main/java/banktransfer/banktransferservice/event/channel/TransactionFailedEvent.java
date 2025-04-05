package banktransfer.banktransferservice.event.channel;

public class TransactionFailedEvent {
    private final String reason;
    private final String phoneNumber;

    public TransactionFailedEvent(String reason, String phoneNumber) {
        this.reason = reason;
        this.phoneNumber = phoneNumber;
    }

    public String getReason() {
        return reason;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}

package banktransfer.banktransferservice.event.channel;
import banktransfer.banktransferservice.queue.model.Transaction;

public class TransactionEvent {
    private final String eventType;
    private final Transaction transaction;

    public TransactionEvent(String eventType, Transaction transaction) {
        this.eventType = eventType;
        this.transaction = transaction;
    }

    public String getEventType() {
        return eventType;
    }

    public Transaction getTransaction() {
        return transaction;
    }
}

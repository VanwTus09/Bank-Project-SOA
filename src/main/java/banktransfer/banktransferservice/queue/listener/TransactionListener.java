package banktransfer.banktransferservice.queue.listener;

import banktransfer.banktransferservice.event.channel.TransactionEvent;
import banktransfer.banktransferservice.event.channel.TransactionFailedEvent;
import banktransfer.banktransferservice.event.mediator.EventMediator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class TransactionListener {

    @Autowired
    private EventMediator eventMediator;

    @PostConstruct
    public void init() {
        eventMediator.registerTransactionListener(this::handleTransactionEvent);
        eventMediator.registerTransactionFailedListener(this::handleTransactionFailedEvent);
    }
    @EventListener
    public void handleTransactionEvent(TransactionEvent event) {
        System.out.println("✅ Giao dịch thành công:");
        System.out.println("From: " + event.getTransaction().getPhoneNumber() +
                           " | To: " + event.getTransaction().getToFullName() +
                           " | Amount: " + event.getTransaction().getMoney() +
                           " | Desc: " + event.getTransaction().getDescription());
    }
    @EventListener
    public void handleTransactionFailedEvent(TransactionFailedEvent event) {
        System.out.println("❌ Giao dịch thất bại:");
    }
}

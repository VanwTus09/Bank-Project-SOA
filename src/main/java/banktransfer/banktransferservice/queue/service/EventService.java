package banktransfer.banktransferservice.queue.service;

import org.springframework.beans.factory.annotation.Autowired;
import banktransfer.banktransferservice.event.channel.AuthEvent;
import banktransfer.banktransferservice.event.channel.LoginHistoryEvent;
import banktransfer.banktransferservice.event.channel.Password2Event;
import banktransfer.banktransferservice.event.channel.TransactionEvent;
import banktransfer.banktransferservice.event.channel.TransactionFailedEvent;
import banktransfer.banktransferservice.event.channel.ContactEvent;
import banktransfer.banktransferservice.event.mediator.EventMediator;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    @Autowired
    private EventMediator eventMediator;

    public void publishAuthEvent(AuthEvent event) {
        eventMediator.dispatchAuth(event);
    }
    public void publishLoginHistoryEvent(LoginHistoryEvent event) {
        eventMediator.dispatchLoginHistory(event);
    }
    public void publishPassword2Event(Password2Event event) {
        eventMediator.dispatchPassword2(event);
    }
    public void publishContactEvent(ContactEvent event) {
        eventMediator.dispatchContact(event);
    }
    public void publishContactExistsEvent(ContactEvent event) {
        eventMediator.dispatchContactExists(event);
    }
    public void publishTransactionEvent(TransactionEvent event) {
    eventMediator.dispatchTransaction(event);
    }

    public void publishTransactionFailedEvent(TransactionFailedEvent event) {
        eventMediator.dispatchTransactionFailed(event);
    }

}

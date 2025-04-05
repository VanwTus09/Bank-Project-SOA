package banktransfer.banktransferservice.event.mediator;

import banktransfer.banktransferservice.event.channel.AuthEvent;
import banktransfer.banktransferservice.event.channel.LoginHistoryEvent;
import banktransfer.banktransferservice.event.channel.Password2Event;
import banktransfer.banktransferservice.event.channel.TransactionEvent;
import banktransfer.banktransferservice.event.channel.TransactionFailedEvent;
import banktransfer.banktransferservice.event.channel.ContactEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import org.springframework.stereotype.Component;

@Component
public class EventMediator {
    private List<Consumer<AuthEvent>> authListeners = new ArrayList<>();
    private List<Consumer<LoginHistoryEvent>> loginHistoryListeners = new ArrayList<>();
    private List<Consumer<Password2Event>> password2Listeners = new ArrayList<>();
    private List<Consumer<ContactEvent>> contactEvenListeners = new ArrayList<>();
    private List<Consumer<ContactEvent>> contactExistsListeners = new ArrayList<>(); 
    private List<Consumer<TransactionEvent>> transactionListeners = new ArrayList<>();
    private List<Consumer<TransactionFailedEvent>> transactionFailedListeners = new ArrayList<>();


    public void registerAuthListener(Consumer<AuthEvent> listener) {
        authListeners.add(listener);
    }

    public void registerLoginHistoryListener(Consumer<LoginHistoryEvent> listener) {
        loginHistoryListeners.add(listener);
    }

    public void registerPassword2Listener(Consumer<Password2Event> listener) {
        password2Listeners.add(listener);
    }
    public void registerContactListener(Consumer<ContactEvent> listener) {
        contactEvenListeners.add(listener);
    }
    public void registerContactExistsListener(Consumer<ContactEvent> listener) {
        contactExistsListeners.add(listener);
    }
    public void registerTransactionListener(Consumer<TransactionEvent> listener) {
        transactionListeners.add(listener);
    }
    public void registerTransactionFailedListener(Consumer<TransactionFailedEvent> listener) {
        transactionFailedListeners.add(listener);
    }
    public void dispatchTransaction(TransactionEvent event) {
        for (Consumer<TransactionEvent> listener : transactionListeners) {
            listener.accept(event);
        }
    }
    public void dispatchTransactionFailed(TransactionFailedEvent event) {
        for (Consumer<TransactionFailedEvent> listener : transactionFailedListeners) {
            listener.accept(event);
        }
    }
    public void dispatchAuth(AuthEvent event) {
        for (Consumer<AuthEvent> listener : authListeners) {
            listener.accept(event);
        }
    }
    public void dispatchLoginHistory(LoginHistoryEvent event) {
        for (Consumer<LoginHistoryEvent> listener : loginHistoryListeners) {
            listener.accept(event);
        }
    }
    public void dispatchPassword2(Password2Event event) {
        for (Consumer<Password2Event> listener : password2Listeners) {
            listener.accept(event);
        }
    }
    public void dispatchContact(ContactEvent event) {
        for (Consumer<ContactEvent> listener : contactEvenListeners) {
            listener.accept(event);
        }
    }
    public void dispatchContactExists(ContactEvent event) {
        for (Consumer<ContactEvent> listener : contactExistsListeners) {
            listener.accept(event);
        }
    }
}

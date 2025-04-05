package banktransfer.banktransferservice.queue.service;

import banktransfer.banktransferservice.queue.repository.TransactionRepository;
import banktransfer.banktransferservice.queue.repository.BankAccountRepository;
import banktransfer.banktransferservice.queue.repository.NotificationRepository;
import banktransfer.banktransferservice.queue.repository.OtherBankAccountRepository;
import banktransfer.banktransferservice.event.channel.TransactionEvent;
import banktransfer.banktransferservice.event.channel.TransactionFailedEvent;
import banktransfer.banktransferservice.queue.model.BankAccount;
import banktransfer.banktransferservice.queue.model.OtherBankAccount;
import banktransfer.banktransferservice.queue.model.Transaction;
import banktransfer.banktransferservice.queue.model.Notification;
import banktransfer.banktransferservice.queue.model.TransactionRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private EventService eventService;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private OtherBankAccountRepository otherBankAccountRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionsByPhoneNumber(String phoneNumber) {
        return transactionRepository.findByPhoneNumber(phoneNumber);
    }

    @Transactional 
    public void processTransaction(TransactionRequest transactionRequest) {
        // 1. Kiểm tra tài khoản gửi
        BankAccount sender = bankAccountRepository.findByPhoneNumber(transactionRequest.getPhoneNumber());
        if (sender == null) {
            eventService.publishTransactionFailedEvent(new TransactionFailedEvent("Sender account not found.", transactionRequest.getPhoneNumber()));
        }
        if (sender.getBalance() < transactionRequest.getMoney()) {
            eventService.publishTransactionFailedEvent(new TransactionFailedEvent("Insufficient balance.", transactionRequest.getPhoneNumber()));
        }

        // 2. Kiểm tra tài khoản nhận
        OtherBankAccount receiver = otherBankAccountRepository.findByContactAccountAndBankName(transactionRequest.getContactAccount(), transactionRequest.getNameBank());
        BankAccount receiver2 = bankAccountRepository.findByPhoneNumber(transactionRequest.getContactAccount());
        if (receiver == null || receiver.getContactAccount() == sender.getPhoneNumber()) {
            if (receiver2 == null || receiver2.getPhoneNumber() == sender.getPhoneNumber()) {
                eventService.publishTransactionFailedEvent(new TransactionFailedEvent("Receiver account not found.", transactionRequest.getPhoneNumber()));
            }
        }

        // 3. Trừ tiền người gửi & cộng tiền người nhận
        sender.setBalance(sender.getBalance() - transactionRequest.getMoney());
        if (receiver != null){
            receiver.setBalance(receiver.getBalance() + transactionRequest.getMoney());
        }
        else {
            receiver2.setBalance(receiver2.getBalance() + transactionRequest.getMoney());
        }

        // 4. Lưu thay đổi vào database
        bankAccountRepository.save(sender);
        if (receiver != null){
            otherBankAccountRepository.save(receiver);
        }
        else {
            bankAccountRepository.save(receiver2);
        }
        // 5. Lưu thông tin giao dịch
        Transaction transaction = new Transaction(transactionRequest.getPhoneNumber(), receiver.getFullName(), transactionRequest.getDescription(), LocalDateTime.now(), transactionRequest.getMoney());
        transactionRepository.save(transaction);

         // 6. Tạo thông báo
        Notification senderNotification = new Notification(transactionRequest.getPhoneNumber(), "Giao dịch thành công", "Bạn đã chuyển " + transactionRequest.getMoney() + " " + sender.getCurrency() + " đến số " + receiver.getContactAccount()); notificationRepository.save(senderNotification);

        // 7. Nếu ngân hàng của người nhận là "Reen Bank", tạo thêm thông báo cho contactAccount
        if ("Reen Bank".equals(receiver.getBankName())) {
        Notification reenBankReceiverNotification = new Notification(transactionRequest.getContactAccount(), "Nhận tiền", "Bạn đã nhận " + transactionRequest.getMoney() + " " + receiver.getCurrency() + " từ số " + transactionRequest.getPhoneNumber());
        notificationRepository.save(reenBankReceiverNotification);}
        // 8. Phát sự kiện giao dịch
        eventService.publishTransactionEvent(new TransactionEvent("TRANSACTION_SUCCESS", transaction));
    }
}

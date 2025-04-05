package banktransfer.banktransferservice.queue.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import banktransfer.banktransferservice.queue.model.BankAccount;

public interface BankAccountRepository  extends MongoRepository<BankAccount, String> {
    BankAccount findByPhoneNumber(String phoneNumber); 
}

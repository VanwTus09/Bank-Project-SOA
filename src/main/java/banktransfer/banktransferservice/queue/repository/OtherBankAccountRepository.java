package banktransfer.banktransferservice.queue.repository;

import banktransfer.banktransferservice.queue.model.OtherBankAccount;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OtherBankAccountRepository extends MongoRepository<OtherBankAccount, String> {
    OtherBankAccount findByContactAccountAndBankName(String contactAccount, String bankName);
}

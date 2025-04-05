package banktransfer.banktransferservice.queue.service;

import banktransfer.banktransferservice.queue.model.OtherBankAccount;
import banktransfer.banktransferservice.queue.repository.OtherBankAccountRepository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class OtherBankAccountService {
    @Autowired
    private OtherBankAccountRepository otherBankAccountRespository;

    public List<OtherBankAccount> getAllOtherBankAccounts() {
        return otherBankAccountRespository.findAll();
    }

    public OtherBankAccount findByContactAccountAndBankName(String contactAccount, String bankName) {
        return otherBankAccountRespository.findByContactAccountAndBankName(contactAccount, bankName);
    }
}

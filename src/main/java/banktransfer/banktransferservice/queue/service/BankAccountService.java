package banktransfer.banktransferservice.queue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import banktransfer.banktransferservice.queue.model.BankAccount;
import banktransfer.banktransferservice.queue.repository.BankAccountRepository;

@Service
public class BankAccountService {
@Autowired
    private BankAccountRepository bankAccountRepository;

    public List<BankAccount> getAllBankAccounts() {
        return bankAccountRepository.findAll();
    }
    public BankAccount getBankAccountByPhoneNumber(String phoneNumber) {
        return bankAccountRepository.findByPhoneNumber(phoneNumber);
    }
}

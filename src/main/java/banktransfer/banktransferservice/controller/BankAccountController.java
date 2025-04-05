package banktransfer.banktransferservice.controller;

import banktransfer.banktransferservice.queue.model.BankAccount;
import banktransfer.banktransferservice.queue.model.User;
import banktransfer.banktransferservice.queue.repository.AuthRepository;
import banktransfer.banktransferservice.queue.service.BankAccountService;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bankaccounts")
public class BankAccountController {

    @Autowired
    private BankAccountService bankAccountService;
    @Autowired
    private AuthRepository authRepository;

    @GetMapping
    public List<BankAccount> getAllBankAccounts() {
        return bankAccountService.getAllBankAccounts();
    }

    @GetMapping("/search") // Sửa lại để dùng @RequestParam thay vì @PathVariable
    public BankAccount getBankAccountByPhoneNumber(@RequestParam String phoneNumber) {
        BankAccount bankAccount = bankAccountService.getBankAccountByPhoneNumber(phoneNumber);
        if (bankAccount == null) {
            throw new RuntimeException("No notifications found contactAccount " + phoneNumber );
        }
        return bankAccount; // Trả về danh sách thông báo
    }
    @GetMapping("/search/user") 
    public Optional<User> getUserNameByPhoneNumber(@RequestParam String phoneNumber) {
        Optional<User> user = authRepository.findByPhoneNumber(phoneNumber);
        if (user == null) {
            throw new RuntimeException("No notifications found contactAccount " + phoneNumber );
        }
        return user; // Trả về danh sách thông báo
    }
}

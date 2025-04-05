package banktransfer.banktransferservice.controller;

import banktransfer.banktransferservice.queue.model.OtherBankAccount;
import banktransfer.banktransferservice.queue.service.OtherBankAccountService;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/otherbankaccounts")
public class OtherBankAccountController {

    @Autowired
    private OtherBankAccountService otherBankAccountService;

    @GetMapping
    public List<OtherBankAccount> getAllContacts() {
        return otherBankAccountService.getAllOtherBankAccounts();
    }

    @GetMapping("/search") 
    public OtherBankAccount findByContactAccountAndBankName(@RequestParam String contactAccount, String bankName) {
        OtherBankAccount otherBankAccount = otherBankAccountService.findByContactAccountAndBankName(contactAccount, bankName);
        if (otherBankAccount == null) {
            throw new RuntimeException("No notifications found contactAccount " + contactAccount + " and bankName "+ bankName);
        }
        return otherBankAccount;
    }
}

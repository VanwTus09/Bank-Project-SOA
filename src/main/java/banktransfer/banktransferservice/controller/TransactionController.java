package banktransfer.banktransferservice.controller;

import banktransfer.banktransferservice.queue.model.Transaction;
import banktransfer.banktransferservice.queue.model.TransactionRequest;
import banktransfer.banktransferservice.queue.service.TransactionService;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;


    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/search") // Sửa lại để dùng @RequestParam thay vì @PathVariable
    public List<Transaction> getByPhoneNumber(@RequestParam String phoneNumber) {
        List<Transaction> transactions = transactionService.getTransactionsByPhoneNumber(phoneNumber);
        if (transactions.isEmpty()) {
            throw new RuntimeException("No notifications found for userId: " + phoneNumber);
        }
        return transactions; // Trả về danh sách thông báo
    }
    // Xử lý giao dịch
    @PostMapping("/process")
    public ResponseEntity<String> processTransaction(@RequestBody TransactionRequest transactionRequest) {
        try {
            transactionService.processTransaction(transactionRequest);
            return ResponseEntity.ok("Transaction processed successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Transaction failed: " + e.getMessage());
        }
    }
}

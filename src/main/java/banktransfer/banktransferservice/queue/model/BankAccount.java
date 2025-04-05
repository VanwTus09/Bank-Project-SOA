package banktransfer.banktransferservice.queue.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "bankaccounts")
public class BankAccount {
    @Id
    private String phoneNumber;
    private double balance;
    private String currency;

    // Constructors
    public BankAccount() {}

    public BankAccount(String phoneNumber, double balance, String currency) {
        this.phoneNumber = phoneNumber;
        this.balance = balance;
        this.currency = currency;
    }

    // Getters and Setters
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
}

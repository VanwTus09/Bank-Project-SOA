package banktransfer.banktransferservice.queue.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "otherbankaccounts")
public class OtherBankAccount {
    @Id
    private String contactAccount;
    private String bankName;
    private String fullName;
    private String currency;
    private double balance; 

    public OtherBankAccount() {}
    public OtherBankAccount(String bankName, String fullName, String contactAccount, String currency, double balance) {
        this.bankName = bankName;
        this.fullName = fullName;
        this.contactAccount = contactAccount;
        this.currency = currency;
        this.balance = balance;
    }
    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getContactAccount() { return contactAccount; }
    public void setContactAccount(String contactAccount) { this.contactAccount = contactAccount; }

    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
}

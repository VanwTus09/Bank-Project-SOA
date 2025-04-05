package banktransfer.banktransferservice.queue.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "contacts")
public class Contact {
    private String bankName;
    private String phoneNumber;
    private String contactName;
    private String contactAccount;

    public Contact() {}
    public Contact(String bankName, String phoneNumber, String contactName, String contactAccount) {
        this.phoneNumber = phoneNumber;
        this.contactName = contactName;
        this.contactAccount = contactAccount;
        this.bankName = bankName;
    }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getContactName() { return contactName; }
    public void setContactName(String contactName) { this.contactName = contactName; }

    public String getContactAccount() { return contactAccount; }
    public void setContactAccount(String contactAccount) { this.contactAccount = contactAccount; }
    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }
}

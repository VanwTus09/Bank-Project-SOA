package banktransfer.banktransferservice.queue.model;

public class TransactionRequest {
    private String phoneNumber;
    private String nameBank;
    private String contactAccount;
    private double money;
    private String description;

    public TransactionRequest(){}
    public TransactionRequest(String phoneNumber, String nameBank, String contactAccount, double money,
            String description) {
        this.phoneNumber = phoneNumber;
        this.nameBank = nameBank;
        this.contactAccount = contactAccount;
        this.money = money;
        this.description = description;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getNameBank() {
        return nameBank;
    }
    public void setNameBank(String nameBank) {
        this.nameBank = nameBank;
    }
    public String getContactAccount() {
        return contactAccount;
    }
    public void setContactAccount(String contactAccount) {
        this.contactAccount = contactAccount;
    }
    public double getMoney() {
        return money;
    }
    public void setMoney(double money) {
        this.money = money;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}

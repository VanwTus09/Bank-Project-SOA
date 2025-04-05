package banktransfer.banktransferservice.queue.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "password2")
public class Password2 {
    private String phoneNumber;
    private String password2;


    // Constructors
    public Password2() {}

    public Password2(String phoneNumber,String password2) {
        this.phoneNumber = phoneNumber;
        this.password2 = password2;

    }

    // Getters and Setters
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }
}

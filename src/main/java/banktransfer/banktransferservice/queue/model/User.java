package banktransfer.banktransferservice.queue.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.util.Map;

@Document(collection = "users") 
public class User {
    @Id
    private String phoneNumber;
    private String fullName;
    private String password;
    private Map<String, Object> userData;

    public Map<String, Object> getUserData() { return userData; }
    public void setUserData(Map<String, Object> userData) { this.userData = userData; }
    public User() {} 
    public User(String fullName, String phoneNumber, String password) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getPassword() {
        return password;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setPassword(String password) {
        this.password = password;
    }}
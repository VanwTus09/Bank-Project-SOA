package banktransfer.banktransferservice.queue.service;

import banktransfer.banktransferservice.queue.model.LoginHistory;
import banktransfer.banktransferservice.queue.repository.LoginHistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class LoginHistoryService {
    @Autowired
    private LoginHistoryRepository loginHistoryRepository;

    public List<LoginHistory> getAllLoginHistories() {
        return loginHistoryRepository.findAll();
    }

    public List<LoginHistory> getLoginHistoryByPhoneNumber(String phoneNumber) {
        return loginHistoryRepository.findByPhoneNumber(phoneNumber);
    }
    public LoginHistory saveLoginHistory(LoginHistory loginHistory) {
        return loginHistoryRepository.save(loginHistory);
    }
}

package banktransfer.banktransferservice.controller;

import banktransfer.banktransferservice.queue.service.LoginHistoryService;
import banktransfer.banktransferservice.queue.model.LoginHistory;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/loginhistory")
public class LoginHistoryController {
    @Autowired
    private LoginHistoryService loginHistoryService;

    @GetMapping()
    public List<LoginHistory> getAllLoginHistories() {
        return loginHistoryService.getAllLoginHistories(); 
    }
    @GetMapping("/search") // Sửa lại để dùng @RequestParam thay vì @PathVariable
    public List<LoginHistory> getLoginHistoryByPhoneNumber(@RequestParam String phoneNumber) {
        List<LoginHistory> loginHistories = loginHistoryService.getLoginHistoryByPhoneNumber(phoneNumber);
        if (loginHistories.isEmpty()) {
            throw new RuntimeException("No notifications found for userId: " + phoneNumber);
        }
        return loginHistories; // Trả về danh sách thông báo
    }
    @PostMapping("/loginlatest")//phần này bổ trợ FE thôi
    public LoginHistory loginlatest(@RequestBody LoginHistory loginHistory) {
        System.out.println(loginHistory);
        LoginHistory getLoginLatest = loginHistoryService.saveLoginHistory( loginHistory );
        
        return getLoginLatest;
    }
}

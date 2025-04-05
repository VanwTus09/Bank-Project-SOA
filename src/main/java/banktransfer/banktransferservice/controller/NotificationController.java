package banktransfer.banktransferservice.controller;

import banktransfer.banktransferservice.queue.model.Notification;
import banktransfer.banktransferservice.queue.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<Notification> getAll() {
        return notificationService.getAllNotifications(); // Lấy tất cả thông báo từ MongoDB
    }

    @GetMapping("/search") // Sửa lại để dùng @RequestParam thay vì @PathVariable
    public List<Notification> getByPhoneNumber(@RequestParam String phoneNumber) {
        List<Notification> notifications = notificationService.getNotificationsByPhoneNumber(phoneNumber);
        if (notifications.isEmpty()) {
            throw new RuntimeException("No notifications found for userId: " + phoneNumber);
        }
        return notifications; // Trả về danh sách thông báo
    }
}
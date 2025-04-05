package banktransfer.banktransferservice.queue.service;

import banktransfer.banktransferservice.queue.repository.NotificationRepository;
import banktransfer.banktransferservice.queue.model.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public List<Notification> getNotificationsByPhoneNumber(String phoneNumber) {
        return notificationRepository.findByPhoneNumber(phoneNumber);
    }
}

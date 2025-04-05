package banktransfer.banktransferservice.queue.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import banktransfer.banktransferservice.queue.model.Notification;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByPhoneNumber(String phoneNumber);
}

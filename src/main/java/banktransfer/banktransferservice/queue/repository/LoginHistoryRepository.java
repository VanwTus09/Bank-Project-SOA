package banktransfer.banktransferservice.queue.repository;

import banktransfer.banktransferservice.queue.model.LoginHistory;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LoginHistoryRepository extends MongoRepository<LoginHistory, String> {
    List<LoginHistory> findByPhoneNumber(String phoneNumber); 
}

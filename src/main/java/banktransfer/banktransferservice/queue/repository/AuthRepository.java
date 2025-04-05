package banktransfer.banktransferservice.queue.repository;

import banktransfer.banktransferservice.queue.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AuthRepository extends MongoRepository<User, String> {
    Optional<User> findByPhoneNumber(String phoneNumber); 
}
package banktransfer.banktransferservice.queue.repository;

import banktransfer.banktransferservice.queue.model.Password2;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface Password2Repository extends MongoRepository<Password2, String> {
    Optional<Password2> findByPhoneNumberAndPassword2(String phoneNumber, String password2);
    Optional<Password2> findByPhoneNumber(String phoneNumber);
}

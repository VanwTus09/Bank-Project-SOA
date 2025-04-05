package banktransfer.banktransferservice.queue.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

import banktransfer.banktransferservice.queue.model.Transaction;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
        List<Transaction> findByPhoneNumber(String phoneNumber); //Optional là một wrapper class trong Java, dùng để đại diện cho một giá trị có thể có hoặc không có (tức là null). Nó được giới thiệu từ Java 8 để giúp xử lý null an toàn hơn và tránh lỗi NullPointerException.
}

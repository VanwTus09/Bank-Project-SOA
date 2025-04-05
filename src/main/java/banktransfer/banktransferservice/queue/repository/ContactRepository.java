package banktransfer.banktransferservice.queue.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import banktransfer.banktransferservice.queue.model.Contact;

import java.util.List;
import java.util.Optional;

public interface ContactRepository extends MongoRepository<Contact, String> {
    List<Contact> findByPhoneNumber(String phoneNumber);
    Optional<Contact> findByPhoneNumberAndBankNameAndContactAccount(String phoneNumber, String bankName, String contactAccount);
}
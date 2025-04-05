package banktransfer.banktransferservice.queue.service;

import banktransfer.banktransferservice.queue.repository.ContactRepository;
import banktransfer.banktransferservice.event.channel.ContactEvent;
import banktransfer.banktransferservice.queue.model.Contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class ContactService {
    @Autowired
    private EventService eventService; // Dùng để phát sự kiện

    @Autowired
    private ContactRepository contactRepository;

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public List<Contact> getContactsByPhoneNumber(String phoneNumber) {
        return contactRepository.findByPhoneNumber(phoneNumber);
    }
    public Contact saveContact(Contact contact) {
        Optional<Contact> existingContact = contactRepository.findByPhoneNumberAndBankNameAndContactAccount(contact.getPhoneNumber(), contact.getBankName(), contact.getContactAccount());
        if (existingContact.isPresent()) {
            eventService.publishContactExistsEvent(new ContactEvent("contact_exists", existingContact.get()));
            return null;  
        }
        Contact savedContact = contactRepository.save(contact);
        eventService.publishContactEvent(new ContactEvent("contact_created", savedContact));
        return savedContact;
    }
}

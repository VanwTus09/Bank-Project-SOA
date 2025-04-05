package banktransfer.banktransferservice.controller;

import banktransfer.banktransferservice.queue.model.Contact;
import banktransfer.banktransferservice.queue.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;


    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    @GetMapping("/search") 
    public List<Contact> getByPhoneNumber(@RequestParam String phoneNumber) {
        List<Contact> contacts = contactService.getContactsByPhoneNumber(phoneNumber);
        if (contacts.isEmpty()) {
            throw new RuntimeException("No notifications found for userId: " + phoneNumber);
        }
        return contacts; 
    }
    @PostMapping("/save")
    public Contact saveContact(@RequestBody Contact contact) {
        return contactService.saveContact(contact);
    }
}

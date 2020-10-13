package schedule.web;

import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.*;
import schedule.microservice.*;
import schedule.model.*;
import javax.validation.*;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerMicro customerMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewCustomer(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        user.setAccountType(AccountType.Customer);
        Customer customer = customerMicro.saveOrUpdate(new Customer(user.getUserId(), user));
        return new ResponseEntity<>(customer, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable long id)
    {
        Customer customer = customerMicro.getCustomerById(id);
        return customer != null ? new ResponseEntity<>(customer, HttpStatus.FOUND) : 
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }
}




/*
public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {

        Person person1 = personService.saveOrUpdatePerson(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREA
 */
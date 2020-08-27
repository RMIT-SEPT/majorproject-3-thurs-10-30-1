package schedule.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import schedule.microservice.CustomerMicro;
import schedule.model.Customer;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerMicro customerMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody Customer customer, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        Customer user1 = customerMicro.saveOrUpdate(customer);
        return new ResponseEntity<>(customer, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable long id)
    {
        return customerMicro.customerExistsById(id) ? new ResponseEntity<>(customerMicro.getCustomerById(id).get(0), HttpStatus.FOUND) : 
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }
}




/*
public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {

        Person person1 = personService.saveOrUpdatePerson(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREA
 */
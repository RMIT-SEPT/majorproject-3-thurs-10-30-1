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
        return customer != null ? new ResponseEntity<>(customer, HttpStatus.OK) : 
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}/bookings")
    public ResponseEntity<?> getBookings(@PathVariable long id)
    {
        Customer customer = customerMicro.getCustomerById(id);
        return customer != null ? new ResponseEntity<>(customer.getBookings(), HttpStatus.OK) : 
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }
}

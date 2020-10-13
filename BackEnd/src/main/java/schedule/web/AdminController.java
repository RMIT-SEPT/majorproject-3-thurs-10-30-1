package schedule.web;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;
import schedule.microservice.*;
import schedule.model.*;
import javax.validation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminMicro adminMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewAdmin(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        user.setAccountType(AccountType.Admin);
        Admin admin = adminMicro.saveOrUpdate(new Admin(user.getUserId(), user));
        return new ResponseEntity<>(admin, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable long id)
    {
        Admin admin = adminMicro.getAdminById(id);
        return admin != null ? new ResponseEntity<>(admin, HttpStatus.FOUND) : 
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }
}




/*
public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {

        Person person1 = personService.saveOrUpdatePerson(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREA
 */
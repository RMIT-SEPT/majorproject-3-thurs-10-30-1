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
import schedule.microservice.AdminMicro;
import schedule.model.Admin;
import schedule.model.User;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminMicro adminMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewAdmin(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        Admin admin = adminMicro.saveOrUpdate(new Admin(user.getUserId(), user));
        return new ResponseEntity<>(admin, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable long id)
    {
        return adminMicro.adminExistsById(id) ? new ResponseEntity<>(adminMicro.getAdminById(id).get(0), HttpStatus.FOUND) : 
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }
}




/*
public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {

        Person person1 = personService.saveOrUpdatePerson(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREA
 */
package schedule.web;


import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;
import schedule.microservice.*;
import schedule.model.*;
import java.util.*;
import javax.validation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserMicro userMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        User user1 = userMicro.saveOrUpdate(user);
        return new ResponseEntity<>(user1, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable long id)
    {
        User user = userMicro.getUserById(id);
        return user != null ? new ResponseEntity<>(user, HttpStatus.OK) :
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<?> validateUser(@RequestBody Map<String, String> json)
    {
        User user = null;
        if (json.containsKey("identifier")) user = userMicro.getUserByEmail(json.get("identifier"));
        else return new ResponseEntity<>("username or email not provided", HttpStatus.BAD_REQUEST);
        if (json.containsKey("password"))
            return user != null && user.getPassword().equals(json.get("password")) ? new ResponseEntity<>(user, HttpStatus.ACCEPTED) :
                new ResponseEntity<>("Error: Email or Password incorrect", HttpStatus.BAD_REQUEST);
        else return new ResponseEntity<>("Password not provided", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserUpdateRequest userRequest, @PathVariable long id, BindingResult result)
    {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        User user = userMicro.getUserById(id);
        if (user != null)
        {
            if (userRequest.passwordIsEmpty()) userRequest.setPassword(user.getPassword());
            userRequest.setAccountType(user.getAccountType());
            return new ResponseEntity<>(userMicro.saveOrUpdate(userRequest.createUser()), HttpStatus.OK);
        }
        else return new ResponseEntity<>("User being updated does not exist", HttpStatus.BAD_REQUEST);
    }
}




/*
public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {

        Person person1 = personService.saveOrUpdatePerson(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREA
 */
package schedule.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import schedule.microservice.UserMicro;
import schedule.model.User;

import java.util.Map;

import javax.validation.Valid;

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
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable long id)
    {
        User user = userMicro.getUserById(id);
        return user != null ? new ResponseEntity<>(user, HttpStatus.FOUND) :
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<?> validateUser(@RequestBody Map<String, String> json)
    {
        User user = null;
        if (json.containsKey("identifier")) user = userMicro.getUserByUsernameOrEmail(json.get("identifier"));
        else return new ResponseEntity<>("username or email not provided", HttpStatus.BAD_REQUEST);
        if (json.containsKey("password"))
            return user != null && user.getPassword().equals(json.get("password")) ? new ResponseEntity<>(true, HttpStatus.ACCEPTED) :
                new ResponseEntity<>(false, HttpStatus.OK);
        else return new ResponseEntity<>("Password not provided", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user, @PathVariable long id, BindingResult result)
    {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        if (userMicro.userExistsById(id))
        {
            user.setUserId(id);
            return new ResponseEntity<>(userMicro.saveOrUpdate(user), HttpStatus.OK);
        }
        else return new ResponseEntity<>("User being updated does not exist", HttpStatus.BAD_REQUEST);
    }
}




/*
public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {

        Person person1 = personService.saveOrUpdatePerson(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREA
 */
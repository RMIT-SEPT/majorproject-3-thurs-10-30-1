package schedule.web;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;
import schedule.microservice.*;
import schedule.model.*;
import javax.validation.*;

@RestController
@RequestMapping("/api/worker")
@CrossOrigin
public class WorkerController {

    @Autowired
    private WorkerMicro workerMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewWorker(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        user.setAccountType(AccountType.Worker);
        Worker worker = workerMicro.saveOrUpdate(new Worker(user.getUserId(), user));
        return new ResponseEntity<>(worker, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getWorkerById(@PathVariable long id)
    {
        Worker worker = workerMicro.getWorkerById(id);
        return worker != null ? new ResponseEntity<>(worker, HttpStatus.FOUND) : 
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }
}




/*
public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {

        Person person1 = personService.saveOrUpdatePerson(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREA
 */
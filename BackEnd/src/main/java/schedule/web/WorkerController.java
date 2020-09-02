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
import schedule.microservice.WorkerMicro;
import schedule.model.Worker;
import schedule.model.AccountType;
import schedule.model.User;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/worker")
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
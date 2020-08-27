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

import javax.validation.Valid;

@RestController
@RequestMapping("/api/worker")
public class WorkerController {

    @Autowired
    private WorkerMicro workerMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewWorker(@Valid @RequestBody Worker worker, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        Worker user1 = workerMicro.saveOrUpdate(worker);
        return new ResponseEntity<>(worker, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getWorkerById(@PathVariable long id)
    {
        return workerMicro.workerExistsById(id) ? new ResponseEntity<>(workerMicro.getWorkerById(id).get(0), HttpStatus.FOUND) : 
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }
}




/*
public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {

        Person person1 = personService.saveOrUpdatePerson(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREA
 */
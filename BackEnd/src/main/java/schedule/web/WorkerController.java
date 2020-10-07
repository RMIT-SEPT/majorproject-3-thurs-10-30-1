package schedule.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import schedule.microservice.BusinessMicro;
import schedule.microservice.ServiceMicro;
import schedule.microservice.WorkerMicro;
import schedule.model.Worker;
import schedule.model.service.ScheduleService;
import schedule.model.AccountType;
import schedule.model.Business;
import schedule.model.User;

import java.util.Map;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/worker")
@CrossOrigin
public class WorkerController {

    @Autowired
    private WorkerMicro workerMicro;
    @Autowired
    private BusinessMicro businessMicro;
    @Autowired
    private ServiceMicro serviceMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewWorker(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        user.setAccountType(AccountType.Worker);
        Worker worker = workerMicro.saveOrUpdate(new Worker(user.getUserId(), user));
        return new ResponseEntity<>(worker, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getWorkerById(@PathVariable long id)
    {
        Worker worker = workerMicro.getWorkerById(id);
        return worker != null ? new ResponseEntity<>(worker, HttpStatus.FOUND) : 
            new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{id}/business/add/{businessId}")
    public ResponseEntity<?> addBusiness(@PathVariable long id, @PathVariable long businessId)
    {
        Worker worker = workerMicro.getWorkerById(id);
        if (worker == null) return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        else
        {
            Business business = businessMicro.getBusinessById(businessId);
            if (business == null) return new ResponseEntity<>("Business not found", HttpStatus.BAD_REQUEST);
            else
            {
                business.addWorker(worker);
                businessMicro.saveOrUpdate(business);
                return new ResponseEntity<>(worker, HttpStatus.ACCEPTED);
            }
        }
    }

    @PostMapping("/{id}/service/add/{serviceId}")
    public ResponseEntity<?> addService(@PathVariable long id, @PathVariable long serviceId)
    {
        Worker worker = workerMicro.getWorkerById(id);
        if (worker == null) return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        else
        {
            ScheduleService service = serviceMicro.getServiceById(serviceId);
            if (service == null) return new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
            else
            {
                worker.addService(service);
                return new ResponseEntity<>(workerMicro.saveOrUpdate(worker), HttpStatus.ACCEPTED);
            }
        }
    }
}




/*
public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {

        Person person1 = personService.saveOrUpdatePerson(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREA
 */
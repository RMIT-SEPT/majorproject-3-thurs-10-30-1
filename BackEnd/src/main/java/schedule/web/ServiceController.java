package schedule.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import schedule.microservice.ServiceMicro;
import schedule.model.service.ScheduleService;

@RestController
@RequestMapping("/api/admin")
public class ServiceController {
    
    @Autowired
    private ServiceMicro serviceMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewService(@Valid @RequestBody ScheduleService service, BindingResult result)
    {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Invalud Schedule Object", HttpStatus.BAD_REQUEST);
        }        
        serviceMicro.saveOrUpdate( service);
        return new ResponseEntity<>(service,HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> getServiceById(@PathVariable long id)
    {
        ScheduleService service = serviceMicro.getServiceById(id);
        return service != null ? new ResponseEntity<>(service, HttpStatus.FOUND) :
            new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
    }
}

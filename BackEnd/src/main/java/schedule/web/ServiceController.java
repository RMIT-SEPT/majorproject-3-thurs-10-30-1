package schedule.web;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import schedule.microservice.ServiceMicro;
import schedule.model.service.ScheduleService;
import schedule.model.service.TimeAvailability;

@RestController
@RequestMapping("/api/service")
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

    @GetMapping("/{id}")
    public ResponseEntity<?> getServiceById(@PathVariable long id)
    {
        ScheduleService service = serviceMicro.getServiceById(id);
        return service != null ? new ResponseEntity<>(service, HttpStatus.FOUND) :
            new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/{id}/availability")
    public ResponseEntity<?> createNewAvailability(@Valid @RequestBody TimeAvailability availability, BindingResult result, @PathVariable long id)
    {
        if (result.hasErrors())
        {
            String err = "";
            for (ObjectError error : result.getAllErrors())
            {
                err += error.getDefaultMessage();
            }
            return new ResponseEntity<>("Invalid Availability Object\n" + err, HttpStatus.BAD_REQUEST);
        }

        ScheduleService service = serviceMicro.getServiceById(id);
        if (service == null)
        {
            return new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
        }
        else
        {
            service.getAvailablities().add(availability);
            serviceMicro.saveOrUpdate(service);
            return new ResponseEntity<>(availability,HttpStatus.CREATED);
        }
    }

    @GetMapping("/{id}/availabilities")
    public ResponseEntity<?> getAvailabilities(@PathVariable long id)
    {
        List<TimeAvailability> availabilities = serviceMicro.getAllAvailabilities(id);
        return availabilities != null ? new ResponseEntity<>(availabilities, HttpStatus.FOUND) :
            new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
    }
}

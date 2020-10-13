package schedule.web;

import javax.validation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.*;
import schedule.microservice.*;
import schedule.model.*;


@RestController
@RequestMapping("/api/business")
@CrossOrigin
public class BusinessController {

    @Autowired
    private BusinessMicro businessMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewBusiness(@Valid @RequestBody Business business, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Invalid Business Object", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(businessMicro.saveOrUpdate(business), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBusinessById(@PathVariable long id) {
        Business business = businessMicro.getBusinessById(id);
        return business != null ? new ResponseEntity<>(business, HttpStatus.FOUND) :
            new ResponseEntity<>("Business not found", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllBusinesses() {
       return new ResponseEntity<>(businessMicro.getAllBusinesses(), HttpStatus.FOUND);
    }

    @GetMapping(value = "/{id}/services")
    public ResponseEntity<?> getBusinessServices(@PathVariable long id)
    {
        Business business = businessMicro.getBusinessById(id);
        return business != null ? new ResponseEntity<>(business.getServices(), HttpStatus.FOUND) :
            new ResponseEntity<>("Business not found", HttpStatus.BAD_REQUEST);
    }
}

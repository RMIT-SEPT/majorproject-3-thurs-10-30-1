package schedule.web;

import java.util.*;
import javax.validation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.*;
import schedule.microservice.*;
import schedule.model.*;
import schedule.model.service.*;


@RestController
@RequestMapping("/api/business")
@CrossOrigin(origins = "http://localhost:3000")
public class BusinessController {

    @Autowired
    private BusinessMicro businessMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewBusiness(@Valid @RequestBody Business business, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Invalid Business Object", HttpStatus.BAD_REQUEST);
        }
        Business newBusiness = businessMicro.saveOrUpdate(business);
        return new ResponseEntity<>(business, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public Business getBusinessById(@PathVariable long id) {
        return businessMicro.businessExistsById(id) ? businessMicro.getBusinessById(id) : null;
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getBusinessById() {
        StringBuilder builder = new StringBuilder();
        int j = 0;
        builder.append("[");
        for (Business business : businessMicro.getAllBusinesses()) {
            j++;
            business.toJson(builder); 
            if (j < businessMicro.getAllBusinesses().size())
            {
                builder.append(",\n");
            }
        }
        builder.append("]");

        return builder.toString();
    }   

    @GetMapping(value = "/{id}/services")
    public List<ScheduleService> getBusinessServices(@PathVariable long id)
    {
        Business business = businessMicro.getBusinessById(id);
        return business != null ? business.getServices() : null;
    }
}
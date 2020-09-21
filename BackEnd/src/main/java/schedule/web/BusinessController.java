package schedule.web;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import schedule.microservice.BusinessMicro;
import schedule.model.Business;
import schedule.model.service.ScheduleService;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/business")
public class BusinessController {

    @Autowired
    private BusinessMicro businessMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewBusiness(@Valid @RequestBody Business business, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid Business Object", HttpStatus.BAD_REQUEST);
        }
        Business newBusiness = businessMicro.saveOrUpdate(business);
        return new ResponseEntity<>(business, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public Business getBusinessById(@PathVariable long id)
    {
        return businessMicro.businessExistsById(id) ? businessMicro.getBusinessById(id) : new Business();
    }

     @GetMapping("/all")
    public List<Business> getBusinessById()
    {
        return businessMicro.getAllBusinesses();
    }

    @GetMapping("/{id}/services")
    public List<ScheduleService> getBusinessServices(@PathVariable long id)
    {
        Business business = businessMicro.getBusinessById(id);
        return business != null ? business.getServices() : null;
    }
    
}
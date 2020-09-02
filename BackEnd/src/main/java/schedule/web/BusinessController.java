package schedule.web;

import javax.validation.Valid;

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

import schedule.microservice.BusinessMicro;
import schedule.model.Business;

@RestController
@RequestMapping("/api/business")
public class BusinessController {

    @Autowired
    private BusinessMicro businessMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewBusiness(@Valid @RequestBody Business business, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid Booking Object", HttpStatus.BAD_REQUEST);
        }
        Business newBusiness = businessMicro.saveOrUpdate(business);
        return new ResponseEntity<>(newBusiness, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public Business getBusinessById(@PathVariable long id)
    {
        return businessMicro.businessExistsById(id) ? businessMicro.getBusinessById(id).get(0) : null;
    }
    
}
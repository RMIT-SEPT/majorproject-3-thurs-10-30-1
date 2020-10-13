package schedule.web;

import java.util.*;
import javax.validation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;
import schedule.microservice.*;
import schedule.model.*;

@RestController
@RequestMapping("/api/service")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServiceMicro serviceMicro;
    @Autowired
    private BookingMicro bookingMicro;
    @Autowired
    private WorkerMicro workerMicro;
    @Autowired
    private CustomerMicro customerMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewService(@Valid @RequestBody ScheduleService service, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Invalud Schedule Object", HttpStatus.BAD_REQUEST);
        }
        serviceMicro.saveOrUpdate(service);
        return new ResponseEntity<>(service, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getServiceById(@PathVariable long id) {
        ScheduleService service = serviceMicro.getServiceById(id);
        return service != null ? new ResponseEntity<>(service, HttpStatus.FOUND)
                : new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{id}/availability")
    public ResponseEntity<?> createNewAvailability(@Valid @RequestBody TimeAvailability availability,
            BindingResult result, @PathVariable long id) {
        if (result.hasErrors()) {
            String err = "";
            for (ObjectError error : result.getAllErrors()) {
                err += error.getDefaultMessage();
            }
            return new ResponseEntity<>("Invalid Availability Object\n" + err, HttpStatus.BAD_REQUEST);
        }

        ScheduleService service = serviceMicro.getServiceById(id);
        if (service == null) {
            return new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
        } else {
            service.getAvailablities().add(availability);
            serviceMicro.saveOrUpdate(service);
            return new ResponseEntity<>(availability, HttpStatus.CREATED);
        }
    }

    @PostMapping("/{id}/book")
    public ResponseEntity<?> tryCreateBooking(@Valid @RequestBody BookingRequest booking, BindingResult result, @PathVariable long id)
    {
        if (result.hasErrors())
        {
            StringBuilder sb = new StringBuilder();
            sb.append("Invalid booking request body\n");
            for (ObjectError err : result.getAllErrors())
            {
                sb.append(err.getDefaultMessage() + '\n');
            }
            return new ResponseEntity<>(sb.toString(), HttpStatus.BAD_REQUEST);
        }

        ScheduleService service = serviceMicro.getServiceById(id);
        if (service == null)
        {
            return new ResponseEntity<>("No service for the given id\n", HttpStatus.BAD_REQUEST);
        }
        TimeAvailability foundAvailability = null;
        for (TimeAvailability availability : service.getAvailablities())
        {
            if (availability.getId().equals(booking.getId()))
            {
                foundAvailability = availability;
                break;
            }
        }

        if (foundAvailability == null)
        {
            return new ResponseEntity<>("No availability for the given id\n", HttpStatus.BAD_REQUEST);
        }
        
        if (!foundAvailability.isAvailable(booking.getDate()))
        {
            Calendar c = Calendar.getInstance();
            c.setTime(booking.getDate());
            String formatted = "Bad availability time\n";
            formatted += c.get(Calendar.DAY_OF_WEEK);
            formatted += ":";
            formatted += c.get(Calendar.HOUR_OF_DAY);
            formatted += ":";
            formatted += c.get(Calendar.MINUTE);
            return new ResponseEntity<>(formatted, HttpStatus.BAD_REQUEST);
        }
        for (Booking b : bookingMicro.getAllBookings())
        {
            if (b.getStart_time().equals(booking.getDate()))
            {
                return new ResponseEntity<>("Booking taken", HttpStatus.BAD_REQUEST);
            }
        }
        
        //insert booking
        Booking newBooking = new Booking((long)0,
                                        customerMicro.getCustomerById(booking.getCustomerId()),
                                        workerMicro.getWorkerById(foundAvailability.getWorkedId()),
                                        service,
                                        booking.getDate(),
                                        "booked",
                                        foundAvailability);

        bookingMicro.saveOrUpdate(newBooking);        

        return new ResponseEntity<>("Booking made!", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/availabilities")
    public ResponseEntity<?> getAvailabilities(@PathVariable long id) {
        List<TimeAvailability> availabilities = serviceMicro.getAllAvailabilities(id);
        return availabilities != null ? new ResponseEntity<>(availabilities, HttpStatus.FOUND)
                : new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
    }
}

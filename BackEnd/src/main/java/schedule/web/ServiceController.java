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
@CrossOrigin
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
        return service != null ? new ResponseEntity<>(service, HttpStatus.OK)
                : new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{id}/addAvailability")
    public ResponseEntity<?> createNewAvailability(@Valid @RequestBody TimeAvailabilityRequest availability,
            BindingResult result, @PathVariable long id) {
        System.out.println(availability.getHour());
        if (result.hasErrors()) {
            String err = "";
            for (FieldError error : result.getFieldErrors()) {
                err += error.getObjectName() + " " + error.getDefaultMessage() + "\n";
            }
            return new ResponseEntity<>("Invalid Availability Object\n" + err, HttpStatus.BAD_REQUEST);
        }

        ScheduleService service = serviceMicro.getServiceById(id);
        if (service == null) {
            return new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
        } else {
            Worker worker = workerMicro.getWorkerById(availability.getWorkerId());
            if (worker == null)
                return new ResponseEntity<>("Worker not found", HttpStatus.BAD_REQUEST);

            TimeAvailability newAvailability = new TimeAvailability(availability.getDay(),availability.getHour(),availability.getMinute(),availability.getLength(), worker);

            service.getAvailablities().add(newAvailability);
            serviceMicro.saveOrUpdate(service);
            return new ResponseEntity<>(availability,HttpStatus.OK);
        }
    }

    @PostMapping("/{id}/book")
    public ResponseEntity<?> tryCreateBooking(@Valid @RequestBody BookingRequest booking, BindingResult result,
            @PathVariable long id) {
        Customer customer = customerMicro.getCustomerById(booking.getCustomerId());
        if (customer == null)
            return new ResponseEntity<>("Bad customer id", HttpStatus.BAD_REQUEST);

        if (result.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            sb.append("Invalid booking request body\n");
            for (ObjectError err : result.getAllErrors()) {
                sb.append(err.getDefaultMessage() + '\n');
            }
            return new ResponseEntity<>(sb.toString(), HttpStatus.BAD_REQUEST);
        }

        ScheduleService service = serviceMicro.getServiceById(id);
        if (service == null) {
            return new ResponseEntity<>("No service for the given id\n", HttpStatus.BAD_REQUEST);
        }
        TimeAvailability foundAvailability = null;
        for (TimeAvailability availability : service.getAvailablities()) {
            if (availability.getId().equals(booking.getAvailabilityId())) {
                foundAvailability = availability;
                break;
            }
        }

        if (foundAvailability == null) {
            return new ResponseEntity<>("No availability for the given id\n", HttpStatus.BAD_REQUEST);
        }

        for (Booking b : bookingMicro.getAllBookings()) {
            if (b.getDate().equals(booking.getDate())) {
                return new ResponseEntity<>("Booking taken", HttpStatus.BAD_REQUEST);
            }
        }

        Worker worker = foundAvailability.getWorker();
        Booking newBooking = new Booking((long) 0, customer, worker, service, booking.getDate(), "booked",
                foundAvailability);
        newBooking = bookingMicro.saveOrUpdate(newBooking);

        return new ResponseEntity<>(newBooking.getId(), HttpStatus.OK);
    }

    @GetMapping("/{id}/availabilities")
    public ResponseEntity<?> getAvailabilities(@PathVariable long id) {
        List<TimeAvailability> availabilities = serviceMicro.getAllAvailabilities(id);
        return availabilities != null ? new ResponseEntity<>(availabilities, HttpStatus.OK)
                : new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}/workers")
    public ResponseEntity<?> getServiceWorkers(@PathVariable long id) {
        ScheduleService service = serviceMicro.getServiceById(id);
        return service != null ? new ResponseEntity<>(service.getWorkers(), HttpStatus.OK)
                : new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
    }
}

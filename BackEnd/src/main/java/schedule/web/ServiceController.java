package schedule.web;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import schedule.microservice.BookingMicro;
import schedule.microservice.ServiceMicro;
import schedule.model.Booking;
import schedule.model.service.BookingRequest;
import schedule.model.service.ScheduleService;
import schedule.model.service.TimeAvailability;

@RestController
@RequestMapping("/api/service")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {
    
    @Autowired
    private ServiceMicro serviceMicro;
    @Autowired
    private BookingMicro bookingMicro;

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
        
        return new ResponseEntity<>("Booking made!", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/availabilities")
    public ResponseEntity<?> getAvailabilities(@PathVariable long id)
    {
        List<TimeAvailability> availabilities = serviceMicro.getAllAvailabilities(id);
        return availabilities != null ? new ResponseEntity<>(availabilities, HttpStatus.FOUND) :
            new ResponseEntity<>("Service not found", HttpStatus.BAD_REQUEST);
    }
}

package schedule.web;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import schedule.microservice.*;
import schedule.model.*;
import javax.validation.*;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin
public class BookingController
{
    @Autowired
    private BookingMicro bookingMicro;

    @PostMapping("")
    public ResponseEntity<?> createNewBooking(@Valid @RequestBody Booking booking, BindingResult result) {
        if (result.hasErrors()){
            return new ResponseEntity<>("Invalid Booking Object", HttpStatus.BAD_REQUEST);
        }
        Booking booking1 = bookingMicro.saveOrUpdate(booking);
        return new ResponseEntity<>(booking1, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable long id)
    {
        return bookingMicro.bookingExistsById(id) ? new ResponseEntity<>(bookingMicro.getBookingById(id).get(0), HttpStatus.OK)  : 
            new ResponseEntity<>("Booking not found", HttpStatus.NOT_FOUND);
    }
}

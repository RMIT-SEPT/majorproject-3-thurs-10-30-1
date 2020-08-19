package schedule.web;

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
import schedule.microservice.BookingMicro;
import schedule.model.Booking;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/booking")
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
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable long id)
    {
        return bookingMicro.bookingExistsById(id) ? bookingMicro.getBookingById(id).get(0) : null;
    }
}




/*
public ResponseEntity<Person> createNewPerson(@RequestBody Person person) {

        Person person1 = personService.saveOrUpdatePerson(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREA
 */
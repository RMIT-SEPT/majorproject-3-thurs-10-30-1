package schedule.microservice;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import schedule.model.*;
import schedule.repositories.*;
import java.util.*;


@Service
public class BookingMicro {
    @Autowired
    private BookingRepo bookingRepo;


    public Booking saveOrUpdate(Booking booking)
    {
        return bookingRepo.save(booking);
    }

    public ArrayList<Booking> getBookingById(long id)
    {
        ArrayList<Long> ids = new ArrayList<>();
        ids.add(id);
        return bookingRepo.findAllById(ids);
    }

    public boolean bookingExistsById(long id)
    {
        return bookingRepo.existsById(id);
    }

    public Iterable<Booking> getAllBookings()
    {
        return bookingRepo.findAll();
    }
}

package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.Booking;
import schedule.repositories.BookingRepo;

import java.util.ArrayList;


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
}

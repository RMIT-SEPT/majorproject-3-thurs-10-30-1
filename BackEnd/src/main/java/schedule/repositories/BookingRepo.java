package schedule.repositories;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;
import schedule.model.*;
import java.util.*;

@Repository
public interface BookingRepo extends CrudRepository<Booking, Long >
{
    @Override
    ArrayList<Booking> findAllById(Iterable<Long> iterable);
}

package schedule.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.CrudRepositoryExtensionsKt;
import org.springframework.stereotype.Repository;
import schedule.model.Booking;

import java.util.ArrayList;

@Repository
public interface BookingRepo extends CrudRepository<Booking, Long >
{
    @Override
    ArrayList<Booking> findAllById(Iterable<Long> iterable);
}

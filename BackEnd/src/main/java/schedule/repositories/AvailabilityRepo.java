package schedule.repositories;

import org.springframework.data.repository.CrudRepository;
import schedule.model.service.*;


public interface AvailabilityRepo extends CrudRepository<TimeAvailability, Long> {
    
}

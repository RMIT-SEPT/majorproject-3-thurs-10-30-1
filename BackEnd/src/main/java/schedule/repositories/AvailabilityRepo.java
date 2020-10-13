package schedule.repositories;

import org.springframework.data.repository.*;
import schedule.model.service.*;


public interface AvailabilityRepo extends CrudRepository<TimeAvailability, Long> {
    
}

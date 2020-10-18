package schedule.repositories;

import org.springframework.data.repository.*;
import schedule.model.*;


public interface AvailabilityRepo extends CrudRepository<TimeAvailability, Long> {
    
}

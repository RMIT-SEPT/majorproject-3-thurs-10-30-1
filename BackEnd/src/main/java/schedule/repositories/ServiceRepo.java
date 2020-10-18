package schedule.repositories;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;
import schedule.model.*;
import java.util.*;

@Repository
public interface ServiceRepo extends CrudRepository<ScheduleService, Long>
{
    @Override
    ArrayList<ScheduleService> findAllById(Iterable<Long> iterable);
}
package schedule.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import schedule.model.service.*;

import java.util.ArrayList;

@Repository
public interface ServiceRepo extends CrudRepository<ScheduleService, Long>
{
    @Override
    ArrayList<ScheduleService> findAllById(Iterable<Long> iterable);
}
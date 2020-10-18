package schedule.repositories;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;
import schedule.model.*;
import java.util.*; 

@Repository
public interface WorkerRepo extends CrudRepository<Worker, Long >
{
    @Override
    ArrayList<Worker> findAllById(Iterable<Long> iterable);
}

package schedule.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import schedule.model.Worker;

import java.util.ArrayList;

@Repository
public interface WorkerRepo extends CrudRepository<Worker, Long >
{
    @Override
    ArrayList<Worker> findAllById(Iterable<Long> iterable);
}

package schedule.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.CrudRepositoryExtensionsKt;
import org.springframework.stereotype.Repository;
import schedule.model.service.*;

import java.util.ArrayList;

public interface ServiceRepo extends CrudRepository<Service, Long>
{
    @Override
    ArrayList<Service> findAllById(Iterable<Long> iterable);
}
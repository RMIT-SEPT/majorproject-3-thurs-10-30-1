package schedule.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.CrudRepositoryExtensionsKt;
import org.springframework.stereotype.Repository;
import schedule.model.Admin;

import java.util.ArrayList;

@Repository
public interface AdminRepo extends CrudRepository<Admin, Long >
{
    @Override
    ArrayList<Admin> findAllById(Iterable<Long> iterable);
}

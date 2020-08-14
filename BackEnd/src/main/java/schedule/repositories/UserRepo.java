package schedule.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.CrudRepositoryExtensionsKt;
import org.springframework.stereotype.Repository;
import schedule.model.User;

import java.util.ArrayList;

@Repository
public interface UserRepo extends CrudRepository<User, Long >
{
    @Override
    ArrayList<User> findAllById(Iterable<Long> iterable);
}

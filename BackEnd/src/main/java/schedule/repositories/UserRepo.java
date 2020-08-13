package schedule.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.CrudRepositoryExtensionsKt;
import org.springframework.stereotype.Repository;
import schedule.model.User;

@Repository
public interface UserRepo extends CrudRepository<User, Long >
{
    @Override
    Iterable<User> findAllById(Iterable<Long> iterable);
}

package schedule.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import schedule.model.User;

import java.util.ArrayList;

@Repository
public interface UserRepo extends CrudRepository<User, Long >
{
    @Override
    ArrayList<User> findAllById(Iterable<Long> iterable);

    User findByUsername(String username);

    User findByEmail(String email);

    @Query(value = "SELECT * FROM User WHERE username = ?1 OR email = ?1", nativeQuery = true)
    User findByUsernameOrEmail(String identifier);
}

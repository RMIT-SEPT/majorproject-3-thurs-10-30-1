package schedule.repositories;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;
import schedule.model.*;
import java.util.*;

@Repository
public interface CustomerRepo extends CrudRepository<Customer, Long >
{
    @Override
    ArrayList<Customer> findAllById(Iterable<Long> iterable);
}

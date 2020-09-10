package schedule.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import schedule.model.Customer;

import java.util.ArrayList;

@Repository
public interface CustomerRepo extends CrudRepository<Customer, Long >
{
    @Override
    ArrayList<Customer> findAllById(Iterable<Long> iterable);
}

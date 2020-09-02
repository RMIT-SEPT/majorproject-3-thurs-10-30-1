package schedule.repositories;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;

import schedule.model.Business;

public interface BusinessRepo extends CrudRepository<Business, Long>{

    @Override
    ArrayList<Business> findAllById(Iterable<Long> iterable);

}
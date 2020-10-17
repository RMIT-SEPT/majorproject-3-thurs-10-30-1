package schedule.repositories;

import java.util.*;
import org.springframework.data.repository.*;
import schedule.model.*;

public interface BusinessRepo extends CrudRepository<Business, Long>{

    @Override
    ArrayList<Business> findAllById(Iterable<Long> iterable);

}
package schedule.repositories;

import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;
import schedule.model.*;
import java.util.*;

@Repository
public interface AdminRepo extends CrudRepository<Admin, Long >
{
    @Override
    ArrayList<Admin> findAllById(Iterable<Long> iterable);
}

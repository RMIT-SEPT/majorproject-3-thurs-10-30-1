package schedule.microservice;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import schedule.model.*;
import schedule.repositories.*;
import java.util.*;

@Service
public class ScheduleServiceMicro {
    @Autowired
    private ServiceRepo serviceRepo;


    public ScheduleService saveOrUpdate(ScheduleService service)
    {
        return serviceRepo.save(service);
    }

    public ArrayList<ScheduleService> getUserById(long id)
    {
        ArrayList<Long> ids = new ArrayList<>();
        ids.add(id);
        return serviceRepo.findAllById(ids);
    }

    public boolean serviceExistsById(long id)
    {
        return serviceRepo.existsById(id);
    }

}

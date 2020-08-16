package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.service.ScheduleService;
import schedule.repositories.ServiceRepo;

import java.security.PublicKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

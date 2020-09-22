package schedule.microservice;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import schedule.model.service.ScheduleService;
import schedule.model.service.TimeAvailability;
import schedule.repositories.ServiceRepo;

@Service
public class ServiceMicro {

    @Autowired
    ServiceRepo serviceRepo;

    public ScheduleService saveOrUpdate(ScheduleService schedule)
    {
        return serviceRepo.save(schedule);
    }

    public ScheduleService getServiceById(long id)
    {
        return serviceRepo.findById(id).orElse(null);
    }

    public ArrayList<ScheduleService> getAllServices()
    {
        ArrayList<ScheduleService> services = new ArrayList<ScheduleService>();
        for (ScheduleService service : serviceRepo.findAll())
        {
            services.add(service);
        }
        return services;
    }

    public boolean serviceExistsById(long id)
    {
        return serviceRepo.existsById(id);
    }

    public List<TimeAvailability> getAllAvailabilities(long id)
    {
        ScheduleService service = getServiceById(id);
        if (service == null)
        {
            return null;
        }
        else
        {
            return service.getAvailablities();
        }
    }
}

package schedule.microservice;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import schedule.model.Business;
import schedule.repositories.BusinessRepo;

@Service
public class BusinessMicro {
    
    @Autowired
    private BusinessRepo businessRepo;

    public Business saveOrUpdate(Business business)
    {
        return businessRepo.save(business);
    }

    public ArrayList<Business> getBusinessById(long id)
    {
        ArrayList<Long> ids = new ArrayList<>();
        ids.add(id);
        return businessRepo.findAllById(ids);
    }

    public boolean businessExistsById(long id)
    {
        return businessRepo.existsById(id);
    }

}
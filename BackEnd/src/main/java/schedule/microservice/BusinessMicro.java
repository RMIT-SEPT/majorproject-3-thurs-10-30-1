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

    public Business getBusinessById(long id)
    {
        return businessRepo.findById(id).orElse(null);
    }

    public ArrayList<Business> getAllBusinesses()
    {
        ArrayList<Business> businesses = new ArrayList<Business>();
        for (Business business : businessRepo.findAll())
        {
            businesses.add(business);
        }
        return businesses;
    }

    public boolean businessExistsById(long id)
    {
        return businessRepo.existsById(id);
    }

}
package schedule.microservice;

import java.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import schedule.model.*;
import schedule.repositories.*;

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
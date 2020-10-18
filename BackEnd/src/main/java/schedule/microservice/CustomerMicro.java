package schedule.microservice;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import schedule.model.*;
import schedule.repositories.*;

@Service
public class CustomerMicro {
    @Autowired
    private CustomerRepo customerRepo;


    public Customer saveOrUpdate(Customer customer)
    {
        return customerRepo.save(customer);
    }

    public Customer getCustomerById(long id)
    {
        return customerRepo.findById(id).orElse(null);
    }

    public boolean customerExistsById(long id)
    {
        return customerRepo.existsById(id);
    }
}

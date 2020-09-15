package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.Customer;
import schedule.repositories.CustomerRepo;

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

package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.Customer;
import schedule.repositories.CustomerRepo;

import java.util.ArrayList;

@Service
public class CustomerMicro {
    @Autowired
    private CustomerRepo customerRepo;


    public Customer saveOrUpdate(Customer customer)
    {
        return customerRepo.save(customer);
    }

    public ArrayList<Customer> getCustomerById(long id)
    {
        ArrayList<Long> ids = new ArrayList<>();
        ids.add(id);
        return customerRepo.findAllById(ids);
    }

    public boolean customerExistsById(long id)
    {
        return customerRepo.existsById(id);
    }
}

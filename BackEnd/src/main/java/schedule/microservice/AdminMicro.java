package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.Admin;
import schedule.repositories.AdminRepo;

@Service
public class AdminMicro {
    @Autowired
    private AdminRepo adminRepo;


    public Admin saveOrUpdate(Admin admin)
    {
        return adminRepo.save(admin);
    }

    public Admin getAdminById(long id)
    {
        return adminRepo.findById(id).orElse(null);
    }

    public boolean adminExistsById(long id)
    {
        return adminRepo.existsById(id);
    }
}

package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.Admin;
import schedule.repositories.AdminRepo;

import java.security.PublicKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminMicro {
    @Autowired
    private AdminRepo adminRepo;


    public Admin saveOrUpdate(Admin admin)
    {
        return adminRepo.save(admin);
    }

    public ArrayList<Admin> getAdminById(long id)
    {
        ArrayList<Long> ids = new ArrayList<>();
        ids.add(id);
        return adminRepo.findAllById(ids);
    }

    public boolean adminExistsById(long id)
    {
        return adminRepo.existsById(id);
    }
}

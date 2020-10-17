package schedule.microservice;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import schedule.model.*;
import schedule.repositories.*;

@Service
public class UserMicro {
    @Autowired
    private UserRepo userRepo;


    public User saveOrUpdate(User user)
    {
        return userRepo.save(user);
    }

    public User getUserById(long id)
    {
        return userRepo.findById(id).orElse(null);
    }

    public boolean userExistsById(long id)
    {
        return userRepo.existsById(id);
    }

    public User getUserByUsername(String username)
    {
        return userRepo.findByUsername(username);
    }

    public User getUserByEmail(String email)
    {
        return userRepo.findByEmail(email);
    }

    public User getUserByUsernameOrEmail(String identifier)
    {
        return userRepo.findByUsernameOrEmail(identifier);
    }
}

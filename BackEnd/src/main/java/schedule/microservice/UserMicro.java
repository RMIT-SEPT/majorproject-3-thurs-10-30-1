package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.User;
import schedule.repositories.UserRepo;

import java.util.ArrayList;

@Service
public class UserMicro {
    @Autowired
    private UserRepo userRepo;


    public User saveOrUpdate(User user)
    {
        return userRepo.save(user);
    }

    public ArrayList<User> getUserById(long id)
    {
        ArrayList<Long> ids = new ArrayList<>();
        ids.add(id);
        return userRepo.findAllById(ids);
    }

    public boolean userExistsById(long id)
    {
        return userRepo.existsById(id);
    }

    public User getUserByUsername(String username)
    {
        return userRepo.findByUsername(username);
    }
}

package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.User;
import schedule.repositories.UserRepo;

import java.security.PublicKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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





}

package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.User;
import schedule.repositories.UserRepo;

@Service
public class UserMicro {
    @Autowired
    private UserRepo userRepo;

    public User saveOrUpdate(User user)
    {
        return userRepo.save(user);
    }



}

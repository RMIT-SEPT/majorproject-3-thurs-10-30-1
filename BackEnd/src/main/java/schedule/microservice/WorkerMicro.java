package schedule.microservice;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import schedule.model.*;
import schedule.repositories.*;

@Service
public class WorkerMicro {
    @Autowired
    private WorkerRepo workerRepo;


    public Worker saveOrUpdate(Worker worker)
    {
        return workerRepo.save(worker);
    }

    public Worker getWorkerById(long id)
    {
        return workerRepo.findById(id).orElse(null);
    }

    public ArrayList<Worker> getAllWorkers()
    {
        ArrayList<Worker> workers = new ArrayList<Worker>();
        for (Worker worker : workerRepo.findAll())
        {
            workers.add(worker);
        }
        return workers;
    }

    public boolean workerExistsById(long id)
    {
        return workerRepo.existsById(id);
    }
}

package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.Worker;
import schedule.repositories.WorkerRepo;

import java.util.ArrayList;

@Service
public class WorkerMicro {
    @Autowired
    private WorkerRepo workerRepo;


    public Worker saveOrUpdate(Worker worker)
    {
        return workerRepo.save(worker);
    }

    public ArrayList<Worker> getWorkerById(long id)
    {
        ArrayList<Long> ids = new ArrayList<>();
        ids.add(id);
        return workerRepo.findAllById(ids);
    }

    public boolean workerExistsById(long id)
    {
        return workerRepo.existsById(id);
    }
}

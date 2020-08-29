package schedule.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schedule.model.Worker;
import schedule.repositories.WorkerRepo;

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

    public boolean workerExistsById(long id)
    {
        return workerRepo.existsById(id);
    }
}

package schedule.model;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity(name = "business")
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "A name is required")
    @NotNull
    @NotEmpty
    private String name;

    @OneToMany(mappedBy = "", cascade = CascadeType.ALL)
    @JoinColumn(name = "business_id")
    @JsonIgnore
    private List<ScheduleService> services;

    @OneToMany(mappedBy = "business")
    @JsonIgnore
    private List<Admin> admins;

    @ManyToMany
    @JsonIgnore
    private List<Worker> workers;

    public Business() {
    }

    public Business(Long id, String name, List<ScheduleService> services, List<Admin> admin) {
        this.id = id;
        this.name = name;
        this.services = services;
        this.admins = admin;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @JsonIgnore
    public List<ScheduleService> getServices() {
        return services;
    }

    @JsonProperty("services")
    public List<Long> getServiceIds()
    {
        ArrayList<Long> ids = new ArrayList<>(services.size());
        for (ScheduleService service : services)
        {
            ids.add(service.getId());
        }
        return ids;
    }

    @JsonIgnore
    public List<Admin> getAdmins() {
        return admins;
    }

    @JsonProperty("admins")
    public List<Long> getAdmindsIds()
    {
        ArrayList<Long> ids = new ArrayList<>(admins.size());
        for (Admin admin : admins)
        {
            ids.add(admin.getId());
        }
        return ids;
    }

    @JsonIgnore
    public List<Worker> getWorkers() {
        return workers;
    }

    @JsonProperty("workers")
    public List<Long> getWorkersIds()
    {
        ArrayList<Long> ids = new ArrayList<>(workers.size());
        for (Worker worker : workers)
        {
            ids.add(worker.getId());
        }
        return ids;
    }

    public void addWorker(Worker worker)
    {
        workers.add(worker);
    }

    public void addService(ScheduleService scheduleService)
    {
        services.add(scheduleService);
    }
}
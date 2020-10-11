package schedule.model;

import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import schedule.model.service.ScheduleService;
import utitlity.JsonHelper;

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
    private List<ScheduleService> services;

    @OneToMany(mappedBy = "business")
    private List<Admin> admins;

    @ManyToMany
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

    public List<ScheduleService> getServices() {
        return services;
    }

    @JsonIgnoreProperties(value = "business")
    public List<Admin> getAdmins() {
        return admins;
    }

    @JsonIgnoreProperties(value = "businesses")
    public List<Worker> getWorkers() {
        return workers;
    }

    public void toJson(StringBuilder builder) {
        JsonHelper.startScope(builder);
        JsonHelper.addField("id", getId(), builder);
        JsonHelper.addComma(builder);
        JsonHelper.addField("name", getName(), builder);
        JsonHelper.addComma(builder);
        JsonHelper.startArray("services", builder);
        int i = 0;
        for (ScheduleService service : getServices()) {
            i++;
            if (i < getServices().size()) {
                builder.append(service.getId() + ",");
            } else {
                builder.append(service.getId());
            }
        }
        JsonHelper.endArray(builder); //end services array
        JsonHelper.addComma(builder);
        i = 0;
        JsonHelper.startArray("workers", builder);
        for (Worker worker : getWorkers()) {
            i++;
             if (i < getWorkers().size()) {
                builder.append(worker.getId() + ",");
            } else {
                builder.append(worker.getId());
            }
        }
        JsonHelper.endArray(builder); //end workers
        JsonHelper.addComma(builder);
        builder.append("],");
        i = 0;
        builder.append("\"admins\":[");
        for (Admin admin : getAdmins())
        {
            i++;
            if (i < getAdmins().size()) {
                builder.append(admin.getId() + ",");
            }
            else
            {
                builder.append(admin.getId());
            }
        }
        JsonHelper.endArray(builder);
        JsonHelper.endScope(builder);


    public void addWorker(Worker worker)
    {
        workers.add(worker);

    }
}
package schedule.model;

import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import schedule.model.service.ScheduleService;

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

    @OneToMany()
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

    public List<Admin> getAdmins() {
        return admins;
    }

    public List<Worker> getWorkers() {
        return workers;
    }

    public void toJson(StringBuilder builder) {
        builder.append("{");
        builder.append("\"id\":" + getId().toString() + ",");
        builder.append("\"name\":" + '"' + getName() + '"' + ",");
        builder.append("\"services\":[");
        int i = 0;
        for (ScheduleService service : getServices()) {
            i++;
            if (i < getServices().size()) {
                builder.append(service.getId() + ",");
            } else {
                builder.append(service.getId());
            }
        }
        builder.append("]}");

    }
}
package schedule.model;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.*;

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
}
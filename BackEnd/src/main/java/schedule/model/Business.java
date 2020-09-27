package schedule.model;

import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
}
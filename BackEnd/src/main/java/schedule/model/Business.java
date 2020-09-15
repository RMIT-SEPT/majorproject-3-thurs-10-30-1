package schedule.model;

import java.util.List;
import schedule.model.*;
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

    @OneToMany()
    private List<ScheduleService> services;

    @OneToMany()
    private List<Admin> admins;

    public Business()
    {
    }

    public Business(Long id, String name, List<ScheduleService> services, List<Admin> admin)
    {
        this.id = id;
        this.name = name;
        this.services = services;
        this.admins = admin;
    }

    public Long getId()
    {
        return id;
    }

    public String getName()
    {
        return name;
    }

    public List<ScheduleService> getServices()
    {
        return services;
    }

    public List<Admin> getAdmins()
    {
        return admins;
    }
    
}
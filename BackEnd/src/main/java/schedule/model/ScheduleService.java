package schedule.model;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity(name = "schedule_service")
@Table(name = "SERVICES")
public class ScheduleService
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @NotBlank(message = "Service name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @OneToMany(mappedBy = "", cascade = CascadeType.ALL)
    @JoinColumn(name = "service_id") 
    @JsonIgnore
    private List<TimeAvailability> availability;

    @ManyToMany(mappedBy = "services")
    @JsonIgnore
    private List<Worker> workers;

    public ScheduleService() {}

    public ScheduleService(Long serviceId, @NotBlank(message = "Service name is required") String name,
            @NotBlank(message = "Description is required") String description, List<TimeAvailability> availability) {
        this.serviceId = serviceId;
        this.name = name;
        this.description = description;
        this.availability = availability;
    }

    public Long getId()
    {
        return serviceId;
    }

    public String getName()
    {
        return name;
    }

    public String getDescription()
    {
        return description;
    }

    @JsonIgnore
    public List<TimeAvailability> getAvailablities()
    {
        return availability;
    }

    @JsonProperty("availabilities")
    public List<Long> getAvailabilitiesId()
    {
        ArrayList<Long> ids = new ArrayList<>(availability.size());
        for (TimeAvailability timeAvailability : availability)
        {
            ids.add(timeAvailability.getId());    
        }

        return ids;
    }

    @JsonProperty("workers")
    public List<Long> getWorkers()
    {
        ArrayList<Long> ids = new ArrayList<>(workers.size());
        for (Worker worker : workers)
        {
            ids.add(worker.getId());
        } 
        return ids;
    }
}

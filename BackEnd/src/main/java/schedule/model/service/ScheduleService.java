package schedule.model.service;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class ScheduleService
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @NotBlank(message = "Service name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @Transient
    private TimeAvailability availability;

    public ScheduleService() {}

    public ScheduleService(Long serviceId, @NotBlank(message = "Service name is required") String name,
            @NotBlank(message = "Description is required") String description, TimeAvailability availability) {
        this.serviceId = serviceId;
        this.name = name;
        this.description = description;
        this.availability = availability;
    }
}

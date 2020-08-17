package schedule.model.service;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class ScheduleService
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @NotBlank(message = "Description is required")
    private String description;

    private TimeAvailability availability;

    public ScheduleService() {}

    public ScheduleService(Long serviceId, String description, TimeAvailability availability)
    {
        this.serviceId = serviceId;
        this.description = description;
        this.availability = availability;
    }
}
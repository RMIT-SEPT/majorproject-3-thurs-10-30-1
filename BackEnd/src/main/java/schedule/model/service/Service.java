package schedule.model.service;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Service
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @NotBlank(message = "Description is required")
    private String description;

    private TimeAvailability availability;

    public Service() {}

    public Service(Long serviceId, String description, TimeAvailability availability)
    {
        this.serviceId = serviceId;
        this.description = description;
        this.availability = availability;
    }
}
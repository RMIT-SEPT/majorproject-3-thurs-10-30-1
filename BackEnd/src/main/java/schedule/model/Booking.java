package schedule.model;

import java.time.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.*;

@Entity
public class Booking
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "A customer is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Customer customer;

    @NotNull(message = "A Worker is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "worker_id")
    @JsonIgnore
    private Worker worker;

    @NotNull(message = "A service is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "service_id")
    @JsonIgnore
    private ScheduleService service;

    @NotNull(message  = "An availability is required")
    @OneToOne()
    @JsonIgnore
    private TimeAvailability availabilitySlot;

    @NotNull(message = "A start time is required")
    @JsonFormat(pattern ="yyyy-MM-dd")
    private LocalDate start_time;


    @NotBlank(message = "A status is required")
    private String status;

    public Booking()
    {

    }

    public Booking(Long id,
            Customer customer,
            Worker worker,
            ScheduleService service,
            LocalDate start_time,
            String status,
            TimeAvailability availability) {
        this.id = id;
        this.availabilitySlot = availability;
        this.customer = customer;
        this.worker = worker;
        this.service = service;
        this.start_time = start_time;
        this.status = status;
    }
    public TimeAvailability getAvailability() {
        return availabilitySlot;
    }

    @JsonProperty(value = "availability")
    public Long getAvailabilityId() {
        return availabilitySlot.getId();
    }

    public Long getId() {
        return id;
    }

    @JsonIgnore
	public Customer getCustomer() {
		return customer;
    }
    
    @JsonProperty(value = "customer")
    public Long getCustomerId() {
        return customer.getId();
    }
    @JsonIgnore
    public ScheduleService getService() {
        return service;
    }

    @JsonProperty(value = "service")
    public Long getServiceId() {
        return service.getId();
    }

    public LocalDate getDate() {
        return start_time;
    }

    public String getStatus() {
        return status;
    }
}

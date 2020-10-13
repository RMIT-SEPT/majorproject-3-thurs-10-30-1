package schedule.model;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.*;

@Entity
public class Booking
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "A customer is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Customer customer;

    @NotBlank(message = "A Worker is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "worker_id")
    @JsonIgnore
    private Worker worker;

    @NotBlank(message = "A service is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "service_id")
    @JsonIgnore
    private ScheduleService service;

    @NotBlank(message  = "An availability is required")
    @OneToOne()
    @JsonIgnore
    private TimeAvailability availabilitySlot;

    @NotBlank(message = "A start time is required")
    @JsonFormat(pattern ="yyyy-mm-dd@HH:mm")
    private Date start_time;


    @NotBlank(message = "A status is required")
    private String status;

    public Booking()
    {

    }

    public Booking(Long id, @NotBlank(message = "A customer is required") Customer customer,
            @NotBlank(message = "A Worker is required") Worker worker,
            @NotBlank(message = "A service is required") ScheduleService service,
            @NotBlank(message = "A start time is required") Date start_time,
            @NotBlank(message = "A status is required") String status,
            @NotBlank(message = "An availability is required") TimeAvailability availability) {
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
    public Worker getWorker() {
        return worker;
    }

    @JsonProperty(value = "worker")
    public Long getWorkerId() {
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

    public Date getStart_time() {
        return start_time;
    }

    public String getStatus() {
        return status;
    }
}

package schedule.model;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

import schedule.model.service.ScheduleService;

@Entity
public class Booking
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "A customer is required")
    @ManyToOne(optional = false)
    private Customer customer;

    @NotBlank(message = "A Worker is required")
    @ManyToOne(optional = false)
    private Worker worker;

    @NotBlank(message = "A service is required")
    @ManyToOne(optional = false)
    private ScheduleService service;

    @NotBlank(message = "A start time is required")
    @JsonFormat(pattern ="yyyy-mm-dd@HH:mm")
    private Date start_time;

    @NotBlank(message = "An end time is required")
    @JsonFormat(pattern ="yyyy-mm-dd@HH:mm")
    private Date end_time;

    @NotBlank(message = "A status is required")
    private String status;

    public Booking()
    {

    }

    public Booking(Long id, @NotBlank(message = "A customer is required") Customer customer,
            @NotBlank(message = "A Worker is required") Worker worker,
            @NotBlank(message = "A service is required") ScheduleService service,
            @NotBlank(message = "A start time is required") Date start_time,
            @NotBlank(message = "An end time is required") Date end_time,
            @NotBlank(message = "A status is required") String status) {
        this.id = id;
        this.customer = customer;
        this.worker = worker;
        this.service = service;
        this.start_time = start_time;
        this.end_time = end_time;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

	public Customer getCustomer() {
		return customer;
	}

    public Worker getWorker() {
        return worker;
    }

    public ScheduleService getService() {
        return service;
    }

    public Date getStart_time() {
        return start_time;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public String getStatus() {
        return status;
    }
}

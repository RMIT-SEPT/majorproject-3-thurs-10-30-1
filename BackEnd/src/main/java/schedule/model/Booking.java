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
    private User user;

    @NotBlank(message = "A Worker is required")
    private User worker;

    @NotBlank(message = "A service is required")
    private ScheduleService service;

    @NotBlank(message = "A start time is required")
    @JsonFormat(pattern ="yyyy-mm-dd@HH:mm")
    private Date start_time;

    @NotBlank(message = "An end time is required")
    @JsonFormat(pattern ="yyyy-mm-dd@HH:mm")
    private Date end_time;

    @NotBlank(message = "email s required")
    private String status;

    @NotBlank(message = "accType is required")
    private char accountType;

    public Booking(Long id, @NotBlank(message = "A customer is required") User user,
            @NotBlank(message = "A Worker is required") User worker,
            @NotBlank(message = "A start time is required") Date start_time,
            @NotBlank(message = "An end time is required") Date end_time,
            @NotBlank(message = "email s required") String status,
            @NotBlank(message = "accType is required") char accountType) {
        this.id = id;
        this.user = user;
        this.worker = worker;
        this.start_time = start_time;
        this.end_time = end_time;
        this.status = status;
        this.accountType = accountType;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public User getWorker() {
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

    public char getAccountType() {
        return accountType;
    }
}

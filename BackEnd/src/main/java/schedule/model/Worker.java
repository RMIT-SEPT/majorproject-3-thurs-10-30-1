package schedule.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import schedule.model.service.ScheduleService;

@Entity
public class Worker
{
    @Id
    private Long id;

    @MapsId
    @JoinColumn(name = "worker_id")
    @OneToOne(optional = false)
    @NotBlank(message = "A user account is required")
    private User user;

    @OneToMany(mappedBy = "worker")
    private List<Booking> bookings;

    @ManyToMany
    private List<ScheduleService> services;

    public Worker() {};

    public Worker(Long id, @NotBlank(message = "A user account is required") User user, List<Booking> bookings,
            List<ScheduleService> services) {
        this.id = id;
        this.user = user;
        this.bookings = bookings;
        this.services = services;
    }
}

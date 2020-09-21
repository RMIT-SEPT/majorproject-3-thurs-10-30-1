package schedule.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import schedule.model.service.ScheduleService;

@Entity
public class Worker
{
    @Id
    private Long id;

    @MapsId
    @JoinColumn(name = "worker_id")
    @OneToOne(optional = false)
    @NotNull(message = "A user account is required")
    private User user;

    @OneToMany(mappedBy = "worker")
    private List<Booking> bookings;

    @ManyToMany
    private List<ScheduleService> services;

    @ManyToMany(mappedBy = "workers")
    private List<Business> businesses;

    public Worker() {};

    public Worker(Long id, @NotNull(message = "A user account is required") User user) {
        this.id = id;
        this.user = user;
    }

    public Worker(Long id, @NotNull(message = "A user account is required") User user, List<Booking> bookings,
            List<ScheduleService> services) {
        this.id = id;
        this.user = user;
        this.bookings = bookings;
        this.services = services;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public List<ScheduleService> getServices() {
        return services;
    }

    public List<Business> getBusinesses()
    {
        return businesses;
    }
}

package schedule.model;

import java.util.List;

import javax.persistence.*;

import schedule.model.service.ScheduleService;

@Entity
public class Worker
{
    @Id
    private Long id;

    @MapsId
    @JoinColumn(name = "worker_id")
    @OneToOne(optional = false)
    private User user;

    @OneToMany(mappedBy = "worker")
    private List<Booking> bookings;

    @ManyToMany
    private List<ScheduleService> services;
}

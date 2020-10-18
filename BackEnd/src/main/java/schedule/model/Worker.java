package schedule.model;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.*;


@Entity
public class Worker {
    @Id
    private Long id;

    @MapsId
    @JoinColumn(name = "worker_id")
    @OneToOne(optional = false)
    @NotNull(message = "A user account is required")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "worker")
    private List<Booking> bookings;

    @JsonIgnore
    @ManyToMany
    @JoinColumn(name = "service_id")
    private List<ScheduleService> services;

    @JsonIgnore
    @ManyToMany(mappedBy = "workers")
    private List<Business> businesses;

    public Worker() {
    };

    public Worker(Long id, @NotNull(message = "A user account is required") User user) {
        this.id = id;
        this.user = user;
        this.bookings = new ArrayList<>();
        this.services = new ArrayList<>();
        this.businesses = new ArrayList<>();
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

    @JsonIgnore
    public List<Booking> getBookings() {
        return bookings;
    }

    @JsonProperty("bookings")
    public List<Long> getBookingIds() {
        // TODO: Cache this guy
        ArrayList<Long> bookingIds = new ArrayList<>(bookings.size());
        for (Booking booking : bookings) {
            bookingIds.add(booking.getId());
        }

        return bookingIds;
    }

    @JsonIgnore
    public List<ScheduleService> getServices() {
        return services;
    }

    @JsonProperty("services")
    public List<Long> getServiceIds() {
        ArrayList<Long> serviceIds = new ArrayList<>(services.size());
        for (ScheduleService service : services) {
            serviceIds.add(service.getId());
        }

        return serviceIds;
    }

    @JsonIgnore
    public List<Business> getBusinesses() {
        return businesses;
    }

    @JsonProperty("businesses")
    public List<Long> getBusinessIds() {
        ArrayList<Long> businessIds = new ArrayList<>(businesses.size());

        for (Business business : businesses) {
            businessIds.add(business.getId());
        }

        return businessIds;
    }
    
    public void addService(ScheduleService service)
    {
        services.add(service);
    }
}

package schedule.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Customer
{
    @Id
    private Long id;

    @MapsId
    @JoinColumn(name = "customer_id")
    @OneToOne(optional = false)
    @NotNull(message = "A user account is required")
    private User user;

    @OneToMany(mappedBy = "customer")
    private List<Booking> bookings;

    public Customer() {}

    public Customer(Long id, @NotNull(message = "A user account is required") User user) {
        this.id = id;
        this.user = user;
    };

    public Customer(Long id, @NotNull(message = "A user account is required") User user, List<Booking> bookings) {
        this.id = id;
        this.user = user;
        this.bookings = bookings;
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
}

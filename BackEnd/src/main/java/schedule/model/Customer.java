package schedule.model;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.*;

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
    @JsonIgnore
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

    @JsonIgnore
    public List<Booking> getBookings() {
        return bookings;
    }

    @JsonProperty("bookings")
    public List<Long> getBookingIds() {
        ArrayList<Long> ids = new ArrayList<>(bookings.size());
        for (Booking booking : bookings)
        {
            ids.add(booking.getId());
        }
        return ids;
    }
}

package schedule.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Customer
{
    @Id
    private Long id;

    @MapsId
    @JoinColumn(name = "customer_id")
    @OneToOne(optional = false)
    @NotBlank(message = "A user account is required")
    private User user;

    @OneToMany(mappedBy = "customer")
    private List<Booking> bookings;

    public Customer() {}

    public Customer(Long id, @NotBlank(message = "A user account is required") User user, List<Booking> bookings) {
        this.id = id;
        this.user = user;
        this.bookings = bookings;
    };
}

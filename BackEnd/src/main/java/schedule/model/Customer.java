package schedule.model;

import java.util.List;

import javax.persistence.*;

@Entity
public class Customer
{
    @Id
    private Long id;

    @MapsId
    @JoinColumn(name = "customer_id")
    @OneToOne(optional = false)
    private User user;

    @OneToMany(mappedBy = "customer")
    private List<Booking> bookings;
}

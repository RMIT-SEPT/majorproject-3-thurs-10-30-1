package schedule.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Admin
{
    @Id
    private Long id;

    @MapsId
    @JoinColumn(name = "admin_id")
    @OneToOne(optional = false)
    @NotNull(message = "A user account is required")
    private User user;

    @ManyToOne(optional = true)
    private Business business;

    public Admin() {}

    public Admin(Long id, @NotNull(message = "A user account is required") User user, Business business) {
        this.id = id;
        this.user = user;
        this.business = business;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Business getBusiness() {
        return business;
    }
}

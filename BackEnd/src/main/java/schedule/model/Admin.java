package schedule.model;

import javax.persistence.*;
import javax.validation.constraints.*;

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

    public Admin() {}

    public Admin(Long id, @NotNull(message = "A user account is required") User user) {
        this.id = id;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }
}

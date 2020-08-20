package schedule.model;

import javax.persistence.*;

@Entity
public class Admin
{
    @Id
    private Long id;

    @MapsId
    @JoinColumn(name = "admin_id")
    @OneToOne(optional = false)
    private User user;
}

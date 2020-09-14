package schedule.model.service;

import java.util.Date;

import javax.persistence.*;

@Entity(name = "availability")
public class TimeAvailability
{
    @Id
    private Long id;

    @OneToOne
    @MapsId
    private ScheduleService service;

    public TimeAvailability() {}

    public TimeAvailability(Long id, ScheduleService service)
    {
        this.id = id;
        this.service = service;
    }

    public boolean isAvailable(Date date)
    {
        return true;
    }
}
package schedule.model;

import java.time.LocalDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.*; 
import org.hibernate.validator.constraints.*;

@Entity(name = "availability")
public class TimeAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @NotNull
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "WORKER_ID")
    private Worker worker;

    @Range(min = 1, max = 7)
    private int dayOfWeek;
    @Range(min = 0, max = 23)
    private int hour;
    @Range(min = 0, max = 59)
    private int minute;
    @Range(min = 0)
    private int length;

    public Long getId() {
        return id;
    }

    @JsonProperty(value = "worker")
    public Long getWorkerId() {
        return worker.getId();
    }

    public TimeAvailability() {
    }

    public TimeAvailability(Long id, int day, int hour, int minute, int length) {
        this.dayOfWeek = day;
        this.hour = hour;
        this.minute = minute;
        this.id = id;
        this.length = length;
    }

    public boolean isAvailable(LocalDateTime date) {
        boolean value = true;
        value &= date.getDayOfWeek().getValue() == dayOfWeek;
        value &= date.getHour() == hour;
        value &= date.getMinute() == minute;
        return value;
    }

    public int getDay()
    {
        return dayOfWeek;
    }

    public int getHour()
    {
        return hour;
    }

    public int getMinute()
    {
        return minute;
    }

    @JsonIgnore
    public Worker getWorker()
    {
        return worker;
    }
}
package schedule.model.service;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Entity(name = "availability")
public class TimeAvailability
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId()
    {
        return id;
    } 

    public TimeAvailability() {}

    public TimeAvailability(Long id)
    {
        this.id= id;
        // this.service = service;
    }

    public boolean isAvailable(Date date)
    {
        return true;
    }
}
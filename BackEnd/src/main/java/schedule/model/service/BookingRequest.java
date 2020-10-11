package schedule.model.service;

import java.util.Date;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.hibernate.cfg.annotations.IdBagBinder;

public class BookingRequest {

    @NotNull(message = "the field (\"id\" : long) is required")
    private Long id;
    @NotNull(message = "the field (\"date\" : yyyy-mm-dd HH:mm) is required")
    @JsonFormat(pattern ="yyyy-mm-dd HH:mm")
    private Date date;
    
    public BookingRequest() {}
    public BookingRequest(Long id, Date date)
    {
        this.date = date;
        this.id = id;
    }
    
    public Long getId()
    {
        return id;
    }

    public Date getDate()
    {
        return date; 
    }
}

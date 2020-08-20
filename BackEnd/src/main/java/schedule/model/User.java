package schedule.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank(message = "Person name is required")
    private String name;

    @NotBlank(message = "Username is required")
    private String userName;

    @NotBlank(message = "password is required")
    private String password;

    private long contactNumber;

    @NotBlank(message = "email s required")
    @Email
    private String email;

    public User(Long userId, @NotBlank(message = "Person name is required") String name,
            @NotBlank(message = "Username is required") String userName,
            @NotBlank(message = "password is required") String password, long contactNumber,
            @NotBlank(message = "email s required") @Email String email) {
        this.userId = userId;
        this.name = name;
        this.userName = userName;
        this.password = password;
        this.contactNumber = contactNumber;
        this.email = email;
    }

    public User() {

    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public long getContactNumber() {
        return contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setContactNumber(long contactNumber) {
        this.contactNumber = contactNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

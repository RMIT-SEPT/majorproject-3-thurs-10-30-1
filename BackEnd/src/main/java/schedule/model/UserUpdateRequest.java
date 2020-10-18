package schedule.model;

import javax.validation.constraints.*;

public class UserUpdateRequest {
    @NotNull
    private Long userId;

    @NotBlank(message = "Person name is required")
    private String name;

    @NotBlank(message = "Username is required")
    private String username;

    private String password;

    private long contactNumber;

    @NotBlank(message = "email s required")
    @Email
    private String email;

    private AccountType accountType;

    public UserUpdateRequest(@NotNull Long userId, @NotBlank(message = "Person name is required") String name,
            @NotBlank(message = "Username is required") String username, String password, long contactNumber,
            @NotBlank(message = "email s required") @Email String email) {
        this.userId = userId;
        this.name = name;
        this.username = username;
        this.password = password;
        this.contactNumber = contactNumber;
        this.email = email;
    }

    public User createUser()
    {
        return new User(userId, name, username, password, contactNumber, email, accountType);
    }

    public boolean passwordIsEmpty()
    {
        return password == null || password.equals("");
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }
}

import org.json.simple.JSONObject;
import org.junit.Before;
import org.junit.Test;

import org.junit.runner.RunWith;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import schedule.App;
import schedule.web.UserController;
import utils.Database;
import utils.JSON;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes= App.class)
@RunWith(SpringRunner.class)
@ActiveProfiles(profiles = "test")
public class UserControllerTest
{
    @LocalServerPort
    private int port;

    @Autowired
    private UserController controller;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void contextLoads() throws Exception
    {
        Assertions.assertNotNull(controller);
    }

    @Before
    public void clean_database()
    {
        Database.cleanDatabase();
    }

    private ResponseEntity<String> makeRequest(String jsonFilename, String apiURL) throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject json = JSON.parseFromFile(JSON.getJSONFilePath(jsonFilename));
        HttpEntity<String> request = new HttpEntity<>(json.toString(), headers);
        String url = "http://localhost:" + port + apiURL;
        return restTemplate.postForEntity(url, request, String.class);
    }

    @Test
    public void createNewUser_ValidValues_OK() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("UserControllerTest/createNewUser_ValidValues_OK.json", "/api/user");
        Assertions.assertEquals(HttpStatus.OK, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewUser_MissingName_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("UserControllerTest/createNewUser_MissingName_BAD_REQUEST.json", "/api/user");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewUser_MissingUsername_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("UserControllerTest/createNewUser_MissingUsername_BAD_REQUEST.json", "/api/user");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewUser_MissingPassword_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("UserControllerTest/createNewUser_MissingPassword_BAD_REQUEST.json", "/api/user");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewUser_MissingEmail_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("UserControllerTest/createNewUser_MissingEmail_BAD_REQUEST.json", "/api/user");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewUser_InvalidEmailNoAtSymbol_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("UserControllerTest/createNewUser_InvalidEmailNoAtSymbol_BAD_REQUEST.json", "/api/user");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewUser_InvalidEmailOnlyAtSymbol_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("UserControllerTest/createNewUser_InvalidEmailOnlyAtSymbol_BAD_REQUEST.json", "/api/user");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void login_ValidDetails_ACCEPTED() throws Exception
    {
        makeRequest("UserControllerTest/createNewUser.json", "/api/user");
        ResponseEntity<String> responseEntityStr =
            makeRequest("UserControllerTest/login_ValidDetails_ACCEPTED.json", "/api/user/login");
        Assertions.assertEquals(HttpStatus.ACCEPTED, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }
}

import org.json.simple.JSONObject;
import org.junit.Test;

import org.junit.runner.RunWith;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import schedule.App;
import schedule.web.UserController;
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

    @Test
    public void user_created() throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject user = JSON.parseFromFile(JSON.getJSONFilePath("creat_user.json"));
        HttpEntity<String> request = new HttpEntity<>(user.toString(), headers);
        String url = "http://localhost:" + port + "/api/admin";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean created = responseEntityStr.getStatusCode().equals(HttpStatus.CREATED);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(created,message);
    }

    @Test
    public void not_create_missing_email() throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject user = JSON.parseFromFile(JSON.getJSONFilePath("not_create_missing_email.json"));
        HttpEntity<String> request = new HttpEntity<>(user.toString(), headers);
        String url = "http://localhost:" + port + "/api/admin";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean notCreated = responseEntityStr.getStatusCode().equals(HttpStatus.BAD_REQUEST);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(notCreated,message);
    }

    @Test
    public void not_create_invalid_email() throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject user = JSON.parseFromFile(JSON.getJSONFilePath("not_create_invalid_email.json"));
        HttpEntity<String> request = new HttpEntity<>(user.toString(), headers);
        String url = "http://localhost:" + port + "/api/admin";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean notCreated = responseEntityStr.getStatusCode().equals(HttpStatus.BAD_REQUEST);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(notCreated,message);
    }
}

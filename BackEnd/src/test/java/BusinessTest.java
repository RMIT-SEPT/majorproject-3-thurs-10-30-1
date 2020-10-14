import groovy.json.JsonException;

import org.junit.Test;

import org.junit.runner.RunWith;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import schedule.App;
import schedule.model.Business;
import schedule.web.BusinessController;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.boot.configurationprocessor.json.JSONObject;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes = App.class)
@RunWith(SpringRunner.class)
@ActiveProfiles(profiles = "test")
public class BusinessTest {

    @LocalServerPort
    private int port;

    @Autowired
    private BusinessController controller;
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void contextLoads() throws Exception {
        Assertions.assertNotNull(controller);
    }

    @Test
    public void createNewBusiness() throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject business = new JSONObject();
        try {
            business.put("name", "Bobby Coffee");
        } catch (JsonException e) {
            e.printStackTrace();
        }
        HttpEntity<String> request = new HttpEntity<>(business.toString(), headers);
        String url = "http://localhost:" + port + "/api/business";
        ResponseEntity<Business> responseEntityStr = restTemplate.postForEntity(url, request, Business.class);
        boolean created = responseEntityStr.getStatusCode().equals(HttpStatus.CREATED);
        System.out.println(port);
        Assertions.assertTrue(created);
    }


    @Test
    public void createBadBusiness() throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject business = new JSONObject("{\"name_bad\" : \"badBusiness\"}");
        HttpEntity<String> request = new HttpEntity<>(business.toString(), headers);
        String url = "http://localhost:" + port + "/api/business";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean created = responseEntityStr.getStatusCode().equals(HttpStatus.BAD_REQUEST);
        System.out.println(port);
        Assertions.assertTrue(created);
    }

    @Test
    public void getNewBusiness() throws Exception {
        // create business first
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject business = new JSONObject("{" + "\"name\" : \"my business\"" + "}");
        HttpEntity<String> request = new HttpEntity<>(business.toString(), headers);
        String url = "http://localhost:" + port + "/api/business";
        ResponseEntity<Business> responseEntityStr = restTemplate.postForEntity(url, request, Business.class);
        boolean created = responseEntityStr.getStatusCode().equals(HttpStatus.CREATED);
        Business businessCreated = responseEntityStr.getBody();
        System.out.println(port);
        url = "http://localhost:" + port + "/api/business/" + businessCreated.getId();
        ResponseEntity<Business> getBusiness = restTemplate.getForEntity(url, Business.class);
        System.out.println(getBusiness.getStatusCode());
        Business getBusinessObject = getBusiness.getBody();
        Assertions.assertTrue(getBusinessObject.getId().equals(businessCreated.getId()));
        System.out.println(getBusinessObject.toString());
        Assertions.assertTrue(getBusinessObject.getName().equals(businessCreated.getName()));
    }
}

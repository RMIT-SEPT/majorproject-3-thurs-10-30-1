package utils;
import java.io.FileReader;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class JSON
{
    public static JSONObject parseFromFile(String filename) throws Exception
    {
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(new FileReader(filename));
        return jsonObject;
    }

    public static String getJSONFilePath(String filename)
    {
        return System.getProperty("user.dir") + "/src/test/JSONFiles/" + filename;
    }
}

package utils;

import java.sql.*;
import java.util.*;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;

public class Database
{
    @Autowired
    static DataSource dataSource;

    public static void cleanDatabase()
    {
        try
        {
            Connection c = dataSource.getConnection();
            Statement s = c.createStatement();
    
            // Disable FK
            s.execute("SET REFERENTIAL_INTEGRITY FALSE");
    
            // Find all tables and truncate them
            Set<String> tables = new HashSet<String>();
            ResultSet rs = s.executeQuery("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES  where TABLE_SCHEMA='PUBLIC'");
            while (rs.next()) {
                tables.add(rs.getString(1));
            }
            rs.close();
            for (String table : tables) {
                s.executeUpdate("TRUNCATE TABLE " + table);
            }
    
            // Idem for sequences
            Set<String> sequences = new HashSet<String>();
            rs = s.executeQuery("SELECT SEQUENCE_NAME FROM INFORMATION_SCHEMA.SEQUENCES WHERE SEQUENCE_SCHEMA='PUBLIC'");
            while (rs.next()) {
                sequences.add(rs.getString(1));
            }
            rs.close();
            for (String seq : sequences) {
                s.executeUpdate("ALTER SEQUENCE " + seq + " RESTART WITH 1");
            }
    
            // Enable FK
            s.execute("SET REFERENTIAL_INTEGRITY TRUE");
            s.close();
            c.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }
}

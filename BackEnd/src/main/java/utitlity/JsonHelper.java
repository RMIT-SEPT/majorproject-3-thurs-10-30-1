package utitlity;

public final class JsonHelper {

    public static void addField(String name, String value, StringBuilder sb)
    {
        sb.append(String.format("\"%s\":\"%s\" ", name, value));
    }

    public static void addField(String name, int value, StringBuilder sb)
    {
        sb.append(String.format("\"%s\":%d ", name, value));
    }

    public static void addField(String name, long value, StringBuilder sb)
    {
        sb.append(String.format("\"%s\":%l", name, value));
    }

    public static void startScope(StringBuilder builder)
    {
        builder.append('{');
    }

    public static void endScope(StringBuilder builder)
    {
        builder.append('}');
    }

    public static void startArray(StringBuilder builder)
    {
        builder.append('[');
    }

    public static void addComma(StringBuilder builder)
    {
        builder.append(',');
    }

    public static void startArray(String value, StringBuilder builder)
    {
        builder.append(String.format("\"%s\":[", value));
    }

    public static void endArray(StringBuilder builder)
    {
        builder.append(']');
    }

}

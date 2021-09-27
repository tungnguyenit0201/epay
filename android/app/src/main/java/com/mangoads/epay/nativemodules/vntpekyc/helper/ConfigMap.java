package com.mangoads.epay.nativemodules.vntpekyc.helper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class ConfigMap extends HashMap {
    public ConfigMap(Map map){
        this.putAll(map);
    }

    public String getString(String key,  String defaultValue) {
        return this.get(key) != null && this.get(key) instanceof String  ? (String)this.get(key) : defaultValue;
    }

    public String getColor(String key,  String defaultValue) {
        return this.get(key) != null && this.get(key) instanceof String && ((String) this.get(key)).matches("^[a-fA-F0-9]{6}$")  ? "#"+(String)this.get(key) : defaultValue;
    }

    public Integer getInt(String key,  Integer defaultValue) {
        return this.getNumber(key,defaultValue).intValue();
    }

    public Number getNumber(String key,  Number defaultValue) {
        return this.get(key) != null && this.get(key) instanceof Number  ? (Number)this.get(key) : defaultValue;
    }

    public Float getFloat(String key, Float defaultValue) {
        return this.getNumber(key,defaultValue).floatValue();
    }

    public Boolean getBool(String key,  Boolean defaultValue) {
        return this.get(key) != null && this.get(key) instanceof Boolean  ? (Boolean) this.get(key) : defaultValue;
    }

    public List getList(String key, List defaultValue) {
        return this.get(key) != null && this.get(key) instanceof List  ? (List) this.get(key) : defaultValue;
    }

}
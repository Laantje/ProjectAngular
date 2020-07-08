package com.example.myapplication;

public class User {
    private String username;
    private double latitude;
    private double longitude;
    private String name;
    private String description;

    public double getLat(){
        return latitude;
    }
    public double getLng(){
        return longitude;
    }
    public String getUsername(){
        return username;
    }

    public String getName(){
        return name;
    }
}

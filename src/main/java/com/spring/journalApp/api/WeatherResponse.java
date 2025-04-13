package com.spring.journalApp.api;
import com.fasterxml.jackson.databind.ObjectMapper; // version 2.11.1
import com.fasterxml.jackson.annotation.JsonProperty; // version 2.11.1
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class WeatherResponse {
    private Current current;

    @Getter
    @Setter
    public class Current{
        public int temperature;
        @JsonProperty("weather_descriptions")
        public ArrayList<String> weatherDescriptions;
        public int feelslike;
    }

///* ObjectMapper om = new ObjectMapper();
//Root root = om.readValue(myJsonString, Root.class); */
//    public class AirQuality{
//        public String co;
//        public String no2;
//        public String o3;
//        public String so2;
//        public String pm2_5;
//        public String pm10;
//        public String us-epa-index;
//        public String gb-defra-index;
//    }
//
//    public class Astro{
//        public String sunrise;
//        public String sunset;
//        public String moonrise;
//        public String moonset;
//        public String moon_phase;
//        public int moon_illumination;
//    }



//    public class Location{
//        public String name;
//        public String country;
//        public String region;
//        public String lat;
//        public String lon;
//        public String timezone_id;
//        public String localtime;
//        public int localtime_epoch;
//        public String utc_offset;
//    }
//
//    public class Request{
//        public String type;
//        public String query;
//        public String language;
//        public String unit;
//    }
//
//    public class Root{
//        public Request request;
//        public Location location;
//        public Current current;
//    }

}

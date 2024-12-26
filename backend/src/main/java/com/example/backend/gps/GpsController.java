package com.example.backend.gps;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/gps")
public class GpsController {

    private final GpsService gpsService;

    public GpsController(GpsService gpsService) {
        this.gpsService = gpsService;
    }

    @GetMapping("/address")
    public String getAddress(@RequestParam double latitude, @RequestParam double longitude) {
        return gpsService.getFullAddress(latitude, longitude);
    }

    

    
}

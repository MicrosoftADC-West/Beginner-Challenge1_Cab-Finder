<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

   public function distance($lat1, $lon1, $lat2, $lon2, $unit) {
    
   // the contents of the locations JSON file 
    $location_json = file_get_contents("locations.json");
    // var_dump($location_json); // show contents
    
    // Get the contents of the rides JSON file 
    $rides_json = file_get_contents("rides.json");
    // var_dump($rides_json); // show contents
    
    // Get the contents of the rideservices JSON file 
    $ride_services_json = file_get_contents("rideservices.json");
    // var_dump($ride_services_json); // show contents
    
    
   
        if (($lat1 == $lat2) && ($lon1 == $lon2)) {
          return 0;
        }
        else {
          $theta = $lon1 - $lon2;
          $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
          $dist = acos($dist);
          $dist = rad2deg($dist);
          $miles = $dist * 60 * 1.1515;
          $unit = strtoupper($unit);
      
          if ($unit == "K") {
            return ($miles * 1.609344);
          } else if ($unit == "M") {
            return ($miles * 0.8684);
          } else {
            return $miles;
          }
        }
      }
      
   
    
    


}

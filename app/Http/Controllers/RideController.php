<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RideController extends Controller
{
    public function getRides (Request $req) {
         $location_id= $req->location_id;
        

        if (DB::table("ride")->where("location_id", "=",  $location_id)->exists()) {

                $query= DB::table("locations")->selectRAW("*, (((acos(sin(($start_coord_lat *pi()/180)) * sin(($destination_coord_lat *pi()/180)) 
                + cos(($start_coord_long *pi()/180)) * cos((destination_coord_long *pi()/180)) * 
                cos(((".$start_coord_long."- $destination_coord_long)*pi()/180)))) * 180/pi()) * 60 * 1.1515 as estimated_arrival_time")->where("locations.location_id", "=", $location_id)->get();

                // $query= DB::table("ride")->join("locations", "locations.location_id", "=", "ride.location_id")->join("rideservice", "ride.rideservice_id", "=", "rideservice.rideservice_id")->selectRaw("location_description, priceperkm,start_coord_lat, start_coord_long, destination_coord_lat, destination_coord_long")->where("ride.ride_id","=", $ride_id)->get();


                return response()->json(["success" => true,  "message" => "Estimated arrival time for ride", "data" => $query], 200);
                
        }
        else{
            return response()->json(["success" => false,  "message" => "Missing required parameter"], 400); 
        }
          
        return response()->json(["success" => false,  "message" => "Error fetching parameters from database"], 500); 
 
}

public function addRide(Request $req){
    $start_coord_long= $req->start_coord_long;
    $start_coord_lat= $req->start_coord_lat;
    $destination_coord_long= $req->destination_coord_long;
    $destination_coord_lat= $req->destination_coord_lat;
    $rideservice_id= $req->rideservice_id;
    // $ride_id=$req->ride_id;
    
    // var_dump($token);

    if(DB::table("rideservice")->where("rideservice_id", "=", $rideservice_id)->exists()){

        $query= DB::table("locations")->insert(["start_coord_long" => $start_coord_long, "start_coord_lat" => $start_coord_lat, "destination_coord_long" => $destination_coord_long, "destination_coord_lat" => $destination_coord_lat]);
        
        return response()->json(["success" => true, "message" =>"New ride created successfully"], 201);
 
    }
    else{
        return response()->json(["success" => false,  "message" => "Missing required parameter"], 400); 
        
    }
    return response()->json(["success" =>false, "message" =>"Ride creation unsuccessful"], 500);
}
}

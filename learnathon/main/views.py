
import json
import requests
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from django.utils.datastructures import MultiValueDictKeyError
from pathlib import Path
from main.helpers.app_helper import get_distance
from main.serializers import AddRideSerializer

class GetAllRidesAPIView(APIView):
    def get(self, request):
        try:
            start_location = request.query_params["start_location"]
            end_location= request.query_params["end_location"]
        except MultiValueDictKeyError:
            return Response(
                {
                    "status": False,
                    "param": "you must pass in the start_location and end_location"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            start_lon = float(start_location.split(",")[0])
            start_lat = float(start_location.split(",")[1])
            
            end_lon = float(end_location.split(",")[0])
            end_lat = float(end_location.split(",")[1])
        except ValueError:
            return Response(
                
                {
                    "status": False,
                    "param": "pass in the long and lat separated with a comma eg. 6.123, 3.123"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        # print(start_lon, start_lat, end_lon, end_lat)
        location = json.loads((Path(__file__).parent / 'locations.json').read_text())
        ride = json.loads((Path(__file__).parent / 'rides.json').read_text())
        rideservice = json.loads((Path(__file__).parent / 'rideservices.json').read_text())
        
        location_data = []
        for loc_qs in location:
            if loc_qs["start_coord_long"]==start_lon and loc_qs["start_coord_lat"]==start_lat and loc_qs["destination_coord_long"]==end_lon and loc_qs["destination_coord_lat"]==end_lat:
                distance = get_distance(start_lon, start_lat, end_lon, end_lat)
                print(distance)
                location_data.append({"location_id": loc_qs["location_id"], "distance": distance})
            else:
                pass
        if location_data == []:
            return Response(
                {
                    "status": False,
                    "message": "invalid start and end location"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
       
        all_rides = []
        for loc in location_data:
            location_id = loc["location_id"]
            for rides_qs in ride:
                if rides_qs["location_id"]==location_id:
                    for ride_service_qs in rideservice:
                        if ride_service_qs["rideservice_id"]==rides_qs["rideservice_id"]:
                            price = ride_service_qs["priceperkm"] * loc["distance"]
                            data = {
                                "ride_service": ride_service_qs["rideservice_name"],
                                "price": price,
                                "distance": distance,
                                "estimated_arrival_time": rides_qs["estimated_arrival_time"]
                             }
                            all_rides.append(data)
                        else:
                            pass
                else:
                    pass
        return Response(all_rides, status=status.HTTP_200_OK)
    
    
class GetRideByIdAPIView(APIView):
    def get(self, request):
        try:
            ride_id = request.query_params["ride_id"]
        except MultiValueDictKeyError:
            return Response(
                {
                    "status": False,
                    "param": "you must pass in ride_id"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        location = json.loads((Path(__file__).parent / 'locations.json').read_text())
        ride = json.loads((Path(__file__).parent / 'rides.json').read_text())
        rideservice = json.loads((Path(__file__).parent / 'rideservices.json').read_text())
        #check if ride_id exists is False
        if not any(ride_qs['ride_id'] == int(ride_id) for ride_qs in ride):
            return Response(
                {
                    "status": False,
                    "message": "ride_id could not be found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        #ride_id exists is True
        else:
            for ride_qs in ride:
                if ride_qs['ride_id'] == int(ride_id):
                    location_id = ride_qs["location_id"]
                    ride_service_id = ride_qs["rideservice_id"]
                    estimated_arrival_time = ride_qs["estimated_arrival_time"]
                    
                    #check if location_id exists is False
                    if not any(loc_qs['location_id'] == int(location_id) for loc_qs in location):
                        return Response(
                            {
                                "status": False,
                                "message": "location_id could not be found"
                            },
                            status=status.HTTP_404_NOT_FOUND,
                        )
                    #location_id exists is True
                    else:
                        for loc_qs in location:
                            if loc_qs['location_id'] == int(location_id):
                                start_lon = float(loc_qs["start_coord_long"])
                                start_lat = float(loc_qs["start_coord_lat"])
                                end_lon = float(loc_qs["destination_coord_long"])
                                end_lat = float(loc_qs["destination_coord_lat"])
                                distance = get_distance(start_lon, start_lat, end_lon, end_lat)
                            else:
                                pass
                    #check if ride_service_id exists is False
                    if not any(ride_service_qs['rideservice_id'] == int(ride_service_id) for ride_service_qs in rideservice):
                        return Response(
                            {
                                "status": False,
                                "message": "rideservice_id could not be found"
                            },
                            status=status.HTTP_404_NOT_FOUND,
                            )
                    #ride_service_id exists is True
                    else:
                        for ride_service_qs in rideservice:
                            if ride_service_qs['rideservice_id'] == int(ride_service_id):
                                price = ride_service_qs["priceperkm"] * distance
                                ride_service_name = ride_service_qs["rideservice_name"]
                            else:
                                pass
                                
                    data = {
                        "ride_id": ride_id,
                        "ride_service": ride_service_name,
                        "price": price,
                        "distance": distance,
                        "estimated_arrival_time": estimated_arrival_time
                    }
                            
                    return Response(data, status=status.HTTP_200_OK)
                            
class AddRideAPIView(APIView):
    def post(self, request):
        serializer = AddRideSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        start_location = serializer.validated_data["start_location"]
        end_location =  serializer.validated_data["end_location"]
        ride_service =  serializer.validated_data["ride_service"]
        estimated_arrival_time = serializer.validated_data["estimated_arrival_time"]
        try:
            ride_service = int(ride_service)
        except ValueError:
            return Response({"ride_service": "you must pass in a valid ride name eg Bolt, Uber, Taxify"}, status=status.HTTP_400_BAD_REQUEST)
        print(start_location, end_location, ride_service, estimated_arrival_time)
        start_lon = float(start_location.split(",")[0])
        start_lat = float(start_location.split(",")[1])
    
        end_lon = float(end_location.split(",")[0])
        end_lat = float(end_location.split(",")[1])
        
        print(start_lon, start_lat, end_lon, end_lat)
        ride_len = json.loads((Path(__file__).parent / 'rides.json').read_text())
        ride = Path(__file__).parent / 'rides.json'
        print(ride)
        location = json.loads((Path(__file__).parent / 'locations.json').read_text())
                    
        for loc_qs in location:
            if loc_qs["start_coord_long"]==start_lon and loc_qs["start_coord_lat"]==start_lat and loc_qs["destination_coord_long"]==end_lon and loc_qs["destination_coord_lat"]==end_lat:
                entry = ({
                        "ride_id": int(len(ride_len)+1),
                        "location_id": int(loc_qs["location_id"]),
                        "rideservice_id": int(ride_service),
                        "estimated_arrival_time": f"{estimated_arrival_time}"
                    })
                with open(ride, "r+") as ride:
                    data = json.load(ride)
                    data.append(entry)
                    ride.seek(0)
                    json.dump(data, ride, indent = 4)
                    
                return Response({"message": "ride created successfully"}, status=status.HTTP_201_CREATED)
        return Response({"message": "error adding the ride to the database"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class UpdateRideAPIView(APIView):
    def put(self, request):
        try:
            ride_id = request.query_params["ride_id"]
        except MultiValueDictKeyError:
            return Response(
                {
                    "status": False,
                    "param": "you must pass in ride_id"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        if ride_id == "": return Response({"ride_id": "must pass in an integer number"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = AddRideSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        start_location = serializer.validated_data["start_location"]
        end_location =  serializer.validated_data["end_location"]
        ride_service =  serializer.validated_data["ride_service"]
        estimated_arrival_time = serializer.validated_data["estimated_arrival_time"]
        try:
            ride_service = int(ride_service)
        except ValueError:
            return Response({"ride_service": "you must pass in a valid ride name eg Bolt, Uber, Taxify"}, status=status.HTTP_400_BAD_REQUEST)
        start_lon = float(start_location.split(",")[0])
        start_lat = float(start_location.split(",")[1])
    
        end_lon = float(end_location.split(",")[0])
        end_lat = float(end_location.split(",")[1])
        
        ride = json.loads((Path(__file__).parent / 'rides.json').read_text())
        location = json.loads((Path(__file__).parent / 'locations.json').read_text())
        if not any(ride_qs['ride_id'] == int(ride_id) for ride_qs in ride):
            return Response(
                {
                    "status": False,
                    "message": "ride_id could not be found"
                },
                status=status.HTTP_404_NOT_FOUND,
                )
        else:
            for ride_qs in ride:
                if ride_qs["ride_id"] == int(ride_id):
                    print(ride_qs["ride_id"])
                    for loc_qs in location:
                        if loc_qs["start_coord_long"]==start_lon and loc_qs["start_coord_lat"]==start_lat and loc_qs["destination_coord_long"]==end_lon and loc_qs["destination_coord_lat"]==end_lat:
                            print(ride_qs["location_id"])
                            ride_qs["location_id"]=loc_qs["location_id"]
                            ride_qs["rideservice_id"]=ride_service
                            ride_qs["estimated_arrival_time"]=f"{estimated_arrival_time}"
                    
                            open(Path(__file__).parent / 'rides.json', "w").write(
                                json.dumps(ride, indent=4, separators=(',', ': '))
                            )
                            return Response({"message": "ride updated successfully"}, status=status.HTTP_200_OK)
                        else:
                            pass
        return Response({"message": "error updating the ride to the database"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class DeleteRideAPIView(APIView):
    def delete(self, request):
        try:
            ride_id = request.query_params["ride_id"]
        except MultiValueDictKeyError:
            return Response(
                {
                    "status": False,
                    "param": "you must pass in ride_id"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        ride_len = json.loads((Path(__file__).parent / 'rides.json').read_text())
        
        if ride_id == "": return Response({"ride_id": "must pass in an integer number"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if not any(ride_qs['ride_id'] == int(ride_id) for ride_qs in ride_len):
            return Response(
                {
                    "status": False,
                    "message": "ride_id could not be found"
                },
                status=status.HTTP_404_NOT_FOUND,
                )
        else:
            ride = json.load(open(Path(__file__).parent / 'rides.json'))
            for ride_qs in range(len(ride)):
                if ride[ride_qs]["ride_id"] == int(ride_id):
                    
                    ride.pop(ride_qs)
            
                    open(Path(__file__).parent / 'rides.json', "w").write(
                        json.dumps(ride, indent=4, separators=(',', ': '))
                    )
                    return Response({"message": "ride deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
                else:
                    pass
        return Response({"message": "error deleting the ride to the database"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
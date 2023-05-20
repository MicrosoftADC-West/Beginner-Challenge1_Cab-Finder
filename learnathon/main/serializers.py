from rest_framework import serializers
import math   
import json
from pathlib import Path

class AddRideSerializer(serializers.Serializer):
    start_location = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    end_location = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    ride_service = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    estimated_arrival_time = serializers.DateTimeField(required=True, allow_null=False)
    
    def validate(self, values):
        rideservice = json.loads((Path(__file__).parent / 'rideservices.json').read_text())
        if not rideservice:
            raise serializers.ValidationError({"rideservice":"no rideservice found"})
        else:
            ride = []
            for i in rideservice:
                try:
                    home = int(values["ride_service"])
                        
                except ValueError:
                    if i["rideservice_name"].lower() == values["ride_service"].lower():
                        values["ride_service"] = f"{i['rideservice_id']}"
                        ride.append(i['rideservice_id'])
                    else:
                        pass
                        # raise serializers.ValidationError({"ride_service":"you must pass in a valid ride name eg Bolt, Uber, Taxify"})
            print(ride)
            if ride == [] or ride == None:
                raise serializers.ValidationError({"ride_service":"you must pass in a valid ride name eg Bolt, Uber, Taxify"})
            else:
                values["ride_service"]= ride[0]
        try:
            start_location = values["start_location"]
            start_lon = float(start_location.split(",")[0])
            start_lat = float(start_location.split(",")[1])
        except IndexError: 
            raise serializers.ValidationError({"start_location":"pass in the long and lat separated with a comma eg. 6.123, 3.123"})
        try:
            end_location = values["end_location"]
            end_lon = float(end_location.split(",")[0])
            end_lat = float(end_location.split(",")[1])
        except IndexError:
            raise serializers.ValidationError({"end_location":"pass in the long and lat separated with a comma eg. 6.123, 3.123"})

        if values["estimated_arrival_time"] == "" or values["estimated_arrival_time"] == None:
            raise serializers.ValidationError({"estimated_arrival_time":"you must pass in a valid date"})
            
        return values
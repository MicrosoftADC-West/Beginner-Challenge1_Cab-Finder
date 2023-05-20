import math
def get_distance(lat1,lon1,lat2,lon2):
    R = 6371; # Radius of the earth in km
    dLat = deg2rad(lat2-lat1) # deg2rad below
    dLon = deg2rad(lon2-lon1) 
    a = math.sin(dLat/2) * math.sin(dLat/2) + math.cos(deg2rad(lat1)) * math.cos(deg2rad(lat2)) * math.sin(dLon/2) * math.sin(dLon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a)); 
    d = R * c; # Distance in km
    return d;


def deg2rad(deg):
  return deg * (math.pi/180)


class CarBooking:
    
    
    def all_rides(routes, ride_services, booked_rides):
        if routes ==[] or ride_services==[] or booked_rides==[]:
            all_rides = []
            return all_rides
        else:
            all_rides = []
            for ride in booked_rides:
                location_id = ride["location_id"]
                ride_service_id = ride["rideservice_id"]
                
                #check if location_id exists is False
                if not any(loc_qs['location_id'] == int(location_id) for loc_qs in routes):
                    continue
                #location_id exists is True
                else:
                    for loc_qs in routes:
                        if loc_qs['location_id'] == int(location_id):
                            start_lon = float(loc_qs["start_coord_long"])
                            start_lat = float(loc_qs["start_coord_lat"])
                            end_lon = float(loc_qs["destination_coord_long"])
                            end_lat = float(loc_qs["destination_coord_lat"])
                            distance = get_distance(start_lon, start_lat, end_lon, end_lat)
                        else:
                            pass
                #check if ride_service_id exists is False
                if not any(ride_service_qs['rideservice_id'] == int(ride_service_id) for ride_service_qs in ride_services):
                    continue
                #ride_service_id exists is True
                else:
                    for ride_service_qs in ride_services:
                        if ride_service_qs['rideservice_id'] == int(ride_service_id):
                            price = ride_service_qs["priceperkm"] * distance
                            ride_service_name = ride_service_qs["rideservice_name"]
                        else:
                            pass
                            
                data = {
                    "ride_service": ride_service_name,
                    "price": price,
                    "distance": distance,
                }
                all_rides.append(data)
            return all_rides
        
    def best_prices(routes, ride_services, booked_rides):
        all_rides = CarBooking.all_rides(routes, ride_services, booked_rides)
        print(all_rides)
        if all_rides is None:
            return {}
        if len(all_rides) == 0:
            return {}
        elif len(all_rides) == 1:
            return all_rides[0]
        elif len(all_rides) > 1:
            print(">>>>>>>>>>.")
            temp = all_rides[0]["price"]/all_rides[0]["distance"]
            data = {}
            for ride in all_rides:
                best = ride["price"] / ride["distance"]
                print(best, temp)
                if best == temp:
                    temp = best
                    data = ride
                elif best < temp:
                    temp = best
                    data = ride
            return data
        else:
            return {}
        

if __name__ == "__main__":
    all_booking = CarBooking.all_rides([], [], [])
    print(all_booking)
    best_price = CarBooking.best_prices([], [], [])
    print(best_price)
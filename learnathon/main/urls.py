from audioop import add
from django.urls import path
from main.views import GetAllRidesAPIView, GetRideByIdAPIView, AddRideAPIView, UpdateRideAPIView, DeleteRideAPIView



urlpatterns = [
    # path('register/', register, name="register"),
    # path('get_all_coins/', get_all_coins, name="get_all_coins"),
    # path('add_favourite/', add_favorite, name="add_favourite"),
    path('all_rides/', GetAllRidesAPIView.as_view(), name=''),
    path('single_ride/', GetRideByIdAPIView.as_view(), name=''),
    path('add_ride/',  AddRideAPIView.as_view(), name=''),
    path('update_ride/',  UpdateRideAPIView.as_view(), name=''),
    path('delete_ride/',  DeleteRideAPIView.as_view(), name='')
]
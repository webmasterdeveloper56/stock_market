from django.contrib import admin
from django.urls import path
from simulator.views import userRegisterView, userLoginView, userOrdersView, userHistoryView, getSellsView, getBuysView, getHistoryView, setOrdersView, getStocksView,deleteOrder, matching
urlpatterns = [
    path('admin/', admin.site.urls),
    path("getBuys/", getBuysView, name="get_buys"),
    path("userRegister/", userRegisterView, name="user_register"),
    path("userLogin/", userLoginView, name="user_login"),
    path("userOrders/", userOrdersView, name="user_orders"),
    path("userHistory/", userHistoryView, name="user_history"),
    path("getSells/", getSellsView, name="get_sells"),
    path("getBuys/", getBuysView, name="get_buys"),
    path("getHistory/", getHistoryView, name="get_history"),
    path("setOrders/", setOrdersView, name="set_orders"),
    path("getStocks/", getStocksView, name="get_stocks"),
    path("deleteOrder/", deleteOrder, name="delete_order"),
    path("matching/", matching, name="matching_order"),
]

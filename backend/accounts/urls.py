# backend/accounts/urls.py
from django.urls import path
from .views import RegisterView, LoginView, home

urlpatterns = [
    path('', home, name='home'),  # This will route to the home view
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]

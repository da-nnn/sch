from django.urls import path
from . import views

urlpatterns = [
    path('scrape/scholarships/', views.ScraperAPIView.as_view(), name='scrape-scholarships'),
]
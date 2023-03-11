from django.urls import path

from . import views
app_name = "reaction"
urlpatterns = [
    path('', views.main, name='main'),
    path('next/', views.next, name='next'),
    path('retry/', views.retry, name="retry")
]
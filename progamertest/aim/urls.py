from django.urls import path

from . import views
app_name = "aim"
urlpatterns = [
    path('', views.main, name="main"),
    path('next/', views.next, name='next'),
    path('retry/', views.retry, name="retry")
]
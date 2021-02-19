from django.urls import path
from rest_framework import routers
from .views import DataViewSet

router = routers.DefaultRouter()

router.register('', DataViewSet, 'data')

urlpatterns = router.urls

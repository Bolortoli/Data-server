from django.shortcuts import render
from rest_framework import serializers
from .models import Data
from rest_framework import viewsets, permissions, generics
# Create your views here.


class DataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Data
        fields = ('__all__')


class DataViewSet(viewsets.ModelViewSet):

    queryset = Data.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DataSerializer
    http_method_names = ['get', 'post']

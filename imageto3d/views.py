
from rest_framework import viewsets
from rest_framework.views import APIView
from .models import *
from rest_framework.authentication import (
    BasicAuthentication,
    SessionAuthentication
)
from rest_framework.response import Response


class Imageto3dViewset(viewsets.ViewSet):
    queryset = Imageto3d.objects.all()
    serializer_class = Imageto3dSerializer
    permission_classes = (BasicAuthentication, SessionAuthentication)
    http_method_names = ['post', 'patch', 'delete']

    def create(self, request, *args, **kwargs):
        """
        Override the method to create the image 3d model and upload it
        to the azure server
        """
        super().create(request, *args, **kwargs)

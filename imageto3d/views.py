
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import permissions
from .models import *
from .serializers import *
from rest_framework.authentication import (
    BasicAuthentication,
    SessionAuthentication
)
from rest_framework.response import Response


def home_page(request):
    return render(request, 'index.html')


class Imageto3dViewset(viewsets.ModelViewSet):
    queryset = Imageto3d.objects.all()
    serializer_class = Imageto3dSerializer
    authentication_classes = (BasicAuthentication, SessionAuthentication)
    http_method_names = ['post', 'patch', 'delete']

    def create(self, request, *args, **kwargs):
        """
        Override the method to create the image 3d model and upload it
        to the azure server
        """
        domain_name = request.data["web_domain"].split(".")[0]
        if request.data["web_domain"] == "flipkart.com":
            modified_img_url = request.data["image_url"].split("/")
            del modified_img_url[5]
            del modified_img_url[5]
            request.data["image_url"] = " ".join(modified_img_url)
        elif not domain_name in self.request.user.username:
            return Response(status=403)
        request.data["created_by"] = self.request.user.id
        return super().create(request, *args, **kwargs)

class Imageto3dAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        """
        Override the method to return the image url
        """
        if request.data["web_domain"] == "flipkart.com":
            modified_img_url = request.data["image_url"].split("/")
            del modified_img_url[5]
            del modified_img_url[5]
        img_3d_obj = Imageto3d.objects.filter(image_url=request.data["image_url"],
                                              web_domain=request.data["web_domain"])
        if img_3d_obj:
            serializer = self.serializer_class(img_3d_obj.first())
            return Response(serializer.data)
        else:
            return Response({"Message": "No image found"})

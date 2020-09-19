
from django.urls import path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r"imageto3d", Imageto3dViewset)
urlpatterns = router.urls + [
    path('get_image_3d/', Imageto3dAPI.as_view())
]

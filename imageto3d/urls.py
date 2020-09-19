
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"imageto3d", Imageto3dViewset)
urlpatterns = router.urls

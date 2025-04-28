from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, ContactFormView

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/contact/', ContactFormView.as_view(), name='contact-form'),  
]
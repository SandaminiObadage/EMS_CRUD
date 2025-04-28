from django.shortcuts import render
from rest_framework import viewsets
from .models import Employee, ContactMessage
from .serializers import EmployeeSerializer, ContactMessageSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class ContactFormView(APIView):
    def post(self, request):
        # Extract data from the request
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

         #Save the data to the database
        contact_message = ContactMessage.objects.create(
            name=name,
            email=email,
            message=message
        )

        
        print(f"Contact Form Submission: Name={name}, Email={email}, Message={message}")

        
        return Response({"message": "Contact form submitted successfully!"}, status=status.HTTP_200_OK)
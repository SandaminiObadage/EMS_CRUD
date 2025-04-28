from django.db import models


class Employee(models.Model):
    name=models.CharField(max_length=100)
    department=models.CharField(max_length=100)
    role=models.CharField(max_length=100)


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


from django.db import models
import uuid
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from .managers import UserManager
# Create your models here.

class User(AbstractBaseUser,PermissionsMixin):
    id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    email=models.EmailField(unique=True)
    full_name=models.CharField(max_length=150)
    phone=models.CharField(max_length=20,blank=True,null=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["full_name"]

    objects=UserManager()


    def __str__(self):
        return self.email
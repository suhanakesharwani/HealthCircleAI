from django.urls import path

from .views import (
    CurrentUserView,
    RegisterView,
    LoginView,
    RefreshView,
    CurrentUserView,
    LogoutView
)

urlpatterns=[
    path("register/",RegisterView.as_view()),
     path("login/",LoginView.as_view()),
      path("refresh/",RefreshView.as_view()),
       path("logout/",LogoutView.as_view()),
        path("me/",CurrentUserView.as_view()),

]
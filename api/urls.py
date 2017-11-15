from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    url(r'^trip/insert',views.tripInsert, name='tripInsert'),
    url(r'^trip/delete',views.tripDelete, name='tripDelete'),
    url(r'^trip/update',views.tripUpdate, name='tripUpdate'),
    url(r'^$', views.api, name='api'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    url(r'^trip/insert', views.tripInsert, name='tripInsert'),
    url(r'^trip/delete', views.tripDelete, name='tripDelete'),
    url(r'^trip/update', views.tripUpdate, name='tripUpdate'),
    url(r'^trip/query', views.tripQuery, name='tripQuery'),
    url(r'^business/scope', views.queryBusinessWithinScope, name='businessScope'),
    url(r'^business/preview', views.queryBusinessPreview, name='businessPreview'),
    url(r'^business/detail', views.queryBusinessDetails, name='businessDetail'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from django.http import JsonResponse
from api.models import Business, Category, Hours
from api.models import Trips
from django.core import serializers
import json

def tripUpdateById(request):
    paras = request.GET
    trips = Trips.objects.filter(tripId=paras['tripId'], userId=paras['userId'])
    trip = trips[0]
    trip.business_id = str(paras['business_id'])
    business_name = Business.objects.filter(id=trip.business_id)[0]
    trip.business_name = business_name.name
    trip.save(force_update=True)
    return HttpResponse("Update Success")
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from django.http import JsonResponse
from api.models import Business, Category, Hours
from api.models import Trips
from django.core import serializers
import json
# Create your views here.


def queryBusinessWithinScope(request):
    paras = request.GET

    min_latitude = float(paras['south'])
    max_latitude = float(paras['north'])
    min_longitude = float(paras['west'])
    max_longitude = float(paras['east'])
    response = Business.objects.filter(longitude__gte=min_longitude, latitude__lte=max_latitude, latitude__gte=min_latitude, longitude__lte=max_longitude)
    response = serializers.serialize("json", response)
    return HttpResponse(response, content_type='application/json')


def queryBusinessPreview(request):
    paras = request.GET

    id = paras['id']
    business = Business.objects.filter(id=id)
    category = Category.objects.filter(business=business)
    hour = Hours.objects.filter(business=business)

    business = serializers.serialize('json', business.all())
    category = serializers.serialize('json', category.all(), fields=('category', ))
    hour = serializers.serialize('json', hour.all(), fields=('hours', ))

    response = {'Business': business, 'Category': category, 'Hour': hour}
    print(response)
    return HttpResponse(json.dumps(response), content_type='application/json')

def queryBusinessDetails(request):

    return

def tripInsert(request):
    paras = request.GET
    trip = Trips()
    trip.tripId = paras['tripId']
    trip.userId = paras['userId']
    trip.save()
    return HttpResponse("Insert Success")

def tripDelete(request):
    paras = request.GET
    trip = Trips.objects.filter(tripId=paras['tripId'], userId=paras['userId'] )
    trip.delete()
    return HttpResponse("Delete Success")

def tripUpdate(request):
    paras = request.GET
    trips = Trips.objects.filter(tripId=paras['tripId'], userId=paras['userId'])
    trip = trips[0]
    trip.business_name = str(paras['business_name'])
    trip.save(force_update=True)
    return HttpResponse("Update Success")

def tripQuery(request):
    paras = request.GET
    userId = paras['userId']
    trips = Trips.objects.filter(userId= userId)
    #trips = sorted(trips, )
    res  = []
    for trip in trips:
        dic = {}
        dic['tripId'] = int(trip.tripId)
        dic['business_name'] = str(trip.business_name)
        if dic['business_name'] == "None":
            dic['business_name']=""
        dic['business_id'] = str(trip.business_id)
        if dic['business_id'] == "None":
            dic['business_id']=""
        res.append(dic)
    return JsonResponse(res, safe = False)
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from api.models import Business
import json

# Create your views here.


def api(request):
    if (request.method == 'GET'):
        paras = request.GET
        #return queryBusiness()
        print(request.__str__())
        print(paras.__str__())
        return queryBusinessLocation(paras['south'],paras['north'], paras['west'], paras['east'])
        return JsonResponse(result)
    return HttpResponse("NOT GET")
    return HttpResponse("Hello, world. You're at the polls index.")


def toString(name):
    try:
        res = str(name)
        return res
    except:
        return ""
def coordToString(latitude,longitude):
    res = str(latitude)+","+str(longitude) 
    return res


def queryBusinessLocation(min_latitude,max_latitude,min_longitude,max_longitude):
    min_latitude = float(min_latitude)
    max_latitude = float(max_latitude)
    min_longitude = float(min_longitude)
    max_longitude = float(max_longitude)
    business = Business.objects.filter(longitude__gte = min_longitude,latitude__lte = max_latitude,latitude__gte=min_latitude , longitude__lte = max_longitude )

    dictionaries = [obj.as_dict() for obj in business.all()]
    return JsonResponse(dictionaries, safe=False)


def queryBusiness():
    allBusiness= Business.objects.filter(name__icontains="chinese")#[:10000]
    num = len(allBusiness)
    names = [toString(obj.name) for obj in allBusiness]
    coords = [coordToString(obj.latitude,obj.longitude) for obj in allBusiness ]
    result = {"Number of business":num, "all names": names, "coords":coords}
    return JsonResponse(result, safe=False)

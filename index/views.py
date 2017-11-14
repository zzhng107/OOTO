# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def index(request):
    with open("/home/txu25/project/frontend/index.html") as f:
        html = f.read()
    return HttpResponse(html)
    return HttpResponse("Hello, world. You're at the polls index.")
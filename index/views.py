# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import Context, loader

# Create your views here.


def index(request):
    return render_to_response('main_page.html')

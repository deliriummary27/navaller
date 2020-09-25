from django.shortcuts import render
from django.views.generic import View
from django.conf import settings
from django.http import HttpResponse
import logging
import urllib.request
import os

class FrontendAppView(View):

    def get(self, request):
            print (os.path.join(settings.BASE_DIR, 'build', 'index.html'))
            try:
                with open(os.path.join(settings.BASE_DIR, 'build', 'index.html')) as f:
                    return HttpResponse(f.read())
            except FileNotFoundError:
                logging.exception('Production build of app not found')
                return HttpResponse(
                    """
                    This URL is only used when you have built the production
                    version of the app. Visit http://localhost:3000/ instead, or
                    run `yarn run build` to test the production version.
                    """,
                    status=501,
                )

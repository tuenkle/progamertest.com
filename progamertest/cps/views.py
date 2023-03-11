from django.shortcuts import render
from django.http import HttpResponse
from .forms import CpsForm
from django.http import Http404
from .models import CpsResult
from django.shortcuts import redirect
# Create your views here.
def main(request):
    cps_form = CpsForm()
    return render(request, "cps/main.html", {"form": cps_form})

def retry(request):
    if request.method == "POST":
        cps_result = request.POST["cps_result"]
        if cps_result.isdecimal():
            cps_result = int(cps_result)
            if 10 < cps_result < 100:
                new_cps_result = CpsResult(
                    cps_result=cps_result
                )
                new_cps_result.save()
    return redirect("cps:main")

def next(request):
    if request.method == "POST":
        cps_result = request.POST["cps_result"]
        if cps_result.isdecimal():
            cps_result = int(cps_result)
            if 0 < cps_result < 10000:
                cps_result_list = request.session.get("cps_result")
                if cps_result_list is None:
                    cps_result_list = []
                cps_result_list.append(cps_result)
                request.session["cps_result"] = cps_result_list
                if 10 < cps_result < 100:
                    new_cps_result = CpsResult(
                        cps_result=cps_result
                    )
                    new_cps_result.save()
    return redirect("dashboard:main")
from django.shortcuts import render
from django.http import HttpResponse
from .forms import AimForm
from django.http import Http404
from .models import AimResult
from django.shortcuts import redirect
# Create your views here.
def main(request):
    aim_form = AimForm()
    return render(request, "aim/main.html", {"form": aim_form})

def retry(request):
    if request.method == "POST":
        aim_result = request.POST["aim_result"]
        request.session["aim_result"] = aim_result
        new_aim_result = AimResult(
            aim_result=aim_result
        )
        new_aim_result.save()
        return redirect("aim:main")
    raise Http404("Error")

def next(request):
    if request.method == "POST":
        aim_result = request.POST["aim_result"]
        request.session["aim_result"] = aim_result
        new_aim_result = AimResult(
            aim_result=aim_result
        )
        new_aim_result.save()
        return redirect("cps:main")
    raise Http404("Error")
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
        if aim_result.isdecimal():
            aim_result = int(aim_result)
            if 100 < aim_result < 1000:
                new_aim_result = AimResult(
                    aim_result=aim_result
                )
                new_aim_result.save()
    return redirect("aim:main")
def next(request):
    if request.method == "POST":
        aim_result = request.POST["aim_result"]
        if aim_result.isdecimal():
            aim_result = int(aim_result)
            if 0 < aim_result < 10000:
                aim_result_list = request.session.get("aim_result")
                if aim_result_list is None:
                    aim_result_list = []
                aim_result_list.append(aim_result)
                request.session["aim_result"] = aim_result_list
                if 100 < aim_result < 1000:
                    new_aim_result = AimResult(
                        aim_result=aim_result
                    )
                    new_aim_result.save()
    return redirect("dashboard:main")
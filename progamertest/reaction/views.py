from django.shortcuts import render
from django.http import HttpResponse
from .forms import ReactionResultForm
from django.http import Http404
from .models import ReactionResult
from django.shortcuts import redirect
# Create your views here.
def main(request):
    reaction_result_form = ReactionResultForm()
    return render(request, "reaction/main.html", {"form": reaction_result_form})

def retry(request):
    if request.method == "POST":
        reaction_result = request.POST["reaction_result"]
        if reaction_result.isdecimal():
            reaction_result = int(reaction_result)
            if 100 < reaction_result < 1000:
                new_reaction_result = ReactionResult(
                    reaction_result=reaction_result
                )
                new_reaction_result.save()
    return redirect("reaction:main")
def next(request):
    if request.method == "POST":
        reaction_result = request.POST["reaction_result"]
        if reaction_result.isdecimal():
            reaction_result = int(reaction_result)
            if 0 < reaction_result < 10000:
                reaction_result_list = request.session.get("reaction_result")
                if reaction_result_list is None:
                    reaction_result_list = []
                reaction_result_list.append(reaction_result)
                request.session["reaction_result"] = reaction_result_list
                if 100 < reaction_result < 1000:
                    new_reaction_result = ReactionResult(
                        reaction_result=reaction_result
                    )
                    new_reaction_result.save()
    return redirect("dashboard:main")
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
        request.session["reaction_result"] = reaction_result
        new_reaction_result = ReactionResult(
            reaction_result=reaction_result
        )
        new_reaction_result.save()
        return redirect("reaction:main")
    raise Http404("Error")

def next(request):
    if request.method == "POST":
        reaction_result = request.POST["reaction_result"]
        request.session["reaction_result"] = reaction_result
        new_reaction_result = ReactionResult(
            reaction_result=reaction_result
        )
        new_reaction_result.save()
        return redirect("aim:main")
    raise Http404("Error")
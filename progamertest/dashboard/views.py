from django.shortcuts import render

# Create your views here.
def main(request):
    reaction_result = request.session.get("reaction_result", "?")
    aim_result = request.session.get("aim_result", "?")
    cps_result = request.session.get("cps_result", "?")
    return render(request, "dashboard/main.html", {"reaction_result": reaction_result, "aim_result": aim_result, "cps_result": cps_result})
from django.shortcuts import render
from reaction.models import ReactionResult
from aim.models import AimResult
from cps.models import CpsResult
# Create your views here.
def main(request):
    reaction_result_list = request.session.get("reaction_result")
    reaction_result = "?"
    reaction_percentile = "?"
    if reaction_result_list:
        if type(reaction_result_list[-1]) is int:
            reaction_result = reaction_result_list[-1]
            better_count = 0
            worse_count = 0
            for i in ReactionResult.objects.all():
                if i.reaction_result >= reaction_result:
                    worse_count += 1
                else:
                    better_count += 1
            reaction_percentile = round(better_count/(worse_count+better_count)*100, 1)

    aim_result_list = request.session.get("aim_result")
    aim_result = "?"
    aim_percentile = "?"
    if aim_result_list:
        if type(aim_result_list[-1]) is int:
            aim_result = aim_result_list[-1]
            better_count = 0
            worse_count = 0
            for i in AimResult.objects.all():
                if i.aim_result >= aim_result:
                    worse_count += 1
                else:
                    better_count += 1
            aim_percentile = round(better_count/(worse_count+better_count)*100, 1)

    cps_result_list = request.session.get("cps_result")
    cps_result = "?"
    cps_percentile = "?"
    if cps_result_list:
        if type(cps_result_list[-1]) is int:
            cps_result = cps_result_list[-1]
            better_count = 0
            worse_count = 0
            for i in CpsResult.objects.all():
                if i.cps_result >= cps_result:
                    worse_count += 1
                else:
                    better_count += 1
            cps_result = round(cps_result / 5, 1)
            cps_percentile = round(better_count / (worse_count + better_count) * 100, 1)
    average_percentile = "?"
    return render(request, "dashboard/main.html", {"reaction_result": reaction_result,
                                                   "aim_result": aim_result,
                                                   "cps_result": cps_result,
                                                   "reaction_percentile" : reaction_percentile,
                                                   "aim_percentile": aim_percentile,
                                                   "cps_percentile": cps_percentile,
                                                   "average_percentile": average_percentile})
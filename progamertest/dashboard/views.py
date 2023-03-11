from django.shortcuts import render
from reaction.models import ReactionResult
from aim.models import AimResult
from cps.models import CpsResult
# Create your views here.
def main(request):
    reaction_result_list = request.session.get("reaction_result")
    print(reaction_result_list)
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
            print(worse_count)
            print(better_count)
            reaction_percentile = round(better_count/(worse_count+better_count)*100, 1)
    aim_result = request.session.get("aim_result", "?")

    if not aim_result.isdigit():
        aim_percentile = "?"
    else:
        aim_result = int(aim_result)
        better_count = 0
        worse_count = 0
        for i in AimResult.objects.all():
            if i.aim_result <= aim_result:
                worse_count += 1
            else:
                better_count += 1
        print(worse_count)
        print(better_count)
        aim_percentile = round(better_count / (worse_count + better_count) * 100, 1)

    cps_result = request.session.get("cps_result", "?")
    if not cps_result.isdigit():
        cps_percentile = "?"
    else:
        cps_result = float(cps_result)
        better_count = 0
        worse_count = 0
        for i in CpsResult.objects.all():
            if i.cps_result <= cps_result:
                worse_count += 1
            else:
                better_count += 1
        print(worse_count)
        print(better_count)
        cps_percentile = round(better_count / (worse_count + better_count) * 100, 1)
    average_percentile = "?"
    return render(request, "dashboard/main.html", {"reaction_result": reaction_result,
                                                   "aim_result": aim_result,
                                                   "cps_result": cps_result,
                                                   "reaction_percentile" : reaction_percentile,
                                                   "aim_percentile": aim_percentile,
                                                   "cps_percentile": cps_percentile,
                                                   "average_percentile": average_percentile})
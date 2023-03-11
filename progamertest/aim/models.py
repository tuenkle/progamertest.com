from django.db import models

# Create your models here.
class AimResult(models.Model):
    aim_result = models.IntegerField()
    executed_time = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.aim_result}"

from django.db import models

# Create your models here.
class ReactionResult(models.Model):
    reaction_result = models.IntegerField()
    executed_time = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.reaction_result}ms"

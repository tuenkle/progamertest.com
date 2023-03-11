from django import forms
from .models import AimResult
class AimForm(forms.Form):
    aim_result = forms.IntegerField(widget=forms.HiddenInput())
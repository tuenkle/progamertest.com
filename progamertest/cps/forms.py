from django import forms
from .models import CpsResult
class CpsForm(forms.Form):
    cps_result = forms.FloatField(widget=forms.HiddenInput())
from django import forms
from .models import CpsResult
class CpsForm(forms.Form):
    cps_result = forms.IntegerField(widget=forms.HiddenInput())
from django import forms
from .models import ReactionResult
class ReactionResultForm(forms.Form):
    reaction_result = forms.IntegerField(widget=forms.HiddenInput())
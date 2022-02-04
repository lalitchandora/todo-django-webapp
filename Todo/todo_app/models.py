from django.db import models
from django.forms import DateTimeField

class Todo(models.Model):
    text = models.CharField(max_length=300)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text;
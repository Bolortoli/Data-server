from django.db import models


class Data(models.Model):
    data = models.CharField(max_length=255, default="")
    date = models.DateTimeField(auto_now_add=True)

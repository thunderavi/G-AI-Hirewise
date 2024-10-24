from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=100)
    skills = models.CharField(max_length=255)
    description = models.TextField()
    apply_link = models.URLField()

    def __str__(self):
        return self.title

from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'skills', 'apply_link')  # Columns to display in the admin list view
    search_fields = ('title', 'skills')  # Fields to search by in the admin interface
    list_filter = ('skills',)  # Filter options in the admin list view

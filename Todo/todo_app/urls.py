from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.todo_list, name='todolist'),   
    path('create/', views.todo_create, name='todoCreate'),
    path('delete/<int:pk>', views.todo_delete, name="todoUpdate")
]

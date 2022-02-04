from django.shortcuts import render, redirect
from .models import Todo
from .serializers import TodoSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def todo_list(request):
    if request.method == "GET":
        notes = Todo.objects.order_by('-created_date')
        serializer = TodoSerializer(notes, many=True)
        print(notes)
        return Response(serializer.data)

@api_view(['POST'])
def todo_create(request):
    if request.method == "POST":
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        return Response(request.data)

@api_view(['POST'])
def todo_delete(request, pk):
    todo = None
    try:
        todo = Todo.objects.get(id=pk)
    except Todo.DoesNotExist:
        return Response("Item not found")
    
    todo.delete()
    return Response("item deleted")

from rest_framework.permissions import BasePermission, SAFE_METHODS
from guardian.shortcuts import get_perms

class IsAdminUserOrReadOnly(BasePermission):
    """
    Allows read operations for anyone, write operations if the user is staff
    """

    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and
            request.user.is_staff
        )

class CanViewCarrera(BasePermission):
    def has_object_permission(self, request, view, obj):
        print(get_perms(request.user, obj))
        return bool('ver_carrera' in get_perms(request.user, obj))
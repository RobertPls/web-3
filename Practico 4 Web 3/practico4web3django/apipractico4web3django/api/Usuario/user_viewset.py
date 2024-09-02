from django.shortcuts import get_object_or_404
from rest_framework import serializers, viewsets, status
from django.contrib.auth.models import User
from rest_framework.decorators import permission_classes, api_view, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from apipractico4web3django.api import UserSimpleSerializer


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data.get('username'),
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name')
        )
        user.set_password(validated_data.get('password'))
        user.save()
        return user


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @permission_classes((AllowAny,))
    def create(self, request, *args, **kwargs):
        user_serializer = UserSerializer(data=request.data)

        if not user_serializer.is_valid():
            return Response({"success": False, "data": user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        user_serializer.save()
        return Response({"success": True, "data": user_serializer.data})

    @permission_classes((IsAuthenticated,))
    def retrieve(self, request, *args, **kwargs):
        print(request.user.pk)
        obj_user = get_object_or_404(User, pk=request.user.pk)
        user_serializer = UserSerializer(obj_user)
        return Response(user_serializer.data)

    @permission_classes((IsAuthenticated,))
    def update(self, request, *args, **kwargs):
        obj_user = get_object_or_404(User, pk=request.user.pk)
        user_serializer = UserSerializer(instance=obj_user, data=request.data, partial=True)

        if not user_serializer.is_valid():
            return Response({"success": False, "data": user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        user_serializer.save()
        return Response({"success": True, "data": user_serializer.data})

    @permission_classes((IsAuthenticated,))
    def destroy(self, request, *args, **kwargs):
        obj_user = get_object_or_404(User, pk=request.user.pk)
        obj_user.delete()
        return Response({'success': True})

    @permission_classes((IsAuthenticated,))
    def list(self, request, *args, **kwargs):
        lista_usuarios = User.objects.all()
        user_serializer = UserSimpleSerializer(lista_usuarios, many=True)
        return Response({"success": True, "data": user_serializer.data})

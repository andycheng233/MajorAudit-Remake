import requests
from django.dispatch import receiver
from django_cas_ng.signals import cas_user_authenticated
from .models import CustomUser
from django.conf import settings


@receiver(cas_user_authenticated)
def update_user_from_yalies(sender, **kwargs):
    user = kwargs['user']

    try:
        headers = {"Authorization": f"Bearer {settings.YALIES_API_KEY}"}
        body = {"query": user.username}
        request = requests.post(
            f"{settings.YALIES_URL}people", headers=headers, json=body, timeout=10)

        request.raise_for_status()
        data = request.json()

        user.first_name = data[0].get('first_name', '')
        user.last_name = data[0].get('last_name', '')
        user.email = data[0].get('email', '')
        user.save()

    except requests.RequestException as e:
        print(f"Failed to fetch user data: {e}")

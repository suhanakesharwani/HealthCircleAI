from apps.families.models import FamilyMembership


def can_access_member(user, family_member):

    return FamilyMembership.objects.filter(
        family=family_member.family,
        user=user,
    ).exists()


def can_upload_report(user, family_member):

    membership = FamilyMembership.objects.filter(
        family=family_member.family,
        user=user,
    ).first()

    if membership is None:
        return False

    if membership.role == FamilyMembership.Role.OWNER:
        return True

    if family_member.linked_user == user:
        return True

    return False
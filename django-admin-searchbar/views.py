from django.http import JsonResponse
from django.contrib.admin.sites import site
from django.contrib.auth.decorators import login_required
from django.views.generic import View


class DjangoAdminSearchbarView(View):
    """Class-based view for `django-admin-searchbar`."""

    # List of replaced app names (if they are too long to fit in searchbar)
    replaced_app_names = {
        'Authentication and Authorization': 'Auth'
    }

    def get_app_name(self, app):
        """Shortcut to get replaced app name instead of original."""
        replaced_name = self.replaced_app_names.get(app['name'])
        return app['name'] if not replaced_name else replaced_name

    def get_formatted_app_list(self, app_list):
        """Function to get list of apps, models and urls for them.

        Args:
            app_list (list): list of all apps

        Returns:
            list: list for results ([<app_name>, <model_name>, <model_url>])

        """
        return [
            [self.get_app_name(app), model['name'], model['admin_url']]
            for app in app_list
            for model in app['models']
        ]

    def get(self, request, *args, **kwargs):
        """View to return search results.

        Note that this view supports permissions from Django Admin by default.
        For example, if staff user can see "Secret app", it won't be listed in
        search results too.

        Returns:
            JsonResponse: list of all apps, models and urls for them.

        """
        app_list = site.get_app_list(request)
        results = self.get_formatted_app_list(app_list=app_list)
        return JsonResponse(data={'search_results': results})


# Apply `login_required` to `DjangoAdminSearchbarView`
admin_searchbar_view = login_required(DjangoAdminSearchbarView.as_view())

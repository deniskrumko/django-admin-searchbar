django-admin-searchbar
======================

**django-admin-searchbar** allows to easily search for models in [Django Administration](https://docs.djangoproject.com/en/1.11/ref/contrib/admin/).

**☠️ THIS PROJECT IS NO LONGER SUPPORTED ☠️**

![alt image](http://i.imgur.com/LRivXqZ.gif)

Requires:

  * Django >=1.8 (not tested on new versions since Django >= 2)
  * Python 2.7 or >=3.3 (not tested on new versions since Python >= 3.4)

Installation
------------

All required files you can find in `django-admin-searchbar` folder.

### Add templates

Add following templates to your `templates` directory in `admin` folder:

```
templates
└── admin
    ├── base_site.html
    └── base.html
```

In case, if you have own overridden admin templates, you need to some lines to them:

**admin/base_site.html**
* Add `tabindex="-1"` to `<a href="...">` after `<h1 id="site-name">` (if you want to use TAB to open searchbar):
```html
{% block branding %}
{# Set `tabindex="-1"` to use TAB to open searchbar #}
<h1 id="site-name"><a href="{% url 'admin:index' %}" tabindex="-1">{{ site_header|default:_('Django administration') }}</a></h1>
{% endblock %}
```

**admin/base.html**
* Place this `<input>` element right after `<div id="user-tools">` line:
```html
<div id="user-tools">
    {# Django Admin Searchbar #}
    <input type="text" id="django-admin-searchbar" placeholder="Search...">
```

Also see: [How to configure template settings in Django](https://docs.djangoproject.com/en/1.11/topics/templates/#configuration)

### Add JS and CSS

Add following files to your `static` directory. For example:

```
static
├── css
│   ├── django-admin-searchbar.css
│   └── jquery.auto-complete.css
└── js
    ├── django-admin-searchbar.js
    └── jquery.auto-complete.min.js

```

Then you need to provide this JS and CSS files to `admin/base.html` template.

Template from project already have required lines. If you are using own template you need to add following lines in `<head>...</head>` section:

```html
{# JQuery #}
<script
  src="https://code.jquery.com/jquery-3.2.1.js"
  integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="
  crossorigin="anonymous"></script>
{# jQuery-autoComplete #}
<link rel="stylesheet" type="text/css" href="{% static "css/jquery.auto-complete.css" %}" />
<script src="{% static "js/jquery.auto-complete.min.js" %}"></script>
{# django-admin-searchbar #}
<link rel="stylesheet" type="text/css" href="{% static "css/django-admin-searchbar.css" %}" />
<script src="{% static "js/django-admin-searchbar.js" %}"></script>
```

**Note:** if you already have `JQuery` in template, you can not add it (or use newer version of CDN from [here](https://code.jquery.com/)).

Also see: [How to manage static files in Django](https://docs.djangoproject.com/en/1.11/howto/static-files/)

### Add API endpoint

Add `DjangoAdminSearchbarView` class from `django-admin-searchbar/views.py` file to your project. For example, we put it in `music/views.py`. Also don't forget to add following lines after this class:
```python
# Apply `login_required` to `DjangoAdminSearchbarView`
admin_searchbar_view = login_required(DjangoAdminSearchbarView.as_view())
```
After this you need to add view to your `urls.py` file:
```python
from music.views import admin_searchbar_view

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^search-bar/', admin_searchbar_view, name='admin-searchbar'),
]
```

**Installation is completed!**

License
-------
One day it will be here...

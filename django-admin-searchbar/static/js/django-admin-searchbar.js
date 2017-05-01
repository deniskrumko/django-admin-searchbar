// Javascript code for "django-admin-searchbar".
// Source: https://github.com/deniskrumko/django-admin-searchbar

// Change url for "search results" endpoint (if it's needed) here
var url = '/admin-searchbar/';
var search_results;

$(document).ready(function() {
  // Make AJAX request to retrieve searchbar results
  $.ajax({
    'async': false,
    'global': false,
    'url': url,
    'dataType': "json",
    'success': function(data) {
      search_results = data.search_results;
    }
  });

  // Variable for <input> HTML element
  var $searchbar = $('#django-admin-searchbar');

  // Change placeholder for searchbar when it's in focus
  $searchbar.focus(function() {
    $searchbar.attr('placeholder', 'Enter an object name to redirect');
  });

  // Change placeholder back when it loses focus (and remove text too)
  $searchbar.focusout(function() {
    $searchbar.attr('placeholder', 'Search...');
    $searchbar.val('');
  });

  // Autocomplete for searchbar (using "jQuery-autoComplete" plugin)
  // Source: https://github.com/Pixabay/jQuery-autoComplete
  $searchbar.autoComplete({
    minChars: 1,
    // Source is a processed search results from endpoint
    source: function(term, suggest) {
      term = term.toLowerCase();
      var suggestions = [];
      for (i = 0; i < search_results.length; i++)
        if (~(search_results[i][1]).toLowerCase().indexOf(term)) {
          suggestions.push(search_results[i]);
        }
      suggest(suggestions);
    },
    // Render suggestions like "App name: Model name"
    renderItem: function(item, search) {
      search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
      return '<div class="autocomplete-suggestion" data-val="' + search + '" data-url="' + item[2] + '">' + '<strong>' + item[0] + ': </strong>' + item[1].replace(re, "<b>$1</b>") + '</div>';
    },
    onSelect: function(e, term, item) {
      // Redirect to selected page on "Enter" or mouse click
      $searchbar.val('Redirecting...');
      window.location.replace(item.data('url'));
    }
  });
});

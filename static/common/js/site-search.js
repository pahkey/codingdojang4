(function () {
  function normalize(value) {
    return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char];
    });
  }

  function getQuery() {
    return new URLSearchParams(window.location.search).get('q') || '';
  }

  function scoreItem(item, terms) {
    var title = normalize(item.title);
    var tags = normalize((item.tags || []).join(' '));
    var id = normalize(item.id);
    var haystack = [title, tags, id].join(' ');
    var score = 0;

    for (var i = 0; i < terms.length; i += 1) {
      var term = terms[i];
      if (!haystack.includes(term)) {
        return 0;
      }
      if (title === term) score += 100;
      if (title.indexOf(term) === 0) score += 50;
      if (title.includes(term)) score += 20;
      if (tags.split(' ').indexOf(term) !== -1) score += 15;
      if (id === term) score += 10;
    }

    return score || 1;
  }

  function renderResult(item) {
    var tags = (item.tags || []).map(function (tag) {
      return '<span class="label label-tag code-tag">' + escapeHtml(tag) + '</span>';
    }).join(' ');

    return [
      '<div class="question-dummy clearfix search-result">',
      '  <div class="col-md-1 col-xs-2 list-count">',
      '    <div class="answers">',
      '      <div class="answers-count text-center">' + escapeHtml(item.id) + '</div>',
      '      <div class="answers-text text-center">번호</div>',
      '    </div>',
      '  </div>',
      '  <div class="col-md-11 col-xs-10">',
      '    <div class="question-line">',
      '      <a href="' + escapeHtml(item.url) + '" class="question-subject">' + escapeHtml(item.title) + '</a>',
      '      <div class="row">',
      '        <div class="col-md-8">' + tags + '</div>',
      '        <div class="col-md-4 static-meta search-result-date">' + escapeHtml((item.created || '').slice(0, 16)) + '</div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function initSearchPage() {
    var input = document.getElementById('search-query');
    var status = document.getElementById('search-status');
    var results = document.getElementById('search-results');
    if (!input || !status || !results) return;

    var query = getQuery();
    input.value = query;
    var normalizedQuery = normalize(query);
    if (!normalizedQuery) return;

    status.textContent = '검색 중...';
    fetch('/search-index.json')
      .then(function (response) {
        if (!response.ok) throw new Error('검색 인덱스를 불러오지 못했습니다.');
        return response.json();
      })
      .then(function (items) {
        var terms = normalizedQuery.split(' ').filter(Boolean);
        var matches = items.map(function (item) {
          return { item: item, score: scoreItem(item, terms) };
        }).filter(function (result) {
          return result.score > 0;
        }).sort(function (a, b) {
          return b.score - a.score || b.item.id - a.item.id;
        });

        status.textContent = query + ' 검색 결과 ' + matches.length + '개';
        results.innerHTML = matches.slice(0, 100).map(function (result) {
          return renderResult(result.item);
        }).join('');

        if (matches.length > 100) {
          status.textContent += ' 중 100개 표시';
        }
      })
      .catch(function () {
        status.textContent = '검색 인덱스를 불러오지 못했습니다.';
      });
  }

  initSearchPage();
}());

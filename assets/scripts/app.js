import React from 'react/addons';
import Main from '../react/Main';

// SSRで取得したデータ
var initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
initialData = initialData || {};

console.log('app');
console.log(initialData);

// Mainコンポーネントを、id="main"のDOM要素へレンダリング
React.render( <Main {...initialData} />,
  document.getElementById('main')
);

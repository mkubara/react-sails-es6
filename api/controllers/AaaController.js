'use strict';

// ごく簡単なViewを作成
class ViewController {
  aaa(req, res) {
    res.view('react');
  }

  bbb(req, res) {
    res.view('react');
  }
}

module.exports = new ViewController;

'use strict';

// ごく簡単なViewを作成
class ViewController {
  react(req, res) {
    res.view('react');
  }
}

module.exports = new ViewController;

# sailsES6
Sails.jsをES6で書いてみるサンプル

## サーバーサイド
SailsをES6で書いてみる。ちょうど先日`node v4`のstableがリリースされた。`node v4`からJavaScriptのV8 v4.5エンジン(現行のChromeと同じもの)に変更され基本的なES6構文が使えるようになった。

なので書いてみる。npmでv4をインストール

```
$ nvm install 4.0
```

nodeのバージョンが変更されたので、npmモジュールを再インストール

```
$ rm -rf node_modules
$ npm i
```

**ここでエラー続出。**一応Controllerを書いて動かしてみたが、モジュールが正常にインストールされていないので動かず。エラーは出ないけど画面が表示されない事態。これ以上試すのは多分無駄。

なので普通にbabelを活用する。
以下のnpmをインストールすると、設定不要で`/api/controllers`がES6で記述できるようになる。

```
$ npm i sails-hook-babel --save
```

## フロント
Sails.jsでは起動時にGruntが走るようになっているので、そのままGruntにBabelを組み込む。まずは以下の`grunt-babel`をインストール。

```
$ npm i grunt-babel --save
```

`tasks/config`に`babel.js`を追加し、どのファイルをコンパイルするか記述する。BabelでもTypescriptでも、コンパイル後のファイルを`assets/js/**`に出力したいので、元のファイルは別の場所に置くと良いかも。

```
module.exports = function(grunt) {
  grunt.config.set('babel', {
	   dev: {
       src: ['assets/scripts/app.js'],
       dest: 'assets/js/bundle.js'
		}
	});

	grunt.loadNpmTasks('grunt-babel');
};
```

Babelの設定ファイルができたので、タスクランナーに組み込み。今回は起動時`compileAssets.js`とassetsのファイル変更時`watch.js`に追加。

`tasks/register/compileAssets.js`

```
module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'babel:dev',  // ここを追加
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
```

`tasks/config/watch.js`

```
module.exports = function(grunt) {

	grunt.config.set('watch', {
		api: {

			// API files to watch:
			files: ['api/**/*', '!**/node_modules/**']
		},
		assets: {

			// Assets to watch:
			files: ['assets/**/*', 'tasks/pipeline.js', '!**/node_modules/**'],

			// When assets are changed:
			tasks: ['babel:dev', 'syncAssets' , 'linkAssets'] // ここに追加
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
```

これで起動時と、対象ファイルに変更があった時に自動的にBabelが走る。

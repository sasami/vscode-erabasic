# Change Log
All notable changes to the "erabasic" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]
### Added
- Multi-root Workspaces に対応

## [0.1.1] - 2017-11-05
### Fixed
- files.encoding に utf8bom を指定すると死んでしまうのを修正
- Go to Symbols in Workspace に files.encoding の変更が反映されないのを修正
- Go to Symbols in Workspace に編集中のドキュメントが反映されないのを修正

## [0.1.0] - 2017-10-21
### Added
- コード補完(固定)を追加
- スニペットに制御文を追加
- シンボルへ移動を実装

### Changed
- スニペットの命令文をコード補完へ移動

## [0.0.4] - 2017-10-15
### Changed
- 制御文と命令文の分類を再度見直し。「サクラエディタ設定ファイル」に合わせる

## [0.0.3] - 2017-10-15
### Added
- 変数宣言のキーワードに対応

### Changed
- 識別子の判定を Emuera に準拠
- 制御文と命令文の分類を見直し

## [0.0.2] - 2017-10-01
### Fixed
- eramaker 由来の命令が抜けていたのを修正
- 命令形式の式中関数が抜けていたのを修正
- THROW 命令の引数の解釈が間違っていたのを修正

## [0.0.1] - 2017-09-30
- Initial release

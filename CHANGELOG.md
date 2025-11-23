# Changelog

This document records all notable changes to the project, following the
[Keep a Changelog] format and adhering to [Semantic Versioning].

## [Unreleased]

There are no notable changes in this release.

## [0.10.0] - 2025-05-18

### Added

- Add support for Svelte syntax ([1d27fe1], [a3a4ac5]);
- Add support for Astro syntax ([44c66c9]);
- Add support for Lua syntax ([5bf27e8]).

### Changed

- Update HTML attribute highlighting to use color `p1` for names and `s0` with
  `s1` for values ([868b3ca]).

## [0.9.0] - 2025-04-29

### Added

- Add support for Zig syntax ([e96b091]);
- Configure colors for the `menu` scope ([6f0cdb5]).

## [0.8.0] - 2025-03-02

### Added

- Add support for PHP syntax ([7b39b42]);
- Add highlighting for `some` and `any` keywords in Swift syntax ([9b35127]);
- Add support for Vue syntax ([f6bef45]).

### Changed

- Synchronize themes by extracting shared links between tokens ([78ffc6f]);
- Update grammars for C, CSS, Dockerfile, Go, `go.mod`, `go.sum`, HTML, INI,
  JavaScript, JSON, JSON with Comments, JSON Lines, JSX, Makefile, PHP, Python,
  Ruby, Rust, Shell, SQL, Swift, TOML, TypeScript, TSX, and YAML syntaxes
  ([162c920...c42dd98]).

### Fixed

- Remove transparency from unexpected brackets ([6aaabc9]);
- Fix incorrect highlighting inside TypeScript type declarations ([a139d2b]).

## [0.7.0] - 2024-11-02

### Added

- Add the "Far Side of the Moon" theme variant ([7eb998e]);
- Add support for Python syntax ([5755a5d]);
- Add support for C syntax ([aaabc25]).

## [0.6.1] - 2024-07-16

There are no notable changes in this release.

## [0.6.0] - 2024-07-02

### Added

- Add support for Rust syntax by [@Super-Pizza] ([0a02e58...59b1f5d]).

## [0.5.0] - 2024-06-28

### Added

- Add support for Swift syntax ([158f0b6]).

## [0.4.1] - 2024-05-21

### Added

- Add string highlighting for functions within strings in Shell syntax
  ([4272d1f]).

### Fixed

- Disable string highlighting for string interpolation in Shell syntax
  ([383a376]).

## [0.4.0] - 2024-05-10

### Added

- Add support for Shell syntax ([3385ad4]).

## [0.3.0] - 2024-05-04

### Added

- Add support for SQL syntax ([5b7c040]).

## [0.2.0] - 2024-04-20

### Added

- Add support for fish syntax ([f1978d3]).

## [0.1.2] - 2024-04-01

### Fixed

- Fix highlighting of keywords in object methods in JavaScript syntax
  ([b09f1ba]).

## [0.1.1] - 2024-03-31

There are no notable changes in this release.

## [0.1.0] - 2024-03-29

There are no notable changes in this release.

## [0.0.1] - 2024-03-29

### Added

- Add the "Near Side of the Moon" theme variant ([704d29a]);
- Add support for CSS, Dockerfile, `go.mod`, `go.sum`, Go, HTML, INI,
  JavaScript, JSON, JSON with Comments, JSON Lines, JSX, Makefile, Ruby, TOML,
  TypeScript, TSX, and YAML syntaxes ([704d29a]).

<!-- Definitions -->

[Keep a Changelog]: https://keepachangelog.com/en/1.1.0/
[Semantic Versioning]: https://semver.org/spec/v2.0.0.html

[@Super-Pizza]: https://github.com/Super-Pizza/

[Unreleased]: https://github.com/vanyauhalin/moondusttheme/compare/v0.10.0...HEAD/
[0.10.0]: https://github.com/vanyauhalin/moondusttheme/compare/v0.9.0...v0.10.0/
[0.9.0]: https://github.com/vanyauhalin/moondusttheme/compare/v0.8.0...v0.9.0/
[0.8.0]: https://github.com/vanyauhalin/moondusttheme/compare/v0.7.0...v0.8.0/
[0.7.0]: https://github.com/vanyauhalin/moondusttheme/compare/v0.6.1...v0.7.0/
[0.6.1]: https://github.com/vanyauhalin/moondusttheme/compare/v0.6.0...v0.6.1/
[0.6.0]: https://github.com/vanyauhalin/moondusttheme/compare/v0.5.0...v0.6.0/
[0.5.0]: https://github.com/vanyauhalin/moondusttheme/compare/v0.4.1...v0.5.0/
[0.4.1]: https://github.com/vanyauhalin/moondusttheme/compare/v0.4.0...v0.4.1/
[0.4.0]: https://github.com/vanyauhalin/moondusttheme/compare/v0.3.0...v0.4.0/
[0.3.0]: https://github.com/vanyauhalin/moondusttheme/compare/v0.2.0...v0.3.0/
[0.2.0]: https://github.com/vanyauhalin/moondusttheme/compare/v0.1.2...v0.2.0/
[0.1.2]: https://github.com/vanyauhalin/moondusttheme/compare/v0.1.1...v0.1.2/
[0.1.1]: https://github.com/vanyauhalin/moondusttheme/compare/v0.1.0...v0.1.1/
[0.1.0]: https://github.com/vanyauhalin/moondusttheme/compare/v0.1.0/
[0.0.1]: https://github.com/vanyauhalin/moondusttheme/releases/tag/v0.0.1/

[5bf27e8]: https://github.com/vanyauhalin/moondusttheme/commit/5bf27e87d5e6de9680ff66918b833d4735217a9a/
[44c66c9]: https://github.com/vanyauhalin/moondusttheme/commit/44c66c98bf775376a9dc39282d4f96ba5e9c3b45/
[a3a4ac5]: https://github.com/vanyauhalin/moondusttheme/commit/a3a4ac5f206b4a1aad8613ccefed515970eb34d8/
[1d27fe1]: https://github.com/vanyauhalin/moondusttheme/commit/1d27fe1045f4a47fb43d00c5aeb3e6655a39d0ed/
[868b3ca]: https://github.com/vanyauhalin/moondusttheme/commit/868b3ca557b9d8174a98e3f47149da7e682ed037/
[6f0cdb5]: https://github.com/vanyauhalin/moondusttheme/commit/6f0cdb55077548228885c234fd5d263be5b6a8d6/
[e96b091]: https://github.com/vanyauhalin/moondusttheme/commit/e96b09198982a8902619147414588b105159c655/
[f6bef45]: https://github.com/vanyauhalin/moondusttheme/commit/f6bef450b2ca0292337ceb9e2a3646cec45002b9/
[9b35127]: https://github.com/vanyauhalin/moondusttheme/commit/9b35127c17b9600b1f8938e624546f2814199601/
[a139d2b]: https://github.com/vanyauhalin/moondusttheme/commit/a139d2bbf2620c7579fd627e280e7e1f7fb16e9c/
[162c920...c42dd98]: https://github.com/vanyauhalin/moondusttheme/compare/162c920988d85f52b5d0ec7a2e9440dc7eb60c9c...c42dd9898ee5795c09e2be18d4cc5c037f79c61f/
[78ffc6f]: https://github.com/vanyauhalin/moondusttheme/commit/78ffc6ff4f4b9db1e98b9efd88039804f28285a7/
[6aaabc9]: https://github.com/vanyauhalin/moondusttheme/commit/6aaabc9d17ec3aa7508b0d8eb190818eda10854d/
[7b39b42]: https://github.com/vanyauhalin/moondusttheme/commit/7b39b42ff4a371d87423cd4b09453b251a78aaef/
[5755a5d]: https://github.com/vanyauhalin/moondusttheme/commit/5755a5d0f74f30e81776658024ea9a2e196b159e/
[7eb998e]: https://github.com/vanyauhalin/moondusttheme/commit/7eb998ed6dcbcae92fa97872d93d63c275b0dfba/
[aaabc25]: https://github.com/vanyauhalin/moondusttheme/commit/aaabc256b52cf7bc9118a01790cf873f6f877bab/
[0a02e58...59b1f5d]: https://github.com/vanyauhalin/moondusttheme/compare/0a02e584bbe4304bcb77de16a8b9052e03054ed0...59b1f5d4a3139734a9a8b249213a4b7b9625c332/
[158f0b6]: https://github.com/vanyauhalin/moondusttheme/commit/158f0b6e6c5d62be23a7842f06febb0a2bf64812/
[383a376]: https://github.com/vanyauhalin/moondusttheme/commit/383a3761e518fcbf20cacad4001468c3b73ec9fe/
[4272d1f]: https://github.com/vanyauhalin/moondusttheme/commit/4272d1f5d961ac1278ccf3b34ddba211a70de246/
[3385ad4]: https://github.com/vanyauhalin/moondusttheme/commit/3385ad4925ff321bbd96ac5b51c620ebecfdddd5/
[5b7c040]: https://github.com/vanyauhalin/moondusttheme/commit/5b7c040a0af77728035d2020c25e68f69a9a6536/
[f1978d3]: https://github.com/vanyauhalin/moondusttheme/commit/f1978d3458d699874d304802b5b759e530b2686f/
[b09f1ba]: https://github.com/vanyauhalin/moondusttheme/commit/b09f1bae197fccc60476e7d57fc864f5971e9cae/
[704d29a]: https://github.com/vanyauhalin/moondusttheme/commit/704d29a988081be4aee23276211821143e12c4f4/

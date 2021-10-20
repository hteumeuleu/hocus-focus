# Hocus :focus

[Hocus :focus](https://focus.hteumeuleu.com/) is a keyboard accessibility horror game made by @HTeuMeuLeu in october 2021. It consists in 8 levels built to trick you around common keyboard accessibility mistakes.

## Installation

1. **Clone the repository**.

```sh
git clone https://github.com/hteumeuleu/hocus-focus.git
```

See [Cloning a repository](https://help.github.com/en/articles/cloning-a-repository) on GitHub documentation. If you're not familiar with Git or GitHub, I strongly encourage you to try [GitHub's desktop app](https://desktop.github.com/) on macOS, Windows or Linux.

2. **Install Jekyll**.

```sh
gem install bundler jekyll
```

See [Jekyll Installation Guide](https://jekyllrb.com/docs/installation/).

3. **Run Jekyll**.

```sh
bundle exec jekyll serve
```

You can turn on [incremental regeneration](https://jekyllrb.com/docs/configuration/incremental-regeneration/) with the `--incremental` flag.

```sh
bundle exec jekyll serve --incremental
```

4. **Go to [http://localhost:4000](http://localhost:4000)**.

## Random Notes

* I wanted to make the game as light as possible. Each page is only 3 requests (1 HTML, 1 CSS, 1 JS) and weighs around 10 Kb (or 4 Kb gzipped). And because browsers will likely cache the JS and CSS, any internal page should only have to download the HTML (around 3 Kb, or 1 Kb gzipped).
* The game can be played without JavaScript.

## Licence

[MIT Licence](https://github.com/hteumeuleu/hocus-focus/blob/master/LICENSE)
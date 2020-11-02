# TicTacToe+

Многопользовательские крестики нолики на поле 10x10

## Старт игры

Для старта необходимо зарегистрироваться.

После выбрать или создать игру.

Если в игре уже есть два игрока - есть возможность наблюдать.

Если второго игрока ещё нет(первый игрок тот, кто создал игру), то на странице игры есть возможность вступить в игру нажав на кнопку "Вступить".

## Запуск локально

На вашей машине должны быть установлены следующие инструменты:

- Git
- NodeJS
- Ruby [2.7.1](https://github.com/Ymaril/tictactoe_plus/blob/master/.ruby-version#L1)
- Rails [6.0.3](https://github.com/Ymaril/tictactoe_plus/blob/master/Gemfile#L7)

##### 1. Склонировать репозиторий

```bash
git clone git@github.com:Ymaril/tictactoe_plus.git
```

##### 2. Создание и найстройка базы данных

```ruby
bundle exec rake db:create
bundle exec rake db:setup
```

##### 3. Выгрузка JS пакетов

```ruby
npm install
```
##### 4. Выгрузка GEM

```ruby
bundle install
```

##### 5. Старт сервера

```ruby
bundle exec rails s
```

http://localhost:3000
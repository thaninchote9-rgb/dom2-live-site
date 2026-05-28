# Дом 2 Live

Сайт для просмотра стримов и выпусков дом 2 через встроенный YouTube-плеер.

## Как обновить новый стрим

Откройте файл:

`app/page.jsx`

Найдите:

`currentVideoId: "j-jxUE1EYUg"`

Замените ID на новый ID из ссылки YouTube.

Пример:

Ссылка:
`https://www.youtube.com/watch?v=ABC12345678`

Нужно поставить:
`currentVideoId: "ABC12345678"`

## Как добавить выпуск в архив

В файле `app/page.jsx` найдите массив `archiveItems` и добавьте новый объект:

```js
{
  date: "29.05",
  title: "Дом 2 сегодняшний выпуск — свежий стрим",
  videoUrl: "https://www.youtube.com/watch?v=ABC12345678",
  tag: "Архив",
}
```

## Публикация

Проект готов для Vercel.


## Фото стримеров

Фото справа вверху хранится здесь:

`public/photos/streamers-main.jpg`

Чтобы заменить фото, загрузите новое изображение с тем же именем `streamers-main.jpg` в эту папку и сделайте commit changes.


## Как заменить фон сайта

Фон сайта хранится здесь:

`public/backgrounds/rain-window.jpg`

Чтобы заменить фон, загрузите новое изображение с тем же именем `rain-window.jpg` в эту папку и сделайте commit changes.

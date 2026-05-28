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


## Как заменить фото стримеров

Фото справа вверху хранится в папке:

`public/photos/streamers-1.svg`

Чтобы поставить свою фотографию:

1. Загрузите фото в папку `public/photos`, например `streamers-1.jpg`.
2. Откройте `app/page.jsx`.
3. Найдите:

`src: "/photos/streamers-1.svg"`

4. Замените на:

`src: "/photos/streamers-1.jpg"`

После коммита Vercel сам обновит сайт.

# Публикация сайта Новицкого через GitHub Pages

1. В репозитории GitHub откройте **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Убедитесь, что файлы проекта находятся в **корне репозитория**, а не в дополнительной папке `novitsky-birthday`.
3. Проверьте точное название репозитория. По умолчанию в `vite.config.ts` указан путь `/Novitskiy/`, адрес предполагается `https://lowavestudio.github.io/Novitskiy/`. Если репозиторий называется иначе, измените `base` в `vite.config.ts` на `/<имя-репозитория>/`. Важен регистр букв.
4. Отправьте изменённые файлы в ветку `main` и откройте **Actions → Deploy to GitHub Pages**. Можно запустить **Run workflow**.
5. Если GitHub выдаст ошибку, откройте неуспешный запуск Actions, скопируйте красные строки из шага Install dependencies, Build или Deploy to GitHub Pages.

## Исправления в этом архиве
- GitHub Actions: Node.js 22 и `npm ci` вместо `npm install`, добавлен configure-pages.
- Пути ко всем изображениям в `src/content/data.ts` и аудио в `AllSections.tsx` теперь учитывают `import.meta.env.BASE_URL`.
- Preload основного портрета в `index.html` учитывает базовый путь Vite.

Это исправления конфигурации и файловых путей; успешный GitHub-деплой необходимо проверить непосредственно в Actions.

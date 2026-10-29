# YouTube Short #1: «Dropped out → sauna company»

**Формат:** 1080×1920, 30 fps, ≈ 58 с · **Исходники:** `1.mov`, `2.mov`, `3.mov`, `4.mov`, `IMG_8145.MOV` (Drive)
**Код монтажа:** `video/src/shorts/FounderShort.tsx` · **Рендер:** `npx remotion render FounderShort`

## Идея
Из 7 минут селфи-рассказа Яши собран сюжет основателя по схеме HOOK → EMOTION → CLARITY → CTA:
бросил школу в 17 → идея в октябре 2025 → передвижные сауны → «я сам за всё отвечаю» → прицеп (built to move) → бессонные ночи → «стоит сама» → продолжение следует.

## Монтажный лист
| # | Время в ролике | Исходник и отрезок | Речь (дословно) | Графика | Звук |
|---|---|---|---|---|---|
| 01 | 0:00–0:02 | 1.mov 30.80–32.98 | I dropped out in my final year of school. | **Хук:** eyebrow «Age 17 · Pattaya, Thailand» + **Dropped out** + рукописное *of school.* | whoosh, shimmer |
| 02 | 0:02–0:04 | 1.mov 18.35–20.40 | My name's Yasha, I'm 17 years old | Крупная золотая цифра **17** | pop |
| 03 | 0:04–0:08 | 1.mov 22.65–26.75 | I'm Russian but I've been living in Pattaya, Thailand for the last 16 years. | Стеклянная карточка «Home for **16 years** · Pattaya» | whoosh, pop |
| 04 | 0:08–0:13 | 1.mov 41.30–45.95 | the knowledge that I needed 5, 10, 15 years from now | «What school didn't give me» + цифры **5 · 10 · 15** по словам | 3× pop |
| 05 | 0:13–0:16 | 2.mov 10.30–13.45 | In October of 2025 I got a great idea. | Карточка «The idea · **Oct 2025**» | whoosh |
| 06 | 0:16–0:21 | 2.mov 43.40–47.95 | it was a growing business of prefab movable home saunas | «Prefab» + *movable* (script) над **Home saunas** | shimmer, whoosh |
| 07 | 0:21–0:22 | 2.mov 64.10–65.25 | I decided to get in early | Золотая плашка **Get in early.** | whoosh |
| 08 | 0:22–0:24 | 2.mov 76.55–78.45 | It's been super hard, I won't lie | Punch-in, только субтитры | — |
| 09 | 0:24–0:32 | 3.mov 41.95–50.00 | I'm the owner… running it… controlling everything… paying the bills… paying the workers | Чек-лист «I'm the one»: Owner / Running it / Controlling everything / Paying the bills / Paying the workers | 5× click |
| 10 | 0:32–0:40 | 2.mov 96.85–104.55 | This underneath the sauna floor is a trailer that we've designed to custom fit our saunas. | «Built to move» + **Custom trailer** (в кадре сам прицеп) | whoosh |
| 11 | 0:40–0:45 | 4.mov 28.68–34.15 | with the wheels but also the stand… rotate and lift the sauna easily | Чипы Wheels · Rotate · **Lift** | 3× pop |
| 12 | 0:45–0:46 | 4.mov 39.10–39.80 | sleepless nights | Затемнение + *Sleepless nights.* | — |
| 13 | 0:46–0:53 | 2.mov 79.60–86.50 | finally after months and months and months I've got here, standing fully | *months & months & months* (нарастают) → **Standing.** (каркас сауны в кадре) | 3× pop, whoosh |
| 14 | 0:53–0:53 | 2.mov 87.80–88.50 | on its own | *on its own.* (script) | shimmer |
| 15 | 0:53–0:56 | IMG_8145 22.85–25.45 | And stay tuned because there's a lot more coming soon. | Субтитры | — |
| 16 | 0:56–0:58 | — | — | Пар → **PODERA** (золотой блик) + *Your escape, every day* + «Follow the build» | steam, shimmer |

## Обработка
- Цвет: лёгкий контраст +6 %, насыщенность −8 %, тёплый сдвиг (теней и средних тонов), unsharp.
- Звук: highpass 90 Hz, шумоподавление (afftdn), компрессор 3:1; финал нормализован до −14 LUFS.
- Субтитры: Inter Bold, по 3 слова, ключевые слова золотом. Убраны там, где графика повторяет речь (01, 09, 12, 14).
- Исправлено распознавание: «Asha» → **Yasha**, «Paddy Thailand» → **Pattaya, Thailand**.

## Что намеренно убрано
- Фраза «…is my **3x4** sauna» (2.mov 88.6–90.4): у нас модели **2.5×4 / 2.5×6**, поэтому размер в ролик не попал.
- Длинные куски про двоюродного брата, родителей и поставки оставлены на следующие ролики.

## Временные решения (заменить)
- **Шрифт Tempting** заменён на бесплатный **Allura**, пока нет файла шрифта и лицензии.
- **Логотип** — текстовый «PODERA», пока нет SVG.
- **Музыки нет:** нет лицензированной библиотеки. В YouTube Shorts можно добавить трек из библиотеки YouTube при публикации; голос рассчитан под тихую подложку.
- SFX синтезированы (whoosh, click, pop, shimmer, steam).

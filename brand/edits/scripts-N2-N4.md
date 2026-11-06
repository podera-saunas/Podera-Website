# Сценарии N2–N4: адаптация под наш материал

Общие решения для всех трёх роликов:
- **Озвучки нет**, поэтому реплики из сценария стали **текстом на экране**: появляются по словам, ключевые слова золотом. Это наш формат «без людей: музыка + титры».
- **Цены не показываем** (правило бренда). Где сценарий просит цену, стоит расчёт без денег или CTA «Comment PRICE».
- Размер модели в сценарии «3×4» → у нас **2.5×4**.
- Музыка — наша собственная, без авторских прав: N2 на бите 92 BPM, N3 и N4 на тихом эмбиенте. SFX синтезированы: щелчки, пар, стук.
- В конце каждого ролика 2.6 с: пар → PODERA → CTA.
- Код: `video/src/shorts/scripts.tsx`, композиции `N2-SpaVsSauna`, `N3-VisitShowroom`, `N4-InsideTheWalls`.

---

## N2 «3 years of spa vs your own sauna» · 34 с · CTA: Comment PRICE
| Время | Сценарий | Что у нас вместо этого | Текст на экране |
|---|---|---|---|
| 0–3 | Чек ложится на полку | IMG_1952 (рука по полку) + **анимированный чек** падает в кадр | 3 years of spa = ? · чек «2 people / 2 visits a week / 3 years / TOTAL ?» |
| 3–8 | Руки пишут в блокноте | IMG_8838 (полки с подсветкой), формула печатается | Let's actually count · Two people. Twice a week. · 2 × 2 × 52 weeks × 3 years |
| 8–15 | Цифры поверх ковша и камней | Ковша в материале нет → печь SAWO IMG_8841 + решётка IMG_8808 | = 624 spa tickets · = 312 trips across town · Each one: booking, traffic, strangers. |
| 15–25 | Снаружи → внутри, двое сидят | IMG_8849 (сауна в синий час) → IMG_8800 (вход в парную) → IMG_8818. **Людей в кадре нет** | Or · Your own PODERA · ≈ 12 kWh per one-hour session (12 kW SAWO) · No booking. No strangers. Every day. |
| 25–31 | Рука закрывает блокнот | IMG_8850 → IMG_8847 (сауна вечером) | Once a month? Keep the spa. · Twice a week? · **Comment PRICE** |

**Как посчитано:** 2 человека × 2 раза × 52 недели × 3 года = **624 билета**, 2 × 52 × 3 = **312 поездок**. Деньги убраны: цену визита в спа мы не знаем, а свои цены показывать нельзя.
**Подтвердить:** «≈ 12 kWh за час» — это максимум для печи 12 kW (модель 2.5×4). Реальный расход меньше, печь работает циклами. Если хотите показать стоимость сеанса в батах, пришлите тариф.

## N3 «Don't buy a sauna from photos» · 31 с · CTA: Comment VISIT
| Время | Сценарий | Что у нас | Текст |
|---|---|---|---|
| 0–3.5 | POV: рука открывает дверь, пар | **IMG_1881**: рука открывает стеклянную дверь, внутри тёплый свет | Don't buy a sauna / *from photos.* |
| 3.5–8.5 | POV идёт к сауне | IMG_8848 (проход вдоль фасада к веранде, вечер) | Finished PODERA · Pattaya & Phuket · Built. Lit. Ready to try. |
| 8.5–15.5 | Ладонь по скамье, стене, ручке | IMG_1952 (рука по полку) → IMG_8797 (ручка) → IMG_8803 (спинки) | Touch it. Sit in it. · Check the bench height. · Feel the details. · Touch the wood. |
| 15.5–25.5 | Ковш льёт воду на камни, гость садится | Ковша и людей нет → печь IMG_8839 + **анимированный пар** и звук пара → IMG_8801 → IMG_8818 | Bring your partner. Bring your plot questions. · Stay as long as you need · No obligation |
| 25.5–28.5 | Дверь закрывается изнутри | IMG_8844 (стеклянная дверь с подсветкой изнутри) | **Comment VISIT** · We'll send the location and free times. |

**Подтверждено владельцем:** визиты в **Pattaya и Phuket**, время любое (сколько потребуется).

## N4 «What's hidden in the walls» v2 · 36 с · CTA: Comment WOOD
Переделано по отзыву: **без Яши в кадре**, новые кадры, новая музыка (`n4_cinematic.wav`: собственный трек, 76 BPM, ре минор, пианино, струнные и пульс, нарастание к 25 с).

| Время | Кадр | Текст |
|---|---|---|
| 0–3.2 | IMG_8862 (обшивка ночью снизу, светильники карниза) + 3 стука | What you don't see / *costs the most.* |
| 3.2–8.2 | IMG_9412 (цех: верстак, инструмент) → IMG_1907 (пол-«ёлочка» крупно) | Inside the wall · Every PODERA wall is built in our workshop. |
| 8.2–15.2 | IMG_8820 → IMG_8803 (стены парной с подсветкой, затемнены) + схема стены | Outside → in: Exterior cladding · Insulation · Vapour barrier · Cedar lining |
| 15.2–21.2 | IMG_8839 (печь целиком) → IMG_8819 (вид в печь, «тоннель») | Heater · PODERA 2.5×4 · SAWO · 12 kW |
| 21.2–25.2 | IMG_8851 (проход мимо окна парной к двери, вечер) | A glass door that keeps the heat in. |
| 25.2–30.7 | IMG_8836 (потолок с LED) → IMG_1910 (пол → полки) | You'll never see these layers. You'll feel them every session. |
| 30.7–33.3 | IMG_8853 (окно в светящуюся парную снаружи) | **Comment WOOD** · for our materials guide |

**Подтвердить:** пароизоляция (фольга) и дерево внутри по умолчанию (стоит *Cedar lining*).

---|---|---|---|
| 0–3 | Костяшки стучат по стене | IMG_2008 (обшивка крупно) + **3 стука** (звук) | What you don't see / *costs the most.* |
| 3–8 | Открытый каркас в мастерской | 3.mov: стальной каркас, Яша показывает рукой → 2.mov: каркас снизу | Inside the wall · A PODERA wall before it's closed. |
| 8–15 | Слои по 1.5 с | Утеплителя и плёнки в материале нет → **анимированная схема стены**: 4 слоя въезжают по очереди поверх IMG_8861 → каркаса → IMG_8803 | Outside → in: 1 Exterior cladding · 2 Insulation · 3 Vapour barrier · 4 Cedar lining |
| 15–25 | Печь SAWO, вентиляция, уплотнитель | IMG_8809 (верх печи SAWO) → IMG_1901 (вентрешётка) → IMG_8844 (дверь) | SAWO · 12–18 kW · Ventilation, built in. · A glass door that keeps the heat in. |
| 25–33 | Ладонь по стыку, общий план | IMG_1952 → IMG_8802 (вход в парную) | You'll never see these layers. You'll feel them every session. · **Comment WOOD** |

**Подтвердить:** есть ли у вас **пароизоляция (фольга)**? Толщина и тип утеплителя? Какое дерево внутри по умолчанию: Canadian Cedar, Thermo Abachi или Abachi? Я поставила *Cedar lining*. Фраза «Air in low, out high» убрана: схему вентиляции по кадрам не подтвердить.

---

## Что доснять, чтобы ролики стали сильнее
1. **Ковш, вода на камни, пар** (макро, 60 fps) для N2 и N3.
2. **Люди в сауне** (двое спиной к камере, в полотенцах) для N2 и N3.
3. **Срез стены 30×30 см** на столе в мастерской (обшивка → утеплитель → плёнка → вагонка) для N4.
4. **Стук костяшками по стене** с живым звуком для N4.
5. **Блокнот с расчётом и рука** для N2.

## N3 v3 «Don't buy a sauna from photos» — editorial minimal, 31.5 s (`N3v3-VisitEditorial`)
| Time | Shot (graded) | On screen |
|---|---|---|
| 0–3.4 | IMG_1880 hand opens the glass door, warm light (night LUT, 0.9×) + door foley | BEFORE YOU ORDER · *Don't buy a sauna from photos.* |
| 3.4–8.4 | IMG_8848 POV walk along the facade to the porch | PATTAYA · PHUKET · *A finished PODERA.* Heated. Ready for you. |
| 8.4–11.4 | IMG_1952 hand along the bench | *Touch it.* |
| 11.4–15.6 | IMG_8797 door handle → IMG_8806 heater | *Sit in it.* |
| 15.6–18.2 | IMG_8819 inside the heater, clean take from 3.0 s (0.8×) + steam hiss | *Feel the heat.* |
| 18.2–22.4 | IMG_8801 entering the steam room | *Bring your partner.* And your plot questions. |
| 22.4–25.8 | IMG_8818 window → benches | NO OBLIGATION · *Stay as long as you need.* |
| 25.8–28.8 | IMG_8850 sauna at blue hour, static (night LUT) | VISIT A SHOW SAUNA · **Comment VISIT** · We'll send the location and free times. |
| 28.8–31.5 | — | PODERA · *Your escape, every day* · Comment VISIT |

Bed: "Going Home" (HoliznaCC0, CC0), mix at −20 LUFS (quiet, per brief). Missing from footage: POV door-opening with steam, ladle on stones, guest sitting — replaced by the closest real shots.

**Edit note (N3 v3):** every shot skips the first 1 s of its source (shaky handheld starts); 8818 from 3.5 s, 8819 from 4.0 s. Rates 1880 0.85×, 8848 0.9×, 1952 0.85×, 8850 0.75× to keep the timing. Door foley moved to 0.35 s.

## N4 v4 «What's hidden in the walls» — editorial minimal, 33 s (`N4v4-WallsEditorial`)
Same kit as N3 v3 (`video/src/shorts/editorial.tsx`): hard cuts, one masked line per shot, gold rule, flat logo outro. Every clip starts ≥ 1 s into its source.

| Time | Shot (graded) | On screen | Sound |
|---|---|---|---|
| 0–3.2 | IMG_8862 cladding from below, night | *What you don't see / costs the most.* | 3 dull knocks |
| 3.2–6.4 | IMG_9412 workshop: bench, mitre saw | INSIDE THE WALL · *Built in our workshop.* | |
| 6.4–8.2 | IMG_0006 saw cut | (same line) | |
| 8.2–10.5 | IMG_2008 exterior cladding close-up | 01 · OUTSIDE · *Exterior cladding.* | soft wood tick |
| 10.5–12.8 | IMG_8820 lit wall | 02 · *Insulation.* | tick |
| 12.8–15.2 | IMG_8803 interior boards | 03 · INSIDE · *Cedar lining.* | tick |
| 15.2–18.7 | IMG_8809 SAWO heater top | PODERA 2.5×4 · **SAWO · 12 kW** | |
| 18.7–21.7 | IMG_1901 vent grille | *Ventilation, built in.* | |
| 21.7–25.2 | IMG_1983 glass door + wooden handle (0.75×) | *A door that keeps the heat in.* | |
| 25.2–27.6 | IMG_1952 palm along the bench | *You'll never see these layers.* | |
| 27.6–30.4 | IMG_8802 wide interior | EVERY SESSION · *You'll feel them.* Comment WOOD for our materials guide. | |
| 30.4–33 | — | PODERA · slogan · Comment WOOD | |

Bed: "Walking Away" (HoliznaCC0, CC0, calm lofi); mix −16 LUFS. Left out until confirmed: foil vapour barrier, insulation thickness, "air in low, out high", door seal vs Thai humidity. No open-frame or wall-sample footage yet (script fallback: shoot a 30×30 cm wall cross-section).

## N5 «Сауна как апгрейд виллы под аренду» — editorial minimal, 30 s (`N5-VillaUpgrade`)
No pool / villa / people / drone footage in the folder → script fallback hook "Imagine this next to your pool"; the showroom sauna is never cut as if it stood at a villa. Bed: "Roof Tops" (HoliznaCC0, CC0, calm lofi; first version with Fresh Focus was too cheerful), quiet, no source audio, mix −16 LUFS.

| Time | Shot (graded, each ≥ 1 s into source) | On screen |
|---|---|---|
| 0–3.1 | IMG_8849 sauna B at blue hour, lit inside | VILLA OWNERS · *Your guests have seen a hundred pools.* |
| 3.1–7.7 | IMG_8853 orbit to the glowing window | *Imagine this next to yours.* |
| 7.7–14.7 | IMG_1994 facade → IMG_8838 benches → IMG_8800 steam room ("listing" trio) | ARRIVES FINISHED · *Installed in 1 day.* No renovation. No closed weeks. |
| 14.7–18.2 | IMG_1882 hand on the touch panel | *Simple controls for guests.* |
| 18.2–21.6 | IMG_8814 benches | 2.5×4 · 2.5×6 · *4 to 8 guests.* |
| 21.6–24.5 | IMG_8812 heater against the panoramic window | *The photo they stop on.* |
| 24.5–27.4 | IMG_8847 facade from the porch | OWN OR MANAGE RENTALS? · **Comment VILLA** · We'll send specs and power requirements. |
| 27.4–30 | — | PODERA · slogan · Comment VILLA |

Left out until confirmed: "Built for Thai humidity", exact capacity of the 2.5×6 alone. To shoot: villa pool → pan to sauna (golden hour), person walking from sauna to the pool, folded towels on the bench, drone/balcony top view.

## N6 «Phone stays outside» — ritual image film, 28 s (`N6-PhoneStaysOutside`)
No voice, no CTA in the video (caption: VISIT). Long calm shots, no speed-ups. **Only clips never used in earlier videos.** No source audio (owner's call): calm lofi bed "Saturation" (HoliznaCC0, CC0) + soft door and steam foley. Mix −16 LUFS.

| Time | Shot (graded, ≥ 0.5–1 s into source) | On screen | Sound |
|---|---|---|---|
| 0–3.6 | IMG_1875 control panel → glowing steam-room window, night | *Phone stays outside.* | door closes |
| 3.6–7.4 | IMG_8811 soft light along the benches | — | |
| 7.4–15.0 | IMG_8816 heater from above, window behind → IMG_8813 stones cage, both 50 % (60 fps) | *20 minutes. Yours.* | steam ×2 |
| 15.0–18.6 | IMG_8837 wood and light | — | |
| 18.6–22.2 | IMG_8815 evening behind the glass (steady 4.6–6.8 s, 0.6×) | — | |
| 22.2–25.6 | IMG_8859 outside at night, the lit window | *Every evening. At home.* | door opens |
| 25.6–28 | — | PODERA · slogan | |

Missing from footage (script): phone placed face-down on a shelf, ladle/water on stones with steam in a light beam, a person sitting, drops on wood, palm on knee, exhale, person walking out at dusk. Shoot these and the hook becomes the real one.

## N7 «Before you pay for a sauna — 5 questions» — editorial minimal, 35 s (`N7-FiveQuestions`)
No voice-over and no person on camera → questions are on-screen text; a big gold counter (1–5 / 5) always sits in the same place. No competitors, no prices. **Only clips never used before.** Bed: "One Night In France" (HoliznaCC0, CC0, calm lofi beat, from 21.6 s where the beat starts), no source audio, −16 LUFS.

| Time | Shot | Counter · on screen |
|---|---|---|
| 0–3.2 | IMG_1979 sauna A, day | BEFORE YOU PAY FOR A SAUNA · *Ask these 5 questions.* |
| 3.2–8.2 | IMG_8857 corner cladding → window, night (0.6×) | 1 · *What's in the walls?* And how thick is the insulation? |
| 8.2–11.7 | IMG_8810 heater → IMG_1984 control panel | 2 · *Which heater, what power?* And who services it in Thailand? |
| 11.7–15.2 | IMG_8821 floor → benches | 3 · *Is the wood rated for 90°C?* And for Thai humidity? |
| 15.2–22.2 | IMG_1981 module on its blocks → IMG_1996 porch and window | 4 · *What's in the price?* Delivery, crane, connection — or extra? |
| 22.2–26.2 | IMG_8799 door handle push-in | 5 · *Can I see a finished one?* Before I pay anything. |
| 26.2–29.6 | IMG_8852 past the lit window to the door, night | *Save this.* |
| 29.6–32.4 | IMG_8860 corner window, night | OUR ANSWERS TO ALL FIVE · **Comment PRICE** |
| 32.4–35 | — | PODERA · slogan · Comment PRICE |

Missing (script): PODERA representative on camera / hand writing "5", wall cross-section, electrical board, truck + crane + connection (N1 footage not in the folder), representative opening the door with an inviting gesture.

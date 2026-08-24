# Mobile Performance Makeover – Stockholm Events

Du får en fungerande Next.js-app som visar events i Stockholm. Appen fungerar,
men den innehåller flera avsiktliga prestandaproblem.

Din uppgift är att arbeta i den här ordningen:

```txt
mät före → hitta orsaken → förbättra → mät igen → dokumentera
```

Utgå från det du ser i Lighthouse och Chrome DevTools. Gör inte en optimering
bara för att den brukar vara bra.

## Det här ska du träna på

- LCP, CLS och INP
- bildladdning och layoutstabilitet
- arbete på huvudtråden
- JavaScript-storlek och code splitting
- externa API-anrop och cache
- responsiv design för mobil
- skillnaden mellan labbdata och fältdata

Bra Core Web Vitals innebär normalt:

| Mätvärde | Mäter                                  | God nivå |
| -------- | -------------------------------------- | -------: |
| LCP      | När det viktigaste innehållet visas    |  ≤ 2,5 s |
| INP      | Hur snabbt sidan svarar på interaktion | ≤ 200 ms |
| CLS      | Oväntade förflyttningar i layouten     |    ≤ 0,1 |

Fältdata bedöms vid den 75:e percentilen. Läs mer om
[Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds).

---

## Steg 1: Starta projektet

1. Starta uppgiften i Codington.
2. Anslut GitHub om du blir ombedd.
3. Acceptera repository-inbjudan.
4. Klona repositoryt.
5. Installera och starta projektet:

   ```bash
   npm install
   npm run dev
   ```

Kontrollera att du kan:

- se eventlistan
- söka och filtrera
- öppna en detaljsida
- gå tillbaka till eventlistan

Testa både desktop och en smal mobilvy. Funktionerna ska finnas kvar efter
dina ändringar.

## Steg 2: Gör en baslinjemätning

Mät en produktionsversion. Utvecklingsläget innehåller extra kod och ger därför
inte en rättvis Lighthouse-mätning.

```bash
npm run build
npm start
```

### 2A. Lighthouse och Performance-tabben

1. Öppna sidan i Chrome.
2. Välj mobil simulering.
3. Gå till Performance-tabben och uppdatera Environment-settings: CPU och Network
4. Skriv ner CPU och Network som du valde.
5. Kör Performance-tabben med Record and Reload.
6. Testa lokal interaktion med bara Record och klicka sedan runt på sajten det du vill testa.
7. Kör Lighthouse.
8. Fyll i kolumnen **Före**.

| Mätning                | Före | Efter |
| ---------------------- | ---: | ----: |
| Lighthouse Performance |      |       |
| LCP                    |      |       |
| CLS                    |      |       |
| Lokal interaktion/INP  |      |       |

Skriv också vilken sida du testade och vilket element Lighthouse identifierade
som LCP.

> Lighthouse ger inte en riktig fält-INP från en vanlig sidladdning. Spela
> därför in sökning och filtrering i Performance-panelen.

### 2B. Interaktion och huvudtråd

1. Starta en inspelning i Performance-panelen.
2. Skriv i sökfältet.
3. Byt kategori.
4. Öppna ett event.
5. Leta efter långa tasks och kod som blockerar huvudtråden.

Läs mer om
[Chrome Performance-panelen](https://developer.chrome.com/docs/devtools/performance/overview).

### 2C. JavaScript och nätverk

Gör en hård omladdning med samma mobilinställningar.

1. Öppna Network och gärna Coverage.
2. Notera hur mycket JavaScript som laddas direkt.
3. Kontrollera hur mycket av koden som faktiskt används.
4. Öppna **Veckans puls**.
5. Kontrollera om en ny JS-chunk laddas först då, eller om diagramkoden redan
   fanns i den initiala laddningen.
6. Leta upp anropet till `/api/weather`.
7. Jämför ett första och ett efterföljande anrop.

| Resursmätning                          | Före | Efter |
| -------------------------------------- | ---: | ----: |
| Initialt överförd JavaScript           |      |       |
| JS som används först efter interaktion |      |       |
| `/api/weather`, första anropet         |      |       |
| `/api/weather`, efterföljande anrop    |      |       |

Skriv om **Disable cache** var aktivt. Inställningen påverkar browsercachen,
men inte automatiskt cache på servern, i ett CDN eller hos det externa API:t.

## Steg 3: Diagnostisera

Skriv minst tre observationer innan du ändrar koden.

För varje observation ska du svara på:

1. Vad såg du?
2. Vilken resurs eller kod var inblandad?
3. Hur påverkades användaren?
4. Vilken förändring vill du prova?

Undersök särskilt:

- varför LCP-elementet visas sent
- om bilder är större än de behöver vara
- vilka element som orsakar CLS
- vad som blockerar huvudtråden vid sökning och filtrering
- om valfri funktionalitet laddar JavaScript för tidigt
- hur väderanropet beter sig vid upprepade laddningar
- vad som händer om väder-API:t är långsamt eller nere
- om mobilvyn har horisontell scroll eller fel prioritering

Det finns avsiktliga problem i startkoden, men uppgiften är inte en skattjakt.
Prioritera problemen som dina mätningar visar.

## Steg 4: Förbättra appen

Gör minst tre meningsfulla förbättringar. Tillsammans ska de beröra:

- laddning och LCP
- layoutstabilitet och CLS
- en långsam interaktion
- användbarhet på mobil

Du får ändra komponenter, CSS, bildhantering och datastruktur. Du får inte ta
bort eventlistan, bilderna, sökningen, filtreringen eller detaljsidorna.

Den färdiga mobilvyn ska:

- visa viktigt innehåll ovanför folden
- använda bilder som passar sin renderade storlek
- reservera utrymme för innehåll som laddas senare
- undvika onödiga resurser vid sidstart
- använda CSS för responsivitet
- fungera utan horisontell desktop-scroll

### Optimera JavaScript

Diagrammet **Veckans puls** använder ett tredjepartsbibliotek.

1. Visa med Network eller Coverage om biblioteket laddas vid sidstart.
2. Inför code splitting vid en meningsfull gräns.
3. Mät initial JavaScript före och efter.
4. Kontrollera också upplevelsen första gången diagrammet öppnas.
5. Förklara avvägningen mellan mindre initial JS och väntan vid första
   interaktionen.

Du ska inte dynamiskt importera varje liten komponent. Välj en gräns som
mätningen motiverar.

### Optimera API och cache

Vädernotisen går via `/api/weather` till ett externt API.

1. Mät ett första och ett efterföljande anrop.
2. Bestäm hur färsk väderinformationen behöver vara.
3. Inför en cachepolicy som matchar det behovet.
4. Verifiera att cachen faktiskt används.
5. Hantera fel och ett otillgängligt API utan att eventlistan slutar fungera.
6. Förklara avvägningen mellan snabbhet, färskhet och API-belastning.

## Steg 5: Verifiera ändringarna

Kör projektets kontroller:

```bash
npm test
npm run lint
npm run build
```

Kontrollera sedan att:

- eventlistan visas
- sökning och filter fungerar
- detaljsidorna fungerar
- diagrammet fungerar
- väderfel inte stoppar resten av sidan
- mobilvyn saknar horisontell scroll

Kör samma mätningar som i steg 2 och fyll i kolumnen **Efter**.

Förklara kort:

- **LCP:** Vad var orsaken, vad ändrade du och vad blev resultatet?
- **CLS:** Vad flyttade sig och hur reserveras utrymmet nu?
- **Interaktion:** Vad blockerade huvudtråden och hur förändrades resultatet?
- **JavaScript/API:** Vad laddas eller cachas annorlunda?

Du bedöms på diagnos och resonemang, inte på att nå poängen 100.

## Steg 6: Publicera på Vercel

Repositoryt är privat i skolans GitHub-organisation. Publicera därför från
projektmappen med Vercel CLI:

```bash
npx vercel login
npx vercel --prod
```

Efter publiceringen:

1. Testa startsidan och en detaljsida på en riktig telefon.
2. Aktivera Vercel Speed Insights enligt
   [Vercels guide](https://vercel.com/docs/speed-insights/package).
3. Lägg den publika Vercel-länken i README.
4. Pusha dina ändringar.

Speed Insights samlar fältdata från riktiga besök. Ett nytt studentprojekt har
ofta för lite trafik för ett stabilt resultat. CrUX använder normalt ett
rullande 28-dagarsfönster. Läs mer om
[skillnaden mellan labb- och fältdata](https://web.dev/articles/lab-and-field-data-differences).

## Steg 7: Testa en klasskompis app

Testa minst en publicerad app på en riktig telefon:

1. Ladda startsidan.
2. Scrolla genom eventlistan.
3. Sök och byt kategori.
4. Öppna en detaljsida och gå tillbaka.
5. Skriv en kort observation om vad som kändes snabbt, långsamt eller
   instabilt.

## Steg 8: Dokumentera och lämna in

Lägg till följande i README:

- publik Vercel-länk
- testad sida, viewport, CPU- och nätverksinställning
- före/efter-tabeller
- minst tre observationer
- vilka förändringar du gjorde och varför
- resultat efter varje förändring
- skillnaden mellan labbdata och fältdata
- minst en avvägning mellan design, funktion och prestanda
- observationen från klasskompisens app

Lämna sedan in det Codington-skapade repositoryt.

---

## Krav för Godkänt

- fungerande publik Vercel-deployment
- användbar mobil layout utan horisontell scroll
- jämförbara före- och eftermätningar
- relevanta förbättringar av LCP, CLS och interaktion
- minst en dokumenterad observation om JavaScript eller API-anrop
- förklaring av problem, förändring och resultat
- bevarad sökning, filtrering, eventlista och detaljsidor
- aktiverad Vercel Speed Insights
- gröna GitHub Actions-kontroller

## Krav för VG

Alla krav för Godkänt samt:

- en specifik rendering- eller huvudtrådsflaskhals visad i
  Performance-panelen
- mätt JavaScript-bloat och en motiverad code-splitting-gräns
- införd och verifierad cachepolicy för det externa API:t
- flera mobilmätningar med ett representativt resultat
- resonemang om labbdata jämfört med fältdata
- minst en förklarad avvägning mellan design, funktion och prestanda

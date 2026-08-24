# Mobile Performance Makeover – Stockholm Events

I den här uppgiften får du en fungerande **Next.js-app med TypeScript** som
visar events i Stockholm. Appen innehåller en startsida, eventkort,
filtrering och en detaljsida för varje event.

Den fungerar – men den är inte byggd med mobil prestanda som utgångspunkt.
Din uppgift är att arbeta som en performance engineer:

```txt
mäta → diagnostisera → förändra → mäta igen
```

Du ska följa bevisen i Lighthouse och Chrome DevTools. Ändra inte saker bara
för att de _brukar_ vara bra för prestanda; försök först förklara vilket
problem förändringen ska lösa.

---

## Lärandemål

Efter uppgiften ska du kunna:

- förklara hur mobilnät, långsammare CPU:er och mindre skärmar påverkar design
- mäta prestanda med Lighthouse och Chrome DevTools
- förklara LCP, INP och CLS
- identifiera vad som orsakar ett prestandaproblem
- optimera bilder, rendering, layoutstabilitet och interaktioner
- göra en fungerande mobil layout
- publicera en Next.js-app på Vercel
- skilja mellan labbmätningar och data från riktiga besökare

## Core Web Vitals

De nuvarande gränserna för en “god” användarupplevelse är:

| Metric | Mäter                                        | God      |
| ------ | -------------------------------------------- | -------- |
| LCP    | När sidans viktigaste synliga innehåll visas | ≤ 2,5 s  |
| INP    | Hur snabbt sidan svarar efter interaktioner  | ≤ 200 ms |
| CLS    | Oväntade förflyttningar i layouten           | ≤ 0,1    |

För fältdata bedöms målen vid den 75:e percentilen av verkliga sidvisningar.
Läs mer i [Googles beskrivning av Core Web Vitals och gränsvärden](https://web.dev/articles/defining-core-web-vitals-thresholds).

---

## 1. Starta uppgiften i Codington

1. Öppna uppgiften **Mobile Performance Makeover – Stockholm Events** i
   Codington.
2. Anslut ditt GitHub-konto om Codington ber dig göra det.
3. Välj **Starta uppgift**. Codington skapar då ett privat repository åt dig i
   skolans GitHub-organisation.
4. Öppna repositoryt och acceptera GitHub-inbjudan om den visas.
5. Klona ditt repository till datorn.

Installera och starta projektet:

```bash
npm install
npm run dev
```

### Föreslagen arbetsplan

- Kör baslinjemätningar och dokumentera problemen
- Optimera LCP och resursladdning
- Åtgärda CLS och förbättra mobillayouten
- Undersök och förbättra interaktionsprestanda
- Publicera på Vercel och aktivera Speed Insights
- Testa klasskamraters appar på riktiga telefoner
- Gör slutmätningar och färdigställ README och inlämning

## 2. Bekanta dig med appen

Kontrollera att du kan:

- se listan med events
- söka efter event eller område
- filtrera på kategori
- öppna en detaljsida
- gå tillbaka till eventlistan

Testa både ett brett webbläsarfönster och en smal mobil viewport. Funktionerna
ovan ska finnas kvar efter dina optimeringar.

## 3. Gör en kontrollerad baslinjemätning

Öppna sidan i Chrome och använd mobil simulering. Kör Lighthouse med samma
inställningar varje gång så att före- och efterresultaten går att jämföra.

Gör detsamma med Performance-tabben i Chrome dev tools.
[Chrome Performance-panelen](https://developer.chrome.com/docs/devtools/performance/overview)

Gör gärna tre körningar och använd ett representativt resultat. Stäng andra
tunga flikar och skriv ner vilka inställningar du använde.

Fyll i kolumnen **Före**:

| Mätning                | Före | Efter |
| ---------------------- | ---: | ----: |
| Lighthouse Performance |      |       |
| LCP                    |      |       |
| CLS                    |      |       |
| INP                    |      |       |
| TBT                    |      |       |

Lägg även till:

- CPU- och nätverksinställning
- vilken sida du testade
- vilket element Lighthouse identifierade som LCP

> Lighthouse kan inte ge en riktig fält-INP från en vanlig sidladdning. Använd
> TBT som en labbsignal och skapa sedan en lokal INP genom att söka, filtrera
> och öppna event medan du spelar in i Performance-panelen.

## 4. Diagnostisera innan du ändrar

Skriv ner minst tre observationer från dina mätningar. För varje observation:

1. Vad ser du i verktyget?
2. Vilken resurs, komponent eller kod verkar vara inblandad?
3. Vilken del av användarupplevelsen påverkas?
4. Vilken förändring tror du kan hjälpa?

Undersök särskilt:

- vad som händer innan det viktigaste innehållet blir synligt
- vilka resurser mobilen laddar och när de upptäcks
- om innehåll flyttar sig efter att sidan först ritats
- vad huvudtråden gör när du söker eller filtrerar
- om mobilvyn prioriterar rätt innehåll ovanför folden

Det finns avsiktliga problem i startkoden, men uppgiften är inte en
skattjakt efter ett bestämt antal kodrader. Verktygen ska hjälpa dig avgöra vad
som faktiskt är viktigast.

## 5. Förbättra upplevelsen

Gör minst tre relevanta förbättringar. Arbetet ska tillsammans beröra:

- laddning/LCP
- layoutstabilitet/CLS
- minst en långsam interaktion
- användbarhet på en smal mobilskärm

Du får ändra komponenter, CSS, datastruktur och bildhantering. Du får inte
lösa uppgiften genom att ta bort eventlistan, alla bilder, filtreringen eller
detaljsidorna.

### Mobile design

Den färdiga sidan ska:

- prioritera viktigt innehåll ovanför folden
- använda bilder som passar deras renderade storlek
- undvika att ladda onödigt dekorativt innehåll direkt
- ladda innehåll längre ner när det faktiskt behövs
- använda en genomtänkt mobil layout, inte bara en ihoptryckt desktop-layout
- föredra CSS-responsivitet framför JavaScript-kontroller av viewportbredd
- behålla tydliga interaktioner utan onödig animation eller JavaScript

## 6. Mät igen

Kör samma mätprotokoll med samma inställningar. Fyll i kolumnen **Efter** och
skriv en kort jämförelse för varje område:

### LCP

- Vad var orsaken?
- Vad ändrade du?
- Vad visar den nya mätningen?

### CLS

- Vilka element flyttade sig?
- Hur reserverar sidan nu rätt utrymme?

### Interaktion

- Vilken interaktion spelade du in?
- Vad blockerade huvudtråden?
- Hur förändrades lokal INP eller den långsammaste interaktionen?

Resultat varierar mellan körningar. Du bedöms på diagnos, resonemang och
relevanta förbättringar – inte på att nå poängen 100.

## 7. Publicera på Vercel

Repositoryt ägs av skolans GitHub-organisation och är privat. Publicera därför
från projektmappen med Vercel CLI i stället för att importera repositoryt via
Vercels GitHub-integration.

1. Logga in och publicera en produktionsversion från projektets rot:

   ```bash
   npx vercel login
   npx vercel --prod
   ```

2. Följ frågorna i terminalen. Kommandot skapar och länkar ett Vercel-projekt
   utan att GitHub-repositoryt behöver importeras.
3. Kontrollera startsidan och minst en detaljsida på en riktig telefon.
4. Aktivera Vercel Speed Insights och lägg till paketet och komponenten enligt
   Vercels guide.
5. Lägg in den publika Vercel-länken tydligt i README och pusha förändringen.

Följ [Vercels guide för Speed Insights](https://vercel.com/docs/speed-insights/package).
Speed Insights börjar samla fältdata från riktiga besök, men ett litet nytt
studentprojekt får inte omedelbart ett stabilt “officiellt” Core Web Vitals-
resultat.

CrUX bygger normalt på ett rullande 28-dagarsfönster och kan sakna data för
sidor med lite trafik. Läs
[skillnaden mellan labb- och fältdata](https://web.dev/articles/lab-and-field-data-differences).

## 8. Testa en klasskompis sajt

Testa minst en klasskompis publicerade app på en riktig telefon:

- ladda startsidan
- scrolla genom eventlistan
- sök och byt kategori
- öppna en detaljsida och gå tillbaka

Skriv en kort observation om vad som kändes snabbt, långsamt eller instabilt.
Det är interaktionerna – inte bara första sidladdningen – som gör fältdata
användbar.

---

# Krav för Godkänt

För Godkänt ska du:

- ha en fungerande publik Vercel-deployment
- ha en användbar mobil layout utan horisontell desktop-scroll
- dokumentera en jämförbar före- och eftermätning
- göra meningsfulla förbättringar kopplade till LCP, CLS och interaktion
- förklara vad som orsakade problemen och varför dina ändringar hjälper
- bevara sökning, kategorifilter, eventkort och detaljsidor
- aktivera Vercel Speed Insights
- ha gröna GitHub Actions-kontroller
- lämna in det Codington-skapade repositoryt och dokumentera Vercel-länken i
  README

# För VG

För VG ska du dessutom:

- använda Performance-panelen för att peka ut en specifik rendering- eller
  huvudtrådsflaskhals
- genomföra och förklara en relevant optimering som inte uttryckligen anges i
  uppgiften
- köra mobiltestet flera gånger och jämföra representativa resultat i stället
  för att välja den bästa körningen
- resonera om skillnaden mellan labbdata och data från riktiga besökare
- förklara minst en avvägning mellan visuell design, funktion och prestanda

## Inlämning

Lämna in följande i Codington:

1. Det privata GitHub-repository som Codington har skapat och kopplat till
   uppgiften.
2. En README med länk till din Vercel-deployment.
3. En README med före/efter-tabell, diagnos, förändringar och reflektion.

## Success ✅

När du är klar har du arbetat med samma flöde som används i riktiga
performance-uppdrag:

```txt
observera användarupplevelsen
→ samla bevis
→ hitta flaskhalsen
→ förbättra utan att förstöra funktionalitet
→ verifiera i labb
→ börja följa riktiga användare
```

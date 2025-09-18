# Instrucțiuni pentru Blogul SEO

Acest document explică cum să adăugați articole noi pe blogul ascuns al site-ului dumneavoastră (`start.shadowpages.io`) pentru SEO și cum să folosiți link-urile canonice pe Medium.

## Structura Folderelor

*   `/blog_source/`: Aici veți crea și edita fișierele sursă pentru articole, în format Markdown (`.md`).
*   `/blog/`: Acest folder conține paginile HTML finale ale articolelor, generate automat de script. **Acesta este folderul pe care trebuie să îl încărcați pe server.**
*   `generate_blog.py`: Scriptul Python care transformă fișierele `.md` în `.html`.
*   `blog_template.html`: Șablonul HTML folosit pentru a crea paginile articolelor.
*   `styles/blog-styles.css`: Fișier CSS opțional pentru stilizarea articolelor (poate fi modificat).

## Cum să Adăugați un Articol Nou

1.  **Creați Fișierul Markdown:**
    *   În folderul `/blog_source/`, creați un fișier nou cu extensia `.md`. Numele fișierului va fi folosit pentru URL dacă nu specificați altceva (ex: `noul-meu-articol.md` va deveni `/blog/noul-meu-articol.html`). Folosiți litere mici, cifre și cratime.
2.  **Adăugați Frontmatter:**
    *   La începutul fișierului `.md`, adăugați o secțiune "frontmatter" între două linii `---`. Aici specificați metadatele articolului:
        ```yaml
        ---
        title: Titlul Articolului Dumneavoastră Atractiv
        slug: url-personalizat-articol # OPȚIONAL: Dacă vreți un URL diferit de numele fișierului
        medium_canonical_url: https://medium.com/username/slug-articol-medium # OPȚIONAL: Adăugați URL-ul articolului de pe Medium DOAR DUPĂ ce îl publicați acolo
        ---
        ```
    *   **`title`**: Titlul care va apărea pe pagină (obligatoriu).
    *   **`slug`**: Partea din URL (opțional). Dacă lipsește, se folosește numele fișierului `.md`.
    *   **`medium_canonical_url`**: URL-ul articolului corespunzător de pe Medium (opțional, dar **important** pentru SEO dacă publicați și pe Medium).
3.  **Scrieți Conținutul:**
    *   După secțiunea frontmatter (după al doilea `---`), scrieți conținutul articolului folosind sintaxa **Markdown**. Puteți folosi titluri (`##`, `###`), liste (`*`, `-`), bold (`**text**`), italic (`*text*`), link-uri (`[text](url)`), imagini (`![alt text](url)`), blocuri de cod etc.
4.  **Rulați Scriptul de Generare:**
    *   Deschideți un terminal sau linie de comandă.
    *   Navigați în folderul principal al site-ului (unde se află `generate_blog.py`).
    *   Rulați comanda: `python3.11 generate_blog.py`
    *   Scriptul va citi toate fișierele `.md` din `/blog_source/` și va genera/actualiza fișierele HTML corespunzătoare în folderul `/blog/`. Va genera și un fișier `/blog/index.html` care listează toate articolele (util pentru sitemap).
5.  **Încărcați pe Server:**
    *   Încărcați **întregul folder `/blog/`** (cu noile fișiere HTML generate) pe serverul dumneavoastră, în rădăcina site-ului `start.shadowpages.io`.

## Cum să Folosiți Link-ul Canonical pe Medium

Aceasta este partea **crucială** pentru SEO, pentru a spune Google că versiunea originală (și cea care trebuie să primească "creditul" SEO) este cea de pe site-ul dumneavoastră, nu cea de pe Medium.

1.  **Publicați întâi pe site-ul dumneavoastră:** Urmați pașii 1-5 de mai sus pentru a genera și încărca articolul pe `start.shadowpages.io/blog/url-articol.html`.
2.  **Scrieți (sau copiați) articolul pe Medium.**
3.  **ÎNAINTE de a apăsa "Publish" pe Medium:**
    *   Apăsați pe meniul cu trei puncte (`...`) din colțul dreapta sus al editorului Medium.
    *   Selectați "More settings" (Mai multe setări).
    *   Derulați în jos până la secțiunea "Advanced Settings" (Setări avansate).
    *   Găsiți opțiunea **"This story was originally published elsewhere"** (Această poveste a fost publicată inițial în altă parte).
    *   Bifați căsuța **"Yes"**.
    *   În câmpul care apare, introduceți **URL-ul complet al articolului de pe site-ul dumneavoastră**: `https://start.shadowpages.io/blog/url-personalizat-articol.html` (sau cum l-ați denumit).
    *   Salvați setările (dacă este necesar).
4.  **Publicați articolul pe Medium.**

**Opțional (Recomandat):** După ce publicați pe Medium, editați fișierul `.md` original din `/blog_source/`, adăugați linia `medium_canonical_url: https://...` în frontmatter cu URL-ul articolului de pe Medium, rulați din nou scriptul `generate_blog.py` și reîncărcați fișierul HTML actualizat pe site. Astfel, pagina de pe site va avea un tag canonical care indică spre Medium, consolidând semnalul pentru Google.

## Actualizare Sitemap

Deoarece adăugați articole frecvent, este important să actualizați și fișierul `sitemap.xml` pentru ca Google să descopere rapid noile pagini.

*   **Metoda Manuală:** Editați fișierul `sitemap.xml` și adăugați un nou bloc `<url>...</url>` pentru fiecare articol nou din folderul `/blog/`, similar cu cel pentru pagina principală. Includeți `<loc>` (URL-ul complet al articolului) și `<lastmod>` (data publicării/modificării).
    ```xml
    <url>
      <loc>https://start.shadowpages.io/blog/url-personalizat-articol.html</loc>
      <lastmod>YYYY-MM-DD</lastmod>
      <priority>0.8</priority> <!-- Prioritate puțin mai mică decât homepage -->
    </url>
    ```
*   **Metoda Automată (Viitor):** Scriptul `generate_blog.py` ar putea fi extins pentru a genera automat și `sitemap.xml` pe baza articolelor din `/blog/`. Acest lucru ar fi ideal pentru volumul dumneavoastră.

Nu uitați să retrimiteți `sitemap.xml` actualizat în Google Search Console după ce adăugați articole noi.

## Ascunderea Blogului

Folderul `/blog/` nu este link-uit nicăieri vizibil pe site. Utilizatorii obișnuiți nu vor ajunge la el decât dacă știu URL-ul direct. Fișierul `robots.txt` permite roboților Google să acceseze și să indexeze conținutul din `/blog/` pentru beneficii SEO.


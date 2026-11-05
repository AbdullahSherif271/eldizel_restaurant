import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));

function mainScript(html: string): string | null {
    return html.match(/src="(main-[^"]+\.js)"/)?.[1] ?? null;
}
const currentMain = mainScript(document.documentElement.outerHTML);

let hiddenAt = Date.now();
document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'hidden') {
        hiddenAt = Date.now();
        return;
    }
    if (Date.now() - hiddenAt < 60_000) return; 
    try {
        const res = await fetch('/index.html', { cache: 'no-store' });
        const latest = mainScript(await res.text());
        if (currentMain && latest && latest !== currentMain) location.reload();
    } catch { }
});

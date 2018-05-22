const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');// metoda getContext('2d') zwraca obiekt, który udostępnia metody i właściwości do rysowania na obszarze roboczym w 2d
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//ctx.strokeStyle = '#BADA55'; //kolor linii, gradient lub styl; nadajemy go potem dynamicznie dlatego jest wykomentowany
ctx.lineWidth = 10; //szerokość linii rysowania; nadajemy ją potem dynamicznie
ctx.lineJoin = 'round'; //połaczenie linii: round(okrągłe), bevel(ściete) lub miter(domyślne - ostre)
ctx.lineCap = 'round'; //zakończenie linii: round(dodane okrągłe), square(dodane kwadratowe), butt(domyślne - kwadrtowe)

let isDrawing = false; //flaga, aby okreslicz czy ktoś rysuje czy nie. Rysuje tylko wtedy gdy mysz jest wciśnięta
let startX = 0; //końcowy punkt rysowania na osi X ???
let startY = 0; //końcowy punkt rysowania na osi Y ???
let hue = 0; //odcien koloru
let lineWidthGrows = true;
function drawing(e) {
    if(!isDrawing) return; //zatrzyma funkcję jeśli mysz nie jest wciśnięta
    ctx.strokeStyle = `hsl(${hue}, 70%, 40%)`; //dodajemy kolor
    //ctx.lineWidth = 10;
    ctx.beginPath(); //metoda beginPath() rozpoczyna ścieżkę lub resetuje bieżącą ścieżkę, potrzebuje innych metod aby faktycznie zacząć rysować, np. moveTo(), LineTo() i koniecznie stroke()
    ctx.moveTo(startX, startY); //początek rysowania
    ctx.lineTo(e.offsetX, e.offsetY); //początek rysowania
    ctx.stroke(); //
    [startX, startY] = [e.offsetX, e.offsetY]; //przypisujemy nowy początek rysowania zależny od położenia myszki
    hue++; //zmieniamy kolor przy rysowaniu
    if(ctx.lineWidth > 100 || ctx.lineWidth <10) lineWidthGrows = !lineWidthGrows; //jeśli szerokość linii jest >100 lub <10 to zmieniamy kierunek zmienną flagową
    if(lineWidthGrows) ctx.lineWidth++; //jeśli zmienna flagowa jest prawdą to szerokość linii rośnie
    else ctx.lineWidth--; //jeśli odwrotnie to szerokość linii maleje
}
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [startX, startY] = [e.offsetX, e.offsetY]; //przypisujemy nowy początek rysowania zależny od położenia myszki
});
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
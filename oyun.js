const baslamenu = document.getElementById("basla"); //html içinde id=basla olan ögenin referansını baslamenu değişkenine atamış
//OYUNUN BAŞLATILMASINI SAĞLAYAN BAŞLANGIÇ MENÜSÜ
const buton = document.querySelector("#basla button");
//html içindeki button ögesinin referansını "BUTON" değişkenine atıyor
const p = document.querySelector("#basla p");
//html içindeki p ögesinin referensinı p değişkenine atar, 
//BAŞLANGIÇ BUTONUDUR
const skordiv = document.getElementById("skor");
//html içindeki id=score olan bir ögenin referensını "skordiv" değişkenine atar
//OYUN SKORUNU GÖSTERİR
const oldurulendiv = document.getElementById("oldurulen");
//HTML içinde id=oldurulen olan ögenin referansını killsdiv değişkenine atar
//ÖLDÜRÜLEN DÜŞMAN SAYISINI GÖSTERİR
const canvas = document.getElementById("canvas");
//HTML içinde id="canvas" olan bir öğenin referansı canvas değişkenine atadı.
//OYUN GRAFİKLERİ ÇİZİLEN CANVAS
const width = window.innerWidth;
//TARAYICININ İÇ GENİŞLİĞİNİ, width DEĞİŞKENİNE ATADIM.
const height = window.innerHeight;
// TARAYICININ İÇ YÜKSEKLİĞİNİ height DEĞİŞKENİNE ATADIM.
canvas.width = width; 
//canvas'ın genişliği tarayıcının iç genişliği olarak ayarladım 
canvas.height = height;
//canvas'ın yüksekliğini tarayıcının yüksekliği olarak ayarladım
const ctx = canvas.getContext('2d');
//canvas üzerinde çizim yapmak için 2D çizim bağlamını ctx değişkenine atadım. 
ctx.clearRect(0,0,width,height);
//önceki çizimlerin silinmesi için canvas'ın tamamını temizledim
//FARE İMLECİ HERHANGİ BİR CANVAS ÜZERİNDE HAREKET ETTİĞİNDE TETİKLENEN EVENT LİSTENER TANIMLANDI
canvas.addEventListener("mousemove", (e)=>{
    if(playing){ //EĞER playing DEĞİŞKENİ TRUE İSE FARE İMLECİNİN HAREKETİ İŞLENİR, AKSİ HALDE İMLECİN HAREKETİ İŞLENMEZ
        var dx = e.pageX - player.x;   
        //farenin yatay yöndeki hareketi ile oyuncunun  x konumu arasındaki fark dx değişkenine atanır
        var dy = e.pageY - player.y;
//farenin dikey yöndeki hareketi ile oyuncunun y konumu arasındaki fark dy değişkenine atanır
//Bu değişkenler, imlecin hareketi ile oyuncu (player) objesinin konumu arasındaki farkı ifade eder.
//Bu farklar, dik üçgenin iki dik kenarının uzunluklarına benzer bir şekilde, imlecin konumu ve oyuncunun konumu arasındaki mesafeyi belirtir. 
        var tetha = Math.atan2(dy,dx); // AÇIYI RADYAN CİNSİNE DÖNÜŞTÜRÜR
        tetha *= 180 / Math.PI;       //RADYAN DERECEYE ÇEVRİLDİ
        angle = tetha; //ANGLE DEĞİŞKENİNE ATANDI
    }
});
//fare her tıklandığında mermiler dizisine Cember sınıfından oluşmuş yeni bir mermi nesnesi eklenir
canvas.addEventListener("click", (e) => { //(5) çemberin yarıçapı,(white)çemberin rengi,5 çemberin kenar kalınlığı
    var shootSound = new Audio('ses/Video-Game-Start-Sound-Effect.mp3'); // Mermi atılınca çalınacak ses dosyasının yolu
    shootSound.play(); // Mermi atılınca sesi çal
    mermiler.push(new Cember(player.x,player.y,e.pageX,e.pageY,5,'white',5));         
    //tikladikca ortaya mermi olusturuyo noktalari hedefe dogru hareket ettirme
});//(player.x,player.y)Oyuncunun mevcut konumu, merminin başlangıç konumu olarak kullanılır
//(e.pageX,e.pageY)fare tıklamasının sayfa üzerindeki kordinatları


//Çember sınıfımı tanımladım.
class Cember{
    constructor(bx,by,tx,ty,r,c,s){ 
        this.bx = bx;  // başlangıç noktasının x kordinatı
        this.by = by; // başlangıç noktasının y değerinin koordinatı
        this.tx = tx;  // hedef noktasının x koordinatı
        this.ty = ty; // hedef noktasının y koordinatı
        this.x = bx; // şu anki x koordinatı
        this.y = by; // şu anki y koordinatı
        this.r = r; // çemberin yarıçapı
        this.c = c; // çemberin rengi
        this.s = s; // çemberin hareket hızı
    }
    draw(){ //Belirtilen renkte ve boyutta çemberin canvas(ctx (CanvasRenderingContext2D)) üzerinde çizilmesini sağlayan metot
        ctx.fillStyle = this.c; //çemberin doldurma rengini belirler
        ctx.beginPath(); // çizime başlamdan önce bu metot çağrılır
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2); //bir dairenin çizilmesini sağlar
        //(this.x,this.y)çemberin merkez kordinatları,(this.r) çemberin yarıçapı
        //tam bir daire çizmek için 0'dan 2π'ye kadar olan açılar kullanılır.
        ctx.fill(); //çizimin içinin belirtilen renkte doldurulmasını sağlar
        ctx.closePath(); //çizim işleminin sona erdiğini belirtir
    }
//update() metodu, her çağrıldığında çemberin hedefe doğru bir adım atmasını sağlar, böylece çemberin sürekli olarak hedefe doğru hareket etmesi sağlanır.
    update(){ //çemberin konumunu günceller, merminin hedefe doğru hareket etmesini sağlar
        var dx = this.tx - this.bx;  // yatayda başlangıç ve hedef noktaları arasındaki farkı hesaplar 
        var dy = this.ty - this.by;// düşeyde başlangıç ve hedef noktaları arasındaki farkı hesaplar 
        var hp = Math.sqrt(dx*dx + dy*dy); // hipotenüsü hesaplar
        this.x += (dx/hp) * this.s; //çemberin yeni konumunu belirlemek için  çemberin x kordinatı, yatay farkın hipotenüse oranı ile çemberin hızının çarpımı kadar artırılır. 
        this.y += (dy/hp) * this.s; //çemberin ynei konumunu belirlemek için çemberin y koordinatı, düşey farkın hipotenüse oranı ile çemberin hızının çarpımı kadar artırılır. 
    //Bu, çemberin hedefe doğru yönelmesini ve belirli bir hızda hareket etmesini sağlar.
    }
    remove(){  // çember ekranın dışına çıkarsa çemberin silinmesini sağlar 
        if( (this.x<0 || this.x>width)// çemberin x koordinatının ekranın sol sınırının solunda veya ekranın sağ sınırının sağından büyük olup olmadığını kontrol eder.
        // Yani, çemberin ekranın sol veya sağ sınırlarının dışında olup olmadığını belirler.
            || (this.y<0 ||this.y>height) ){// çemberin x koordinatının ekranın sol sınırının solunda veya ekranın sağ sınırının sağından büyük olup olmadığını kontrol eder.
                // Yani, çemberin ekranın sol veya sağ sınırlarının dışında olup olmadığını belirler.
            return true;} //Eğer çemberin x veya y koordinatlarından biri veya her ikisi de ekranın sınırları dışındaysa
        return false; }//Eğer çemberin x veya y koordinatlarından biri veya her ikisi de ekranın sınırları dışındaysa
}

//Oyuncu nesnesinin çizilmesi için Oyuncu sınıfı tanımlandı
class Oyuncu{
    constructor(x,y,r,c){//Oyuncu sınıfının kurucu metodudur
        this.x = x; //Oyuncunun konumunu belirleyen x ve y koordinatları.
        this.y = y;
        this.r = r;//Oyuncunun yarıçapı (dairenin yarıçapı).
        this.c = c;//Oyuncunun rengi.
    }
    draw(){//oyuncuyu çizmek için kullanılan metot
        ctx.save(); //mevcut durumu kaydeder. Bu, sonraki dönüşümleri uyguladıktan sonra orijinal duruma geri dönmek için kullanılır.
        ctx.translate(this.x,this.y);//oyuncunun x ve y koordinatlarrını taşır
        ctx.rotate(angle*Math.PI/180);//çizimi bir açıda döndürmek için kullanılır. angle değişkeni, dönüş açısını belirler.
        ctx.fillStyle = this.c;//oyuncunun rengini belirler
        ctx.beginPath();//çizim yolunun başlangıcını temsil eder
        ctx.arc(0,0,this.r,0,Math.PI*2);//bir dairenin çizimini belirtir.
        //(0,0)Dairenin merkez koordinatları[bu, translate ile taşındığı için (0, 0) olarak belirtilir]/this.r: Dairenin yarıçapı.
        ctx.fillRect(0,-(this.r * .4),this.r + 10,this.r * .8);
        //oyuncunun gövdesini çizer. 
        ctx.fill();//çizimin doldurulmasını sağlar.
        ctx.closePath(); //çizimin bittiğini bildirir.
        ctx.restore();//önceki kaydedilen çizim durmunu geri yükler.
        //Çizimlerin oyuncunun çizildiği konum ve dönüş açısıyla sınırlı kalmasını sağlar.
    }
}

function Dusman(){  // rastgele dusman ekleme
    for(var i=enemies.length; i<maxenemy; i++){//for döngüsü ile belirli bir düşman sayısına (maxenemy) kadar düşman ekler.
        var r = Math.random() * 15 + 25;    // max cap 40
        var c = 'hsl(' + (Math.random()*360) + ',50%,50%)';//Her düşman için rastgele bir yarıçap (r) ve renk (c) oluşturur.
        var s = .5 + ((40-((r/40)*r)) / 160) / maxenemy;  //Düşmanın hareket hızı (s), yarıçapı ile ilişkilidir. 
        //Yarıçap ne kadar büyükse, düşmanın hareket hızı o kadar azalır.
        var x,y;
        if(Math.random()<.5){
            x = (Math.random() > .5) ? width : 0;  // Hedefin ekranın sağ ya da solundan rastgele gelmesi sağlar.
            y = Math.random() * height;  // Hedefin ekranin alt ya da üstünden rastgele gelmesi sağlar.
        }else{
            x = Math.random() * width;
            y = (Math.random() < .5) ? height : 0;
        }
        enemies.push(new Cember(x,y,player.x, player.y,r,c,s));//Oluşturulan her düşman, enemies dizisine (Cember sınıfından yeni bir nesne olarak) eklenir.
    }
}

function Carpısma(x1,y1,r1,x2,y2,r2){   // iki nesnenin konumlari arasindaki hipotenus hesaplama
    var dx = x1 - x2;
    var dy = y1 - y2;
    var hp = Math.sqrt(dx*dx + dy*dy);//Hipotenüs uzunluğunu (hp) hesaplamak için bu farkların karesinin toplamının karekökünü alır(Pisagor teoremi).
    if(hp < (r1 + r2)){   // hipotenus yaricaplarin toplamindan kucukse bu iki nesne birbirine dokunuyor veya iç içe geçmiş  durumda demektir.
        return true;
    }
    return false;//Çarpışma yok demektir.
}
let requestId = null; //requestId değişkenini global olarak tanımlar. Bu değişken, animasyon çerçevelerinin kontrolü için kullanılır.Animasyon,
// durdurulduğunda veya oyun alanı değiştirildiğinde bu değişkeni kullanarak animasyon çerçevelerini durdurabilir veya güncelleyebiliriz.

function animate(){
    if(playing){//playing değişkeni true olduğu sürece, animasyon döngüsü devam eder.
        requestId = requestAnimationFrame(animate);
//requestAnimationFrame(animate) çağrısı ile tarayıcıya bir sonraki animasyon çerçevesinin çalıştırılmasını istiyoruz. 
//Bu, tarayıcı uygun olduğunda bir sonraki çerçeveyi çalıştıracaktır.
        ctx.fillStyle = 'rgba(0,0,0,.3)';
        ctx.fillRect(0,0,width,height);//Canvas'i temizlemek için bir yarı saydam siyah dikdörtgen çizilir.
        // Bu, geçmiş çizimleri siler ve yeni çizimlerin üstüne yerleştirilmesini sağlar.
        ctx.fill();
        enemies.forEach((enemy,e) => {//ile her düşman işlenir.*
            if (!playing) return; // Eğer oyun oynanmıyorsa düşmanları hareket ettirmeyi durdur. 
            mermiler.forEach((bullet,b)=>{//ile her mermi işlenir.*
                if(Carpısma(enemy.x, enemy.y, enemy.r, bullet.x, bullet.y, bullet.r)){  
                    if(enemy.r < 25){  //Eğer 25'ten küçükse, bu düşman öldürülür
                        enemies.splice(e,1);//Düşman, enemies dizisinden çıkarılır.
                        score += 25;//Skora 25 puan eklenir.
                        kills++;//Öldürülen düşman sayısı artırılır.
                        if(kills % 3 === 0){//Eğer öldürülen düşman sayısı 3'ün katı ise, 
                            maxenemy++;//maxenemy değişkeni bir artırılarak daha fazla düşmanın eklenebileceği maksimum düşman sayısı artırılır.
                        }
                        Dusman();//Yeni bir düşman oluşturmak için Dusman() fonksiyonu çağrılır.
                    }else{//Eğer düşmanın yarıçapı 25'ten büyük veya eşitse
                        enemy.r -= 5;//Bu durumda düşmanın yarıçapı 5 birim azaltılır**
                        score += 5;//skora 5 puan eklenir.
                    }
                    mermiler.splice(b,1);// mermi listeden kaldırılır (mermiler.splice(b,1)) çünkü bir düşman ile
                    // çarpıştığında mermi etkisiz hale gelmiştir ve ekranda gösterilmesine gerek yoktur.
                }
            });

            if( Carpısma(enemy.x, enemy.y, enemy.r, player.x, player.y, player.r) ){//ile oyuncu ve düşman arasında bir çarpışma kontrol edilir.      
                baslamenu.classList.remove("hidden");//Başlangıç menüsünün gizli sınıfını kaldırarak başlangıç menüsünü gösterir.
                buton.textContent = "TEKRAR DENE";//TEKRAR DENE" şeklinde buton metnini değiştirir
                p.innerHTML = "KAYBETTİNİZ! <br/> Score: " + score;//Kaybettiniz mesajını ve o anki skoru gösteren bir mesaj oluşturur.
                playing = false;//Oyun durumunu false yaparak oyunun oynanmadığını belirtir
                var gameOverSound = new Audio('ses/Mario Dead - Sound Effects.mp3')//Oyun bitiş sesini çalar.
                gameOverSound.play();
              }
            if(enemy.remove()){//enemy.remove() fonksiyonu ile düşmanın ekran dışına çıkıp çıkmadığı kontrol edilir. Eğer düşman ekran dışına çıktıysa;
                enemies.splice(e,1);//Düşman listeden kaldırılır
                Dusman();}//Yeni bir düşman eklemek için Dusman() fonksiyonu çağrılır.
            enemy.update();//Düşmanın pozisyonunu günceller.
            enemy.draw();//Düşmanı çizer.
            drawEnemyInfoo(enemy);//Düşman hakkında bilgi gösteren ek bilgileri çizer
        });
        mermiler.forEach((bullet,b) => {//ile mermiler dizisindeki her mermi için aşağıdaki işlemler gerçekleştirilir.
            if(bullet.remove()){//Eğer mermi ekran dışına çıktıysa;
                mermiler.splice(b,1);//Mermi listeden kaldırılır
            }
            bullet.update();//Her mermi güncellenir.
            bullet.draw();// Her bir mermi çizilir
        })
        player.draw();//Oyuncunun çizilmesi sağlanır.
        skordiv.innerHTML = "Puan: " + score;//Oyun alanındaki skorlar sayısı güncellenir.
        oldurulendiv.innerHTML = "Öldürülen: " + kills;//Oyun alanındaki öldürülen düşman sayısı güncellenir.
    } else {
        cancelAnimationFrame(requestId);} //Eğer oyun oynanmıyorsa (else bloğu), animasyon döngüsü durdurulur . 
}

function init(){  // oyun baslarken
  
    playing = true;//Oyunun şu anda oynanıp oynanmadığını belirtir.
    score = 0;//Oyuncunun puanını tutar.
    kills = 0;//Öldürülen düşmanların sayısını takip eder.
    angle = 0;//Bir açı değeri saklar (ancak burada nasıl kullanıldığı net değil).
    mermiler = [];//Kurşun veya atılan nesneleri saklamak için bir dizi.
    enemies = [];//Düşman nesnelerini saklamak için bir dizi.
    maxenemy = 5;//İzin verilen maksimum düşman sayısı.
    baslamenu.classList.add("hidden");//Oyunun başlangıç menüsünü temsil eden bir DOM öğesi.
    player = new Oyuncu(width/2, height/2, 30, 'white');
    //Oyuncu nesnesini, 30 piksel yarıçapında ve beyaz renkte, oyun alanının ortasına yerleştirerek Oyuncu sınıfıyla başlatır.
    Dusman(); //Düşmanları oluşturmak için Dusman() fonksiyonunu çağırır.
    setTimeout(() => showLevelUpMessage(), 30000);//baslamenu öğesine "hidden" adında bir CSS sınıfı ekler.
    animate();//Oyun döngüsünü animate() fonksiyonuyla başlatır.

}

function drawEnemyInfoo(enemy) {//Bu fonksiyon, bir düşman nesnesini parametre olarak alır.
    ctx.font = '15px Arial';//Bu satır, yazı tipini ve boyutunu belirler. Metnin Arial fontunda 15 piksel boyutunda olmasını sağlar.
    ctx.fillStyle = 'white';//Bu satır, metnin rengini belirler. Metnin beyaz renkte olmasını sağlar.
    ctx.textAlign = 'center';//metnin hizalamasını belirler. Metnin yatayda düşman nesnesinin merkezine hizalanmasını sağlar.
    ctx.fillText(Math.floor(((enemy.r - 25) / 5)+2), enemy.x, enemy.y - enemy.r - 10);
    //metni çizer. fillText metodu, verilen metni ve koordinatları kullanarak bir metin parçasını çizer. 
    //İlk parametre, çizilecek metni; ikinci parametre, metnin x koordinatı; üçüncü parametre, metnin y koordinatıdır.
    //Bu satırda çizilen metin, (enemy.r - 25) / 5) + 2 ifadesinden hesaplanır ve düşman nesnesinin merkezine ve biraz üstüne yerleştirilir.
}

function drawEnemyInfo(enemy) {//drawEnemyInfo adında bir fonksiyon tanımlar. Bu fonksiyon, bir düşman nesnesini parametre olarak alır.
    ctx.font = '50px Arial bold';  // Font boyutunu ve kalınlığını değiştirdim
    ctx.fillStyle = 'black';  // Yazının rengini siyah olarak ayarladım
    ctx.textAlign = 'center';//metnin hizalamasını belirler. Metnin yatayda düşman nesnesinin merkezine hizalanmasını sağlar.
    ctx.fillText(Math.floor(((enemy.r - 25) / 5) + 2), enemy.x, enemy.y - enemy.r - 10);
    //Bu satır, metni çizer. fillText metodu, verilen metni ve koordinatları kullanarak bir metin parçasını çizer. 
    //İlk parametre, çizilecek metni; ikinci parametre, metnin x koordinatı; üçüncü parametre, metnin y koordinatıdır. 
    //Bu satırda çizilen metin, (enemy.r - 25) / 5) + 2 ifadesinden hesaplanır ve düşman nesnesinin merkezine ve biraz üstüne yerleştirilir.
    ctx.strokeStyle = 'white';  // Yazıya beyaz bir gölge ekledim
    ctx.strokeText(Math.floor(((enemy.r - 25) / 5) + 2), enemy.x, enemy.y - enemy.r - 10);
    //Bu satır, metnin kenarını çizer. strokeText metodu, verilen metni ve koordinatları kullanarak bir metin parçasının kenarını çizer. 
    //İlk parametre, çizilecek metni; ikinci parametre, metnin x koordinatı; üçüncü parametre, metnin y koordinatıdır. 
    //Bu satırda metnin kenarı, beyaz olarak belirlenen gölge renginde çizilir.
}



function showLevelUpMessage() {
    updateEnemySize();//Bu satır, düşmanların boyutunu güncelleyen bir fonksiyonu çağırır.
    ctx.font = '100px Arial'; // Bu satır, metnin fontunu ve boyutunu belirler. Metin, 100 piksel boyutunda Arial fontunda olacaktır.
    ctx.fillStyle = 'white';// Bu satır, metnin iç dolgusunun rengini belirler. Metin, beyaz renkte olacaktır.
    ctx.textAlign = 'center';// Bu satır, metnin hizalamasını belirler. Metin, yatayda oyun alanının ortasına hizalanacaktır.
    let messageDuration = 10000; // Bu satır, mesajın ekranda kalacağı toplam süreyi belirler. Burada 10 saniye olarak ayarlanmıştır.
    let fadeDuration = 5000; //Bu satır, mesajın ekrandan yavaşça kaybolma süresini belirler. Burada 5 saniye olarak ayarlanmıştır.
    let startTime = Date.now();//Bu satır, mesajın görünme süresinin başlangıç zamanını kaydeder.
    let interval;//Bu satır, bir zamanlayıcı değişkeni tanımlar.
    function continueToNextLevel() {//*Bu satır, bir iç içe fonksiyon tanımlar. Bu fonksiyon, bir sonraki seviyeye geçiş işlemlerini gerçekleştirir.
        clearInterval(interval);
        cancelAnimationFrame(requestId); // requestId'yi iptal edin
        ctx.clearRect(0, 0, width, height); //* Ekranı temizle  
        enemies = []; // Düşmanları temizle
        Dusman(); // *Yeniden düşmanları oluştur
        playing = true; // *Oyunu tekrar başlat
        animate(); // Animasyonu yeniden başlat
        nextLevelButton.style.display = "none";//* Butonu gizle
    }
    const nextLevelButton = document.getElementById("nextLevelButton");
    //Bu satır, HTML içinde "nextLevelButton" adında bir id'ye sahip butonu alır.
    nextLevelButton.addEventListener("click", continueToNextLevel);
    // Bu satır, "nextLevelButton" butonuna tıklanma olayı ekler ve bu butona tıklandığında continueToNextLevel() fonksiyonunu çağırır.
    interval = setInterval(() => {//Bu satır, bir zamanlayıcı oluşturur ve her 50 milisaniyede bir belirli işlevleri gerçekleştirir.
        let currentTime = Date.now();
        let elapsedTime = currentTime - startTime;
        if (elapsedTime < messageDuration) {// Yazıyı ekranda göster
            ctx.fillRect(0, 0, width, height); // Ekranın tamamını doldur
            ctx.fillStyle = 'white';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Yazının gölgesi
            ctx.font = 'bold 40px Roboto'; 
            ctx.fillText("LEVEL UP", width / 2, height / 6); // Ekranın üst kısmında
            ctx.fillText("UFUKTA YENİ DÜŞMANLAR BELİRDİ", width / 2, height / 4);//Belirtilen konumlarda ekrana yazıyı yazar
            ctx.fillText("VE ARTIK ÇOK DAHA HIZLILAR DİKKATLİ OL!!!", width / 2, height / 3);//Belirtilen konumlarda ekrana yazıyı yazar
            drawEnemyInfo(enemy); // Düşman bilgilerini çiz
            playing = false;
        } 
        // Yazının yavaşça kaybolmasını sağla
        else if (elapsedTime < messageDuration + fadeDuration) {
            let alpha = 1.0 - (elapsedTime - messageDuration) / fadeDuration;
            ctx.fillStyle = 'rgba(255, 255, 255, ${alpha})'; // Metnin saydamlığını ayarla
            ctx.fillRect(0, 0, width, height); // Ekranın tamamını doldur
            ctx.fillStyle = 'white';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Yazının gölgesi
            ctx.font = 'bold 40px Roboto'; 
            ctx.fillText("LEVEL UP", width / 2, height / 6); // Ekranın üst kısmında
           
            ctx.fillText("UFUKTA YENİ DÜŞMANLAR BELİRDİ", width / 2, height / 4);  //Belirtilen konumlarda ekrana yazıyı yazar
            ctx.fillText("VE ARTIK ÇOK DAHA HIZLILAR DİKKATLİ OL!!!", width / 2, height / 3);//Belirtilen konumlarda ekrana yazıyı yazar
       
            drawEnemyInfo(enemy); // Düşman bilgilerini çiz
        } 
        // Interval'ı temizle ve oyunu yeniden başlat
        else {
            // "NEXT LEVEL" butonunu göster
            enemies.forEach((enemy) => {
                enemy.s = 0; // Düşmanların hareket hızını sıfıra eşitleyerek durduruyoruz
            });
            const nextLevelButton = document.getElementById("nextLevelButton");
            nextLevelButton.style.display = "block";
            var shootsound = new Audio('ses/Level Up Sound Effect.mp3');
            shootsound.loop = false;  // Tekrar etme özelliğini false olarak ayarla
            shootsound.currentTime = 0;  // Sesin baştan çalmasını sağla
            shootsound.play(); 
            nextLevelButton.addEventListener("click", () => {
                // NEXT LEVEL butonuna tıklandığında tüm düşmanların hareketini yeniden başlat
                enemies.forEach((enemy) => {
                    enemy.s = enemy.s + speedIncrease;               
                 });
                nextLevelButton.style.display = "none"; // Butonu gizle
            });
        }
    }, 50); // Her 50ms'de güncelle
}

function updateEnemySize() {//Bu fonksiyon, düşmanların boyutunu günceller.
    enemies.forEach(enemy => {//Her düşman için bir döngü oluşturur.
        if (enemy.r < 40) { //// düşmanın yarıçapı 40'tan küçükse, 
            enemy.r += 5;    //yarıçapını 5 birim artırır.
        }
    });
}

var playing = false;//Bu satır, bir değişken oluşturur ve oyunun oynanıp oynanmadığını belirtmek için kullanılır. 
//Başlangıçta oyun henüz başlamadığı için false olarak ayarlanır.
var player, angle, mermiler, enemies, maxenemy,score,kills;
// Bu satır, bir dizi değişkeni tanımlar. Her biri oyun sırasında kullanılacak farklı verileri temsil eder: